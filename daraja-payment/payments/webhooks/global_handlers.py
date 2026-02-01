"""
M-Pesa Global webhook handlers.
"""
import json
import logging
import hmac
import hashlib
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse
from django.utils import timezone
from payments.models import PaymentTransaction, WebhookLog
from payments.serializers.webhook_serializers import MpesaGlobalWebhookSerializer

logger = logging.getLogger(__name__)

@csrf_exempt
@require_POST
def mpesa_global_webhook(request):
    """Handle M-Pesa Global webhook."""
    try:
        # Parse request body
        payload = json.loads(request.body)
        
        # Log webhook request
        webhook_log = WebhookLog.objects.create(
            webhook_type='mpesa_global',
            payload=payload,
            headers=dict(request.headers),
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        # Verify webhook signature (if provided)
        signature = request.headers.get('X-MPESA-Signature')
        if signature:
            # You should store your M-Pesa Global webhook secret in environment variables
            webhook_secret = 'your_webhook_secret'  # Should come from settings
            
            # Verify signature
            if not verify_webhook_signature(request.body, signature, webhook_secret):
                webhook_log.processing_error = "Invalid webhook signature"
                webhook_log.save()
                return JsonResponse({'status': 'error', 'message': 'Invalid signature'}, status=400)
        
        # Validate payload
        serializer = MpesaGlobalWebhookSerializer(data=payload)
        if not serializer.is_valid():
            webhook_log.processing_error = f"Invalid payload: {serializer.errors}"
            webhook_log.save()
            return JsonResponse({'status': 'error', 'message': 'Invalid payload'}, status=400)
        
        # Extract data from payload
        reference = payload.get('reference')
        status = payload.get('status')
        message = payload.get('message', '')
        payment_id = payload.get('payment_id')
        amount = payload.get('amount')
        currency = payload.get('currency')
        
        if not reference:
            webhook_log.processing_error = "No reference found in payload"
            webhook_log.save()
            return JsonResponse({'status': 'error', 'message': 'No reference provided'}, status=400)
        
        # Find transaction
        try:
            transaction = PaymentTransaction.objects.get(
                transaction_id=reference
            )
            
            # Update transaction based on status
            transaction.status_message = message
            transaction.raw_response = payload
            
            if status == 'SUCCESS':
                transaction.status = PaymentTransaction.TransactionStatus.SUCCESS
                transaction.completed_at = timezone.now()
                logger.info(f"M-Pesa Global payment successful for transaction {reference}")
                
            elif status == 'FAILED':
                transaction.status = PaymentTransaction.TransactionStatus.FAILED
                logger.warning(f"M-Pesa Global payment failed for transaction {reference}: {message}")
                
            elif status == 'PENDING':
                transaction.status = PaymentTransaction.TransactionStatus.PROCESSING
                logger.info(f"M-Pesa Global payment pending for transaction {reference}")
                
            elif status == 'CANCELLED':
                transaction.status = PaymentTransaction.TransactionStatus.CANCELLED
                logger.info(f"M-Pesa Global payment cancelled for transaction {reference}")
            
            # Update amount and currency if provided
            if amount:
                transaction.amount = amount
            if currency:
                transaction.currency = currency
            
            transaction.save()
            
            # Perform post-processing based on status
            if status == 'SUCCESS':
                # Successful payment - update your business logic
                # e.g., send confirmation email, update user balance, etc.
                process_successful_payment(transaction)
            
            elif status == 'FAILED':
                # Failed payment - notify user or retry logic
                process_failed_payment(transaction)
            
            # Mark webhook as processed
            webhook_log.processed = True
            webhook_log.save()
            
            return JsonResponse({'status': 'success', 'message': 'Webhook processed successfully'})
            
        except PaymentTransaction.DoesNotExist:
            webhook_log.processing_error = f"Transaction not found for reference: {reference}"
            webhook_log.save()
            logger.error(f"Transaction not found for reference: {reference}")
            return JsonResponse({'status': 'error', 'message': 'Transaction not found'}, status=404)
            
        except Exception as e:
            webhook_log.processing_error = f"Error updating transaction: {str(e)}"
            webhook_log.save()
            logger.error(f"Error updating transaction {reference}: {str(e)}")
            return JsonResponse({'status': 'error', 'message': 'Internal server error'}, status=500)
            
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in M-Pesa Global webhook payload: {str(e)}")
        return JsonResponse({'status': 'error', 'message': 'Invalid JSON'}, status=400)
    
    except Exception as e:
        logger.error(f"Error processing M-Pesa Global webhook: {str(e)}")
        return JsonResponse({'status': 'error', 'message': 'Internal server error'}, status=500)

def verify_webhook_signature(payload, signature, secret_key):
    """Verify webhook signature."""
    try:
        # Generate expected signature
        expected_signature = hmac.new(
            secret_key.encode('utf-8'),
            payload,
            hashlib.sha256
        ).hexdigest()
        
        return hmac.compare_digest(signature, expected_signature)
    
    except Exception as e:
        logger.error(f"Error verifying webhook signature: {str(e)}")
        return False

def process_successful_payment(transaction):
    """Process successful payment."""
    try:
        # Here you would implement your business logic for successful payments
        # Examples:
        # 1. Send confirmation email to user
        # 2. Update user's account balance
        # 3. Create invoice or receipt
        # 4. Update order status
        # 5. Trigger other business processes
        
        logger.info(f"Processing successful payment for transaction {transaction.transaction_id}")
        
        # Example: Send notification (you would implement actual notification logic)
        send_payment_notification(transaction, 'success')
        
        # Example: Update related business records
        update_business_records(transaction)
        
    except Exception as e:
        logger.error(f"Error processing successful payment for transaction {transaction.transaction_id}: {str(e)}")

def process_failed_payment(transaction):
    """Process failed payment."""
    try:
        # Here you would implement your business logic for failed payments
        # Examples:
        # 1. Send failure notification to user
        # 2. Log failure for analysis
        # 3. Trigger retry logic if applicable
        
        logger.info(f"Processing failed payment for transaction {transaction.transaction_id}")
        
        # Example: Send failure notification
        send_payment_notification(transaction, 'failed')
        
    except Exception as e:
        logger.error(f"Error processing failed payment for transaction {transaction.transaction_id}: {str(e)}")

def send_payment_notification(transaction, status):
    """Send payment notification (placeholder function)."""
    # Implement your notification logic here
    # This could be email, SMS, push notification, etc.
    pass

def update_business_records(transaction):
    """Update business records after successful payment (placeholder function)."""
    # Implement your business logic here
    # This could update orders, invoices, user balances, etc.
    pass