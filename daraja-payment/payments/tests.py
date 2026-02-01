"""
Tests for payments app.
"""
from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APITestCase
from rest_framework import status
from payments.models import PaymentTransaction
import json

class PaymentModelTests(TestCase):
    def test_create_payment_transaction(self):
        """Test creating a payment transaction."""
        transaction = PaymentTransaction.objects.create(
            transaction_id="TEST123",
            amount=100.00,
            currency="KES",
            account_reference="Test Reference",
            transaction_desc="Test Transaction"
        )
        
        self.assertEqual(transaction.transaction_id, "TEST123")
        self.assertEqual(transaction.status, PaymentTransaction.TransactionStatus.PENDING)
        self.assertEqual(transaction.payment_method, PaymentTransaction.PaymentMethod.MPESA_PAYBILL)

class PaymentAPITests(APITestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpass123'
        )
        self.client.force_authenticate(user=self.user)
    
    def test_get_daraja_token_unauthorized(self):
        """Test getting Daraja token without authentication."""
        self.client.force_authenticate(user=None)
        response = self.client.get('/api/v1/auth/mpesa/token/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_stk_push_invalid_data(self):
        """Test STK push with invalid data."""
        data = {
            'phone_number': 'invalid',
            'amount': 'not_a_number'
        }
        response = self.client.post('/api/v1/payments/mpesa/stk-push/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_stk_query_invalid_data(self):
        """Test STK query with invalid data."""
        data = {}
        response = self.client.post('/api/v1/payments/mpesa/stk-query/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

class WebhookTests(TestCase):
    def test_mpesa_webhook_empty_payload(self):
        """Test M-Pesa webhook with empty payload."""
        response = self.client.post(
            '/api/v1/webhooks/mpesa/paybill/',
            content_type='application/json',
            data=json.dumps({})
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['ResultCode'], 1)
    
    def test_b2c_webhook(self):
        """Test B2C webhook."""
        payload = {
            'Result': {
                'ResultType': 0,
                'ResultCode': 0,
                'ResultDesc': 'The service request is processed successfully.',
                'OriginatorConversationID': 'test123',
                'ConversationID': 'test456'
            }
        }
        response = self.client.post(
            '/api/v1/webhooks/mpesa/b2c/result/',
            content_type='application/json',
            data=json.dumps(payload)
        )
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['ResultCode'], 0)