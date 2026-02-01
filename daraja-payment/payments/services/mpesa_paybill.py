"""
M-Pesa PayBill STK Push service.
"""
import requests
import base64
import datetime
import json
from django.conf import settings
from django.utils import timezone
import logging
from payments.models import PaymentTransaction
from payments.services.daraja_auth import DarajaAuthService
from payments.utils.encryption import EncryptionUtil

logger = logging.getLogger(__name__)

class MpesaPaybillService:
    """Service for handling M-Pesa PayBill STK Push payments."""
    
    def __init__(self):
        from hope_for_communities.config.payment_config import payment_config
        self.config = payment_config.daraja_config
        self.auth_service = DarajaAuthService()
        self.encryption_util = EncryptionUtil()
    
    def _generate_password(self, shortcode, passkey):
        """Generate password for STK Push."""
        timestamp = datetime.datetime.now().strftime("%Y%m%d%H%M%S")
        data_to_encode = f"{shortcode}{passkey}{timestamp}"
        encoded = base64.b64encode(data_to_encode.encode()).decode()
        return encoded, timestamp
    
    def _format_phone_number(self, phone_number):
        """Format phone number to 2547XXXXXXXX format."""
        # Remove any non-digit characters
        digits = ''.join(filter(str.isdigit, phone_number))
        
        if digits.startswith('0'):
            return '254' + digits[1:]
        elif digits.startswith('254'):
            return digits
        elif digits.startswith('+254'):
            return digits[1:]
        else:
            # Assume it's already in international format
            return digits
    
    def initiate_stk_push(self, phone_number, amount, account_reference=None, transaction_desc=None):
        """Initiate STK Push payment."""
        
        # Get Daraja access token
        access_token = self.auth_service.generate_access_token()
        
        # Format phone number
        formatted_phone = self._format_phone_number(phone_number)
        
        # Generate password
        shortcode = self.config['paybill']['shortcode']
        passkey = self.config['paybill']['passkey']
        
        if not shortcode or not passkey:
            raise ValueError("MPESA_PAYBILL_SHORTCODE and DARAJA_PASSKEY must be set")
        
        password, timestamp = self._generate_password(shortcode, passkey)
        
        # Prepare STK Push request
        stk_config = self.config['paybill']['stk_push']
        url = f"{self.config['base_url']}{stk_config['endpoint']}"
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "TransactionType": stk_config['transaction_type'],
            "Amount": str(int(amount)),  # Amount in whole shillings
            "PartyA": formatted_phone,
            "PartyB": shortcode,
            "PhoneNumber": formatted_phone,
            "CallBackURL": stk_config['callback_url'],
            "AccountReference": account_reference or stk_config['account_reference'],
            "TransactionDesc": transaction_desc or stk_config['transaction_desc']
        }
        
        # Create transaction record
        transaction = PaymentTransaction.objects.create(
            transaction_id=f"STK_{timestamp}_{formatted_phone[-8:]}",
            amount=amount,
            currency='KES',
            phone_number=formatted_phone,
            account_reference=payload['AccountReference'],
            transaction_desc=payload['TransactionDesc'],
            payment_method=PaymentTransaction.PaymentMethod.MPESA_PAYBILL,
            status=PaymentTransaction.TransactionStatus.PENDING
        )
        
        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            
            response_data = response.json()
            
            # Update transaction with response
            transaction.merchant_request_id = response_data.get('MerchantRequestID')
            transaction.checkout_request_id = response_data.get('CheckoutRequestID')
            transaction.mpesa_response_code = response_data.get('ResponseCode')
            transaction.mpesa_response_description = response_data.get('ResponseDescription')
            transaction.raw_response = response_data
            transaction.save()
            
            if response_data.get('ResponseCode') == '0':
                logger.info(f"STK Push initiated successfully for transaction {transaction.transaction_id}")
                return {
                    'success': True,
                    'transaction_id': transaction.transaction_id,
                    'merchant_request_id': response_data.get('MerchantRequestID'),
                    'checkout_request_id': response_data.get('CheckoutRequestID'),
                    'response_description': response_data.get('ResponseDescription'),
                    'customer_message': response_data.get('CustomerMessage')
                }
            else:
                transaction.status = PaymentTransaction.TransactionStatus.FAILED
                transaction.status_message = response_data.get('ResponseDescription')
                transaction.save()
                
                logger.error(f"STK Push failed: {response_data.get('ResponseDescription')}")
                return {
                    'success': False,
                    'error': response_data.get('ResponseDescription'),
                    'transaction_id': transaction.transaction_id
                }
                
        except requests.exceptions.RequestException as e:
            transaction.status = PaymentTransaction.TransactionStatus.FAILED
            transaction.status_message = str(e)
            transaction.save()
            
            logger.error(f"STK Push request failed: {str(e)}")
            raise Exception(f"STK Push request failed: {str(e)}")
    
    def query_stk_status(self, checkout_request_id):
        """Query STK Push status."""
        
        # Get Daraja access token
        access_token = self.auth_service.generate_access_token()
        
        # Generate password
        shortcode = self.config['paybill']['shortcode']
        passkey = self.config['paybill']['passkey']
        password, timestamp = self._generate_password(shortcode, passkey)
        
        url = f"{self.config['base_url']}{self.config['paybill']['query']['endpoint']}"
        
        headers = {
            'Authorization': f'Bearer {access_token}',
            'Content-Type': 'application/json'
        }
        
        payload = {
            "BusinessShortCode": shortcode,
            "Password": password,
            "Timestamp": timestamp,
            "CheckoutRequestID": checkout_request_id
        }
        
        try:
            response = requests.post(url, json=payload, headers=headers)
            response.raise_for_status()
            
            response_data = response.json()
            
            # Find and update transaction
            try:
                transaction = PaymentTransaction.objects.get(
                    checkout_request_id=checkout_request_id
                )
                
                transaction.result_code = response_data.get('ResultCode')
                transaction.result_description = response_data.get('ResultDesc')
                transaction.raw_response = response_data
                
                if response_data.get('ResultCode') == '0':
                    transaction.status = PaymentTransaction.TransactionStatus.SUCCESS
                else:
                    transaction.status = PaymentTransaction.TransactionStatus.FAILED
                    transaction.status_message = response_data.get('ResultDesc')
                
                transaction.save()
                
                logger.info(f"STK Query completed for {checkout_request_id}: {response_data.get('ResultDesc')}")
                
            except PaymentTransaction.DoesNotExist:
                logger.warning(f"No transaction found for checkout_request_id: {checkout_request_id}")
            
            return response_datas
            
        except requests.exceptions.RequestException as e:
            logger.error(f"STK Query request failed: {str(e)}")
            raise Exception(f"STK Query request failed: {str(e)}")