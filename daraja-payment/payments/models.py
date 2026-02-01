"""
Database models for payments.
"""
from django.db import models
from django.utils import timezone
import uuid

class PaymentTransaction(models.Model):
    """Model for storing payment transactions."""
    
    class TransactionStatus(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        SUCCESS = 'SUCCESS', 'Success'
        FAILED = 'FAILED', 'Failed'
        CANCELLED = 'CANCELLED', 'Cancelled'
        PROCESSING = 'PROCESSING', 'Processing'
    
    class PaymentMethod(models.TextChoices):
        MPESA_PAYBILL = 'MPESA_PAYBILL', 'M-Pesa PayBill'
        MPESA_GLOBAL = 'MPESA_GLOBAL', 'M-Pesa Global'
        VISA = 'VISA', 'Visa Card'
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    transaction_id = models.CharField(max_length=100, unique=True, db_index=True)
    merchant_request_id = models.CharField(max_length=100, null=True, blank=True)
    checkout_request_id = models.CharField(max_length=100, null=True, blank=True)
    
    # Payment details
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='KES')
    phone_number = models.CharField(max_length=15, null=True, blank=True)
    account_reference = models.CharField(max_length=100)
    transaction_desc = models.CharField(max_length=255)
    
    # Payment method
    payment_method = models.CharField(
        max_length=20,
        choices=PaymentMethod.choices,
        default=PaymentMethod.MPESA_PAYBILL
    )
    
    # Status tracking
    status = models.CharField(
        max_length=20,
        choices=TransactionStatus.choices,
        default=TransactionStatus.PENDING
    )
    status_message = models.TextField(null=True, blank=True)
    
    # Provider responses
    mpesa_response_code = models.CharField(max_length=10, null=True, blank=True)
    mpesa_response_description = models.CharField(max_length=255, null=True, blank=True)
    result_code = models.CharField(max_length=10, null=True, blank=True)
    result_description = models.CharField(max_length=255, null=True, blank=True)
    
    # Card details (for Visa/M-Pesa Global)
    card_last_four = models.CharField(max_length=4, null=True, blank=True)
    card_type = models.CharField(max_length=20, null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Webhook data
    callback_metadata = models.JSONField(null=True, blank=True)
    raw_response = models.JSONField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['transaction_id']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
            models.Index(fields=['phone_number']),
        ]
    
    def __str__(self):
        return f"{self.transaction_id} - {self.amount} {self.currency}"

class AccessToken(models.Model):
    """Model for caching access tokens."""
    provider = models.CharField(max_length=50, unique=True)  # e.g., 'daraja', 'mpesa_global'
    token = models.TextField()
    expires_at = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def is_expired(self):
        return timezone.now() >= self.expires_at
    
    class Meta:
        ordering = ['-created_at']

class WebhookLog(models.Model):
    """Model for logging webhook requests."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    webhook_type = models.CharField(max_length=50)
    payload = models.JSONField()
    headers = models.JSONField(null=True, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    processed = models.BooleanField(default=False)
    processing_error = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    class Meta:
        ordering = ['-created_at']