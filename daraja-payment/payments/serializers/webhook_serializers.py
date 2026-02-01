"""
Serializers for webhook payloads.
"""
from rest_framework import serializers

class MpesaPaybillWebhookSerializer(serializers.Serializer):
    """Serializer for M-Pesa PayBill webhook payload."""
    
    class STKCallbackSerializer(serializers.Serializer):
        class CallbackMetadataItemSerializer(serializers.Serializer):
            Name = serializers.CharField()
            Value = serializers.CharField(required=False)
        
        MerchantRequestID = serializers.CharField()
        CheckoutRequestID = serializers.CharField()
        ResultCode = serializers.IntegerField()
        ResultDesc = serializers.CharField()
        CallbackMetadata = serializers.DictField(required=False)
    
    Body = serializers.DictField()
    
    def validate(self, data):
        body = data.get('Body', {})
        stk_callback = body.get('stkCallback', {})
        
        if not stk_callback.get('CheckoutRequestID'):
            raise serializers.ValidationError("CheckoutRequestID is required")
        
        if stk_callback.get('ResultCode') is None:
            raise serializers.ValidationError("ResultCode is required")
        
        return data

class MpesaB2CWebhookSerializer(serializers.Serializer):
    """Serializer for M-Pesa B2C webhook payload."""
    
    class ResultSerializer(serializers.Serializer):
        ResultType = serializers.IntegerField()
        ResultCode = serializers.IntegerField()
        ResultDesc = serializers.CharField()
        OriginatorConversationID = serializers.CharField()
        ConversationID = serializers.CharField()
        TransactionID = serializers.CharField(required=False)
    
    Result = ResultSerializer()

class MpesaGlobalWebhookSerializer(serializers.Serializer):
    """Serializer for M-Pesa Global webhook payload."""
    reference = serializers.CharField()
    status = serializers.CharField()
    message = serializers.CharField(required=False)
    payment_id = serializers.CharField(required=False)
    amount = serializers.DecimalField(max_digits=10, decimal_places=2, required=False)
    currency = serializers.CharField(max_length=3, required=False)
    
    def validate_status(self, value):
        """Validate status value."""
        valid_statuses = ['SUCCESS', 'FAILED', 'PENDING', 'CANCELLED']
        if value not in valid_statuses:
            raise serializers.ValidationError(f"Status must be one of: {', '.join(valid_statuses)}")
        return value