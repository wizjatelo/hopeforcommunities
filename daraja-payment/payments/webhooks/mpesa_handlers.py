"""
M-Pesa webhook handlers.
"""
import json
import logging
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.http import JsonResponse, HttpResponse
from django.utils import timezone
from payments.models import PaymentTransaction, WebhookLog
from payments.services.mpesa_paybill import MpesaPaybillService
from payments.serializers.webhook_serializers import MpesaPaybillWebhookSerializer, MpesaB2CWebhookSerializer

logger = logging.getLogger(__name__)

@csrf_exempt
@require_POST
def mpesa_paybill_webhook(request):
    """Handle M-Pesa PayBill STK Push callback."""
    try:
        # Parse request body
        payload = json.loads(request.body)
        
        # Log webhook request
        webhook_log = WebhookLog.objects.create(
            webhook_type='mpesa_paybill',
            payload=payload,
            headers=dict(request.headers),
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        # Validate payload
        serializer = MpesaPaybillWebhookSerializer(data=payload)
        if not serializer.is_valid():
            webhook_log.processing_error = f"Invalid payload: {serializer.errors}"
            webhook_log.save()
            return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Invalid request payload'})
        
        # Parse callback metadata
        callback_metadata = payload.get('Body', {}).get('stkCallback', {})
        
        checkout_request_id = callback_metadata.get('CheckoutRequestID')
        result_code = callback_metadata.get('ResultCode')
        result_desc = callback_metadata.get('ResultDesc')
        
        if not checkout_request_id:
            webhook_log.processing_error = "No CheckoutRequestID found"
            webhook_log.save()
            return JsonResponse({'ResultCode': 1, 'ResultDesc': 'CheckoutRequestID missing'})
        
        # Find transaction
        try:
            transaction = PaymentTransaction.objects.get(
                checkout_request_id=checkout_request_id
            )
            
            # Update transaction
            transaction.result_code = result_code
            transaction.result_description = result_desc
            transaction.callback_metadata = callback_metadata
            transaction.raw_response = payload
            
            if result_code == 0:
                # Successful payment
                transaction.status = PaymentTransaction.TransactionStatus.SUCCESS
                transaction.completed_at = timezone.now()
                
                # Extract payment details from callback metadata
                items = callback_metadata.get('CallbackMetadata', {}).get('Item', [])
                for item in items:
                    if item.get('Name') == 'Amount':
                        transaction.amount = item.get('Value', transaction.amount)
                    elif item.get('Name') == 'MpesaReceiptNumber':
                        transaction.transaction_id = item.get('Value', transaction.transaction_id)
                    elif item.get('Name') == 'PhoneNumber':
                        transaction.phone_number = item.get('Value', transaction.phone_number)
                        
                logger.info(f"Payment successful for transaction {transaction.transaction_id}")
            else:
                # Failed payment
                transaction.status = PaymentTransaction.TransactionStatus.FAILED
                transaction.status_message = result_desc
                logger.warning(f"Payment failed for checkout_request_id {checkout_request_id}: {result_desc}")
            
            transaction.save()
            
            # Mark webhook as processed
            webhook_log.processed = True
            webhook_log.save()
            
            # Return success response to M-Pesa
            return JsonResponse({'ResultCode': 0, 'ResultDesc': 'Success'})
            
        except PaymentTransaction.DoesNotExist:
            webhook_log.processing_error = f"Transaction not found for checkout_request_id: {checkout_request_id}"
            webhook_log.save()
            logger.error(f"Transaction not found for checkout_request_id: {checkout_request_id}")
            return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Transaction not found'})
            
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in webhook payload: {str(e)}")
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Invalid JSON'})
    except Exception as e:
        logger.error(f"Error processing M-Pesa webhook: {str(e)}")
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Internal server error'})

@csrf_exempt
@require_POST
def mpesa_b2c_result_webhook(request):
    """Handle M-Pesa B2C result webhook."""
    try:
        payload = json.loads(request.body)
        
        # Log webhook request
        webhook_log = WebhookLog.objects.create(
            webhook_type='mpesa_b2c_result',
            payload=payload,
            headers=dict(request.headers),
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        # Validate payload
        serializer = MpesaB2CWebhookSerializer(data=payload)
        if not serializer.is_valid():
            webhook_log.processing_error = f"Invalid payload: {serializer.errors}"
            webhook_log.save()
            return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Invalid request payload'})
        
        # Process B2C result
        result = payload.get('Result', {})
        result_code = result.get('ResultCode')
        result_desc = result.get('ResultDesc')
        originator_conversation_id = result.get('OriginatorConversationID')
        conversation_id = result.get('ConversationID')
        transaction_id = result.get('TransactionID')
        
        # Log the B2C result
        logger.info(f"B2C Result received: Code={result_code}, Desc={result_desc}, "
                   f"OriginatorConversationID={originator_conversation_id}, "
                   f"ConversationID={conversation_id}, TransactionID={transaction_id}")
        
        # Here you would typically:
        # 1. Find the B2C transaction using originator_conversation_id or conversation_id
        # 2. Update the transaction status based on result_code
        # 3. Perform any post-processing (notify user, update records, etc.)
        
        # Mark webhook as processed
        webhook_log.processed = True
        webhook_log.save()
        
        return JsonResponse({'ResultCode': 0, 'ResultDesc': 'Success'})
        
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in B2C webhook payload: {str(e)}")
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Invalid JSON'})
    except Exception as e:
        logger.error(f"Error processing B2C result webhook: {str(e)}")
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Error'})

@csrf_exempt
@require_POST
def mpesa_b2c_timeout_webhook(request):
    """Handle M-Pesa B2C timeout webhook."""
    try:
        payload = json.loads(request.body)
        
        # Log webhook request
        webhook_log = WebhookLog.objects.create(
            webhook_type='mpesa_b2c_timeout',
            payload=payload,
            headers=dict(request.headers),
            ip_address=request.META.get('REMOTE_ADDR')
        )
        
        # Validate payload
        serializer = MpesaB2CWebhookSerializer(data=payload)
        if not serializer.is_valid():
            webhook_log.processing_error = f"Invalid payload: {serializer.errors}"
            webhook_log.save()
            return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Invalid request payload'})
        
        # Process B2C timeout
        result = payload.get('Result', {})
        result_code = result.get('ResultCode')
        result_desc = result.get('ResultDesc')
        originator_conversation_id = result.get('OriginatorConversationID')
        conversation_id = result.get('ConversationID')
        
        # Log the B2C timeout
        logger.warning(f"B2C Timeout received: Code={result_code}, Desc={result_desc}, "
                      f"OriginatorConversationID={originator_conversation_id}, "
                      f"ConversationID={conversation_id}")
        
        # Here you would typically:
        # 1. Find the B2C transaction using originator_conversation_id or conversation_id
        # 2. Mark the transaction as timed out
        # 3. Perform any cleanup or retry logic
        
        # Mark webhook as processed
        webhook_log.processed = True
        webhook_log.save()
        
        return JsonResponse({'ResultCode': 0, 'ResultDesc': 'Success'})
        
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in B2C timeout webhook payload: {str(e)}")
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Invalid JSON'})
    except Exception as e:
        logger.error(f"Error processing B2C timeout webhook: {str(e)}")
        return JsonResponse({'ResultCode': 1, 'ResultDesc': 'Error'})