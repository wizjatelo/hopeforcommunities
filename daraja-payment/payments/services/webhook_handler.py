"""
Webhook handling service.
"""
import json
import hashlib
import hmac
from django.conf import settings
from django.utils import timezone
import logging
from payments.models import WebhookLog, PaymentTransaction

logger = logging.getLogger(__name__)

class WebhookHandler:
    """Service for handling webhook requests."""
    
    def __init__(self, webhook_type):
        self.webhook_type = webhook_type
    
    def verify_signature(self, payload, signature, secret_key):
        """Verify webhook signature."""
        if not signature or not secret_key:
            return False
        
        expected_signature = hmac.new(
            secret_key.encode(),
            payload.encode(),
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(signature, expected_signature)
    
    def log_webhook(self, payload, headers, ip_address):
        """Log webhook request."""
        webhook_log = WebhookLog.objects.create(
            webhook_type=self.webhook_type,
            payload=payload,
            headers=headers,
            ip_address=ip_address
        )
        return webhook_log
    
    def process_webhook(self, payload):
        """Process webhook payload."""
        try:
            # Log the webhook
            webhook_log = self.log_webhook(
                payload=payload,
                headers={},  # Headers would be passed from view
                ip_address=None
            )
            
            # Process based on webhook type
            if self.webhook_type == 'mpesa_paybill':
                result = self._process_mpesa_paybill(payload)
            elif self.webhook_type == 'mpesa_b2c_result':
                result = self._process_mpesa_b2c_result(payload)
            elif self.webhook_type == 'mpesa_b2c_timeout':
                result = self._process_mpesa_b2c_timeout(payload)
            elif self.webhook_type == 'mpesa_global':
                result = self._process_mpesa_global(payload)
            else:
                result = {'success': False, 'error': 'Unknown webhook type'}
            
            # Update webhook log
            webhook_log.processed = result.get('success', False)
            if not result.get('success'):
                webhook_log.processing_error = result.get('error', 'Unknown error')
            webhook_log.save()
            
            return result
            
        except Exception as e:
            logger.error(f"Error processing {self.webhook_type} webhook: {str(e)}")
            return {'success': False, 'error': str(e)}
    
    def _process_mpesa_paybill(self, payload):
        """Process M-Pesa PayBill webhook."""
        try:
            body = payload.get('Body', {})
            stk_callback = body.get('stkCallback', {})
            
            checkout_request_id = stk_callback.get('CheckoutRequestID')
            result_code = stk_callback.get('ResultCode')
            result_desc = stk_callback.get('ResultDesc')
            
            if not checkout_request_id:
                return {'success': False, 'error': 'No CheckoutRequestID found'}
            
            # Find transaction
            try:
                transaction = PaymentTransaction.objects.get(
                    checkout_request_id=checkout_request_id
                )
                
                transaction.result_code = result_code
                transaction.result_description = result_desc
                transaction.callback_metadata = stk_callback
                
                if result_code == '0':
                    transaction.status = PaymentTransaction.TransactionStatus.SUCCESS
                    transaction.completed_at = timezone.now()
                    
                    # Extract payment details
                    items = stk_callback.get('CallbackMetadata', {}).get('Item', [])
                    for item in items:
                        if item.get('Name') == 'Amount':
                            transaction.amount = item.get('Value', transaction.amount)
                        elif item.get('Name') == 'MpesaReceiptNumber':
                            transaction.transaction_id = item.get('Value', transaction.transaction_id)
                        elif item.get('Name') == 'PhoneNumber':
                            transaction.phone_number = item.get('Value', transaction.phone_number)
                else:
                    transaction.status = PaymentTransaction.TransactionStatus.FAILED
                    transaction.status_message = result_desc
                
                transaction.save()
                
                logger.info(f"Processed M-Pesa PayBill webhook for transaction {transaction.transaction_id}")
                return {'success': True, 'transaction_id': transaction.transaction_id}
                
            except PaymentTransaction.DoesNotExist:
                logger.error(f"Transaction not found for checkout_request_id: {checkout_request_id}")
                return {'success': False, 'error': 'Transaction not found'}
                
        except Exception as e:
            logger.error(f"Error processing M-Pesa PayBill webhook: {str(e)}")
            return {'success': False, 'error': str(e)}
    
    def _process_mpesa_b2c_result(self, payload):
        """Process M-Pesa B2C result webhook."""
        # Implement B2C result processing
        # This would depend on your specific B2C implementation
        logger.info(f"Processing B2C result webhook: {payload}")
        return {'success': True}
    
    def _process_mpesa_b2c_timeout(self, payload):
        """Process M-Pesa B2C timeout webhook."""
        # Implement B2C timeout processing
        logger.info(f"Processing B2C timeout webhook: {payload}")
        return {'success': True}
    
    def _process_mpesa_global(self, payload):
        """Process M-Pesa Global webhook."""
        try:
            reference = payload.get('reference')
            status = payload.get('status')
            message = payload.get('message')
            
            if not reference:
                return {'success': False, 'error': 'No reference found'}
            
            # Find transaction
            try:
                transaction = PaymentTransaction.objects.get(
                    transaction_id=reference
                )
                
                transaction.status_message = message
                transaction.raw_response = payload
                
                if status == 'SUCCESS':
                    transaction.status = PaymentTransaction.TransactionStatus.SUCCESS
                    transaction.completed_at = timezone.now()
                elif status == 'FAILED':
                    transaction.status = PaymentTransaction.TransactionStatus.FAILED
                elif status == 'PENDING':
                    transaction.status = PaymentTransaction.TransactionStatus.PROCESSING
                
                transaction.save()
                
                logger.info(f"Processed M-Pesa Global webhook for transaction {reference}")
                return {'success': True, 'transaction_id': reference}
                
            except PaymentTransaction.DoesNotExist:
                logger.error(f"Transaction not found for reference: {reference}")
                return {'success': False, 'error': 'Transaction not found'}
                
        except Exception as e:
            logger.error(f"Error processing M-Pesa Global webhook: {str(e)}")
            return {'success': False, 'error': str(e)}