"""
Security utilities for the payment system.
"""
import re
import hashlib
import hmac
from django.conf import settings
from datetime import datetime, timedelta
import secrets
import string
import logging

logger = logging.getLogger(__name__)

class SecurityUtil:
    """Utility class for security operations."""
    
    @staticmethod
    def generate_secure_random(length=32):
        """Generate cryptographically secure random string."""
        alphabet = string.ascii_letters + string.digits
        return ''.join(secrets.choice(alphabet) for _ in range(length))
    
    @staticmethod
    def validate_phone_number(phone_number):
        """Validate and format phone number."""
        # Remove all non-digit characters
        digits = ''.join(filter(str.isdigit, phone_number))
        
        if not digits:
            return None
        
        # Check length
        if len(digits) < 9 or len(digits) > 12:
            return None
        
        # Format to 254 format
        if digits.startswith('0'):
            return '254' + digits[1:]
        elif digits.startswith('254'):
            return digits
        elif digits.startswith('+254'):
            return digits[1:]
        elif len(digits) == 9:
            # Assume it's a local number without leading 0
            return '254' + digits
        else:
            # Assume it's already in international format
            return digits
    
    @staticmethod
    def validate_amount(amount):
        """Validate payment amount."""
        try:
            amount_float = float(amount)
            if amount_float <= 0:
                return False
            return True
        except (ValueError, TypeError):
            return False
    
    @staticmethod
    def validate_card_number(card_number):
        """Validate card number using Luhn algorithm."""
        # Remove spaces and dashes
        card_number = re.sub(r'[\s-]', '', str(card_number))
        
        if not card_number.isdigit():
            return False
        
        # Check length
        if len(card_number) < 13 or len(card_number) > 19:
            return False
        
        # Luhn algorithm
        def luhn_checksum(card_number):
            def digits_of(n):
                return [int(d) for d in str(n)]
            digits = digits_of(card_number)
            odd_digits = digits[-1::-2]
            even_digits = digits[-2::-2]
            checksum = sum(odd_digits)
            for d in even_digits:
                checksum += sum(digits_of(d * 2))
            return checksum % 10
        
        return luhn_checksum(card_number) == 0
    
    @staticmethod
    def generate_hmac_signature(data, secret_key):
        """Generate HMAC signature for data."""
        if isinstance(data, dict):
            # Convert dict to sorted string for consistent hashing
            data_str = '&'.join([f"{k}={v}" for k, v in sorted(data.items())])
        else:
            data_str = str(data)
        
        signature = hmac.new(
            secret_key.encode('utf-8'),
            data_str.encode('utf-8'),
            hashlib.sha256
        ).hexdigest()
        
        return signature
    
    @staticmethod
    def verify_hmac_signature(data, signature, secret_key):
        """Verify HMAC signature."""
        expected_signature = SecurityUtil.generate_hmac_signature(data, secret_key)
        return hmac.compare_digest(signature, expected_signature)
    
    @staticmethod
    def mask_sensitive_data(data, fields_to_mask):
        """Mask sensitive data for logging."""
        if isinstance(data, dict):
            masked_data = data.copy()
            for field in fields_to_mask:
                if field in masked_data and masked_data[field]:
                    value = str(masked_data[field])
                    if len(value) > 4:
                        masked_data[field] = '***' + value[-4:]
                    else:
                        masked_data[field] = '***'
            return masked_data
        return data
    
    @staticmethod
    def sanitize_input(input_string, max_length=255):
        """Sanitize user input."""
        if not input_string:
            return ""
        
        # Remove potentially dangerous characters
        sanitized = re.sub(r'[<>"\']', '', str(input_string))
        
        # Trim to max length
        if len(sanitized) > max_length:
            sanitized = sanitized[:max_length]
        
        return sanitized.strip()
    
    @staticmethod
    def validate_expiry_date(month, year):
        """Validate card expiry date."""
        try:
            # Convert to integers
            month_int = int(month)
            year_int = int(year)
            
            # Handle 2-digit year
            if year_int < 100:
                current_year = datetime.now().year
                century = current_year // 100 * 100
                year_int = century + year_int
            
            # Check if date is in the past
            current_date = datetime.now()
            expiry_date = datetime(year_int, month_int, 1)
            
            # Add one month to expiry date (cards expire at end of month)
            if expiry_date.month == 12:
                expiry_date = datetime(expiry_date.year + 1, 1, 1)
            else:
                expiry_date = datetime(expiry_date.year, expiry_date.month + 1, 1)
            
            return expiry_date > current_date
            
        except (ValueError, TypeError):
            return False
    
    @staticmethod
    def generate_transaction_id(prefix='TXN'):
        """Generate unique transaction ID."""
        timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
        random_part = secrets.token_hex(3).upper()
        return f"{prefix}_{timestamp}_{random_part}"
    
    @staticmethod
    def is_valid_ip_address(ip_address):
        """Validate IP address."""
        ipv4_pattern = r'^(\d{1,3}\.){3}\d{1,3}$'
        ipv6_pattern = r'^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$'
        
        if re.match(ipv4_pattern, ip_address):
            parts = ip_address.split('.')
            if all(0 <= int(part) <= 255 for part in parts):
                return True
        
        if re.match(ipv6_pattern, ip_address):
            return True
        
        return False