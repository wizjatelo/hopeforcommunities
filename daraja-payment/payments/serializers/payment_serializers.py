"""
Serializers for payment requests.
"""
from rest_framework import serializers
import re

class STKPushRequestSerializer(serializers.Serializer):
    """Serializer for STK Push requests."""
    phone_number = serializers.CharField(max_length=15, required=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=True, min_value=1)
    account_reference = serializers.CharField(max_length=100, required=False)
    transaction_desc = serializers.CharField(max_length=255, required=False)
    
    def validate_phone_number(self, value):
        """Validate phone number format."""
        # Remove any non-digit characters
        digits = ''.join(filter(str.isdigit, value))
        
        # Check if it's a valid Kenyan phone number
        if len(digits) < 9 or len(digits) > 12:
            raise serializers.ValidationError("Invalid phone number length")
        
        # Convert to 254 format
        if digits.startswith('0'):
            return '254' + digits[1:]
        elif digits.startswith('254'):
            return digits
        elif digits.startswith('+254'):
            return digits[1:]
        else:
            # Assume it's already in international format
            return digits
        
        return value
    
    def validate_amount(self, value):
        """Validate amount."""
        if value <= 0:
            raise serializers.ValidationError("Amount must be greater than 0")
        return value

class STKQueryRequestSerializer(serializers.Serializer):
    """Serializer for STK Query requests."""
    checkout_request_id = serializers.CharField(max_length=100, required=True)

class CardDataSerializer(serializers.Serializer):
    """Serializer for card data."""
    card_number = serializers.CharField(max_length=19, required=True)
    expiry_month = serializers.CharField(max_length=2, required=True)
    expiry_year = serializers.CharField(max_length=4, required=True)
    cvv = serializers.CharField(max_length=4, required=True)
    card_type = serializers.CharField(max_length=20, required=False, default='visa')
    holder_name = serializers.CharField(max_length=100, required=False)
    
    def validate_card_number(self, value):
        """Validate card number using Luhn algorithm."""
        # Remove spaces and dashes
        value = value.replace(' ', '').replace('-', '')
        
        if not value.isdigit():
            raise serializers.ValidationError("Card number must contain only digits")
        
        # Check length
        if len(value) < 13 or len(value) > 19:
            raise serializers.ValidationError("Invalid card number length")
        
        # Luhn algorithm check
        def luhn_checksum(card_number):
            def digits_of(n):
                return [int(d) for d in str(n)]
            digits = digits_of(card_number)
            odd_digits = digits[-1::-2]
            even_digits = digits[-2::-2]
            checksum = sum(odd_digits)
            for d in even_digits:
                checksum += sum(digits_of(d*2))
            return checksum % 10
        
        if luhn_checksum(value) != 0:
            raise serializers.ValidationError("Invalid card number")
        
        return value
    
    def validate_expiry_month(self, value):
        """Validate expiry month."""
        if not value.isdigit():
            raise serializers.ValidationError("Expiry month must be digits")
        
        month = int(value)
        if month < 1 or month > 12:
            raise serializers.ValidationError("Invalid expiry month")
        
        return value.zfill(2)
    
    def validate_expiry_year(self, value):
        """Validate expiry year."""
        if not value.isdigit():
            raise serializers.ValidationError("Expiry year must be digits")
        
        if len(value) == 2:
            # Convert 2-digit year to 4-digit
            current_year = serializers.DateTimeField().to_representation(serializers.DateTimeField().to_internal_value(None))
            current_year_short = int(str(current_year.year)[2:])
            year = int(value)
            
            if year < current_year_short:
                year += 100  # Assume it's 2000s
            
            value = f"20{year:02d}"
        
        return value
    
    def validate_cvv(self, value):
        """Validate CVV."""
        if not value.isdigit():
            raise serializers.ValidationError("CVV must be digits")
        
        if len(value) < 3 or len(value) > 4:
            raise serializers.ValidationError("Invalid CVV length")
        
        return value

class VisaPaymentRequestSerializer(serializers.Serializer):
    """Serializer for Visa payment requests."""
    card_data = CardDataSerializer(required=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=True, min_value=0.01)
    currency = serializers.CharField(max_length=3, required=False, default='USD')
    description = serializers.CharField(max_length=255, required=False)
    reference = serializers.CharField(max_length=100, required=False)
    
    def validate_reference(self, value):
        """Generate reference if not provided."""
        if not value:
            import uuid
            return f"VISA_{uuid.uuid4().hex[:8].upper()}"
        return value

class MpesaGlobalRequestSerializer(serializers.Serializer):
    """Serializer for M-Pesa Global payment requests."""
    card_data = CardDataSerializer(required=True)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=True, min_value=0.01)
    currency = serializers.CharField(max_length=3, required=False, default='USD')
    description = serializers.CharField(max_length=255, required=False)
    reference = serializers.CharField(max_length=100, required=False)
    
    def validate_reference(self, value):
        """Generate reference if not provided."""
        if not value:
            import uuid
            return f"MGL_{uuid.uuid4().hex[:8].upper()}"
        return value