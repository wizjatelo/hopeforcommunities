"""
M-Pesa Global payment service.
"""
import requests
import base64
import json
from django.conf import settings
import logging
from payments.models import PaymentTransaction
from payments.utils.encryption import EncryptionUtil

logger = logging.getLogger(__name__)

class MpesaGlobalService:
    """Service for handling M-Pesa Global payments."""
    
    def __init__(self):
        from hope_for_communities.config.payment_config import payment_config
        self.config = payment_config.mpesa_global_config
        
        if not self.config.get('enabled', False):
            raise ValueError("M-Pesa Global is not enabled in configuration")
        
        self.base_url = self.config['base_url']
        self.merchant_id = self.config['merchant_id']
        self.api_key = self.config['api_key']
        
        if not self.merchant_id or not self.api_key:
            raise ValueError("MPESA_GLOBAL_MERCHANT_ID and MPESA_GLOBAL_API_KEY must be set")
        
        self.encryption_util = EncryptionUtil()
    
    def _get_headers(self):
        """Get headers for M-Pesa Global API requests."""
        # Encode API key for basic auth
        encoded_api_key = base64.b64encode(f"{self.merchant_id}:{self.api_key}".encode()).decode()
        
        return {
            'Authorization': f'Basic {encoded_api_key}',
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    
    def process_payment(self, card_data, amount, currency, description, reference):
        """Process payment via M-Pesa Global."""
        
        # Validate card type
        card_type = card_data.get('card_type', '').lower()
        supported_cards = self.config.get('supported_cards', [])
        
        if card_type not in supported_cards:
            raise ValueError(f"Card type {card_type} not supported. Supported: {supported_cards}")
        
        # Create transaction record
        transaction = PaymentTransaction.objects.create(
            transaction_id=reference,
            amount=amount,
            currency=currency or self.config.get('settlement_currency', 'USD'),
            account_reference=description,
            transaction_desc=description,
            payment_method=PaymentTransaction.PaymentMethod.MPESA_GLOBAL,
            status=PaymentTransaction.TransactionStatus.PENDING,
            card_last_four=card_data.get('card_number', '')[-4:],
            card_type=card_type.upper()
        )
        
        # Prepare payment payload
        payload = {
            "merchant": {
                "id": self.merchant_id
            },
            "transaction": {
                "reference": reference,
                "amount": str(amount),
                "currency": currency or self.config.get('settlement_currency', 'USD'),
                "description": description
            },
            "card": {
                "number": card_data['card_number'],
                "expiry_month": card_data['expiry_month'],
                "expiry_year": card_data['expiry_year'],
                "cvv": card_data['cvv'],
                "holder_name": card_data.get('holder_name', '')
            },
            "callback_url": self.config['callback_url']
        }
        
        # Add billing address if provided
        if 'billing_address' in card_data:
            payload['billing_address'] = card_data['billing_address']
        
        # Add 3DS data if required
        if self.config.get('requires_3ds', True):
            payload['three_d_secure'] = {
                "enabled": True,
                "return_url": f"{settings.APP_BASE_URL}/api/v1/payments/3ds/callback"
            }
        
        url = f"{self.base_url}/v1/payments"
        
        try:
            headers = self._get_headers()
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            
            response_data = response.json()
            
            # Update transaction
            transaction.raw_response = response_data
            transaction.status_message = response_data.get('status', '')
            
            if response_data.get('status') in ['SUCCESS', 'PENDING']:
                if response_data.get('status') == 'SUCCESS':
                    transaction.status = PaymentTransaction.TransactionStatus.SUCCESS
                    transaction.completed_at = timezone.now()
                else:
                    transaction.status = PaymentTransaction.TransactionStatus.PROCESSING
            else:
                transaction.status = PaymentTransaction.TransactionStatus.FAILED
            
            transaction.save()
            
            logger.info(f"M-Pesa Global payment initiated for transaction {reference}")
            
            return {
                'success': True,
                'transaction_id': transaction.transaction_id,
                'status': response_data.get('status'),
                'message': response_data.get('message', ''),
                'payment_id': response_data.get('id'),
                '3ds_redirect_url': response_data.get('redirect_url') if response_data.get('requires_3ds') else None
            }
            
        except requests.exceptions.RequestException as e:
            transaction.status = PaymentTransaction.TransactionStatus.FAILED
            transaction.status_message = str(e)
            transaction.save()
            
            logger.error(f"M-Pesa Global payment failed: {str(e)}")
            raise Exception(f"M-Pesa Global payment failed: {str(e)}")
    
    def check_payment_status(self, payment_id):
        """Check payment status."""
        url = f"{self.base_url}/v1/payments/{payment_id}"
        
        try:
            headers = self._get_headers()
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            return response.json()
            
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to check payment status: {str(e)}")
            raise Exception(f"Failed to check payment status: {str(e)}")