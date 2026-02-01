"""
Visa payment service using M-Pesa Global.
"""
import logging
from payments.models import PaymentTransaction
from payments.services.mpesa_global import MpesaGlobalService
from payments.utils.encryption import EncryptionUtil

logger = logging.getLogger(__name__)

class VisaPaymentService:
    """Service for handling Visa card payments."""
    
    def __init__(self):
        from hope_for_communities.config.payment_config import payment_config
        self.config = payment_config.get('payments.visa', {})
        
        if not self.config.get('enabled', False):
            raise ValueError("Visa payments are not enabled in configuration")
        
        self.mpesa_global_service = MpesaGlobalService()
        self.encryption_util = EncryptionUtil()
    
    def process_visa_payment(self, card_data, amount, currency, description, reference):
        """Process Visa card payment."""
        
        # Validate card type
        if card_data.get('card_type', '').lower() != 'visa':
            raise ValueError("Only Visa cards are supported")
        
        # Encrypt sensitive card data
        encrypted_card_data = self._encrypt_card_data(card_data)
        
        # Process via M-Pesa Global
        result = self.mpesa_global_service.process_payment(
            card_data=encrypted_card_data,
            amount=amount,
            currency=currency,
            description=description,
            reference=reference
        )
        
        # Update transaction method
        if 'transaction_id' in result:
            try:
                transaction = PaymentTransaction.objects.get(
                    transaction_id=result['transaction_id']
                )
                transaction.payment_method = PaymentTransaction.PaymentMethod.VISA
                transaction.save()
            except PaymentTransaction.DoesNotExist:
                pass
        
        return result
    
    def _encrypt_card_data(self, card_data):
        """Encrypt sensitive card data."""
        sensitive_fields = ['card_number', 'cvv', 'expiry_month', 'expiry_year']
        
        encrypted_data = card_data.copy()
        
        for field in sensitive_fields:
            if field in encrypted_data:
                encrypted_data[field] = self.encryption_util.encrypt(
                    str(encrypted_data[field])
                )
        
        return encrypted_data