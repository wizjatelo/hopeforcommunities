"""
Encryption utilities for sensitive data.
"""
import os
from django.conf import settings
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2
import base64
import logging

logger = logging.getLogger(__name__)

class EncryptionUtil:
    """Utility class for encryption and decryption."""
    
    def __init__(self):
        self.algorithm = 'AES-256-GCM'
        self.key_length = 32
        self.salt_length = 16
        self.nonce_length = 12
        self.tag_length = 16
        
        # Get encryption key from environment or settings
        self.secret_key = os.getenv('ENCRYPTION_KEY', settings.SECRET_KEY)
        
    def encrypt(self, plaintext):
        """Encrypt plaintext using AES-256-GCM."""
        try:
            # Generate salt and nonce
            salt = os.urandom(self.salt_length)
            nonce = os.urandom(self.nonce_length)
            
            # Derive key from secret
            kdf = PBKDF2(
                algorithm=hashes.SHA256(),
                length=self.key_length,
                salt=salt,
                iterations=100000,
            )
            key = kdf.derive(self.secret_key.encode())
            
            # Encrypt
            cipher = Cipher(algorithms.AES(key), modes.GCM(nonce))
            encryptor = cipher.encryptor()
            ciphertext = encryptor.update(plaintext.encode()) + encryptor.finalize()
            
            # Combine salt, nonce, ciphertext, and tag
            tag = encryptor.tag
            encrypted_data = salt + nonce + ciphertext + tag
            
            # Return base64 encoded
            return base64.b64encode(encrypted_data).decode()
            
        except Exception as e:
            logger.error(f"Encryption failed: {str(e)}")
            raise
    
    def decrypt(self, encrypted_text):
        """Decrypt ciphertext using AES-256-GCM."""
        try:
            # Decode base64
            encrypted_data = base64.b64decode(encrypted_text)
            
            # Extract components
            salt = encrypted_data[:self.salt_length]
            nonce = encrypted_data[self.salt_length:self.salt_length + self.nonce_length]
            ciphertext = encrypted_data[self.salt_length + self.nonce_length:-self.tag_length]
            tag = encrypted_data[-self.tag_length:]
            
            # Derive key
            kdf = PBKDF2(
                algorithm=hashes.SHA256(),
                length=self.key_length,
                salt=salt,
                iterations=100000,
            )
            key = kdf.derive(self.secret_key.encode())
            
            # Decrypt
            cipher = Cipher(algorithms.AES(key), modes.GCM(nonce, tag))
            decryptor = cipher.decryptor()
            plaintext = decryptor.update(ciphertext) + decryptor.finalize()
            
            return plaintext.decode()
            
        except Exception as e:
            logger.error(f"Decryption failed: {str(e)}")
            raise
    
    def encrypt_dict(self, data_dict, fields_to_encrypt):
        """Encrypt specific fields in a dictionary."""
        encrypted_dict = data_dict.copy()
        
        for field in fields_to_encrypt:
            if field in encrypted_dict and encrypted_dict[field]:
                encrypted_dict[field] = self.encrypt(str(encrypted_dict[field]))
        
        return encrypted_dict
    
    def decrypt_dict(self, encrypted_dict, fields_to_decrypt):
        """Decrypt specific fields in a dictionary."""
        decrypted_dict = encrypted_dict.copy()
        
        for field in fields_to_decrypt:
            if field in decrypted_dict and decrypted_dict[field]:
                decrypted_dict[field] = self.decrypt(decrypted_dict[field])
        
        return decrypted_dict