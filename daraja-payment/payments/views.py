"""
Views for payment endpoints.
"""
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils import timezone
import logging

from payments.serializers.payment_serializers import (
    STKPushRequestSerializer,
    STKQueryRequestSerializer,
    VisaPaymentRequestSerializer,
    MpesaGlobalRequestSerializer
)
from payments.services.mpesa_paybill import MpesaPaybillService
from payments.services.visa_payment import VisaPaymentService
from payments.services.mpesa_global import MpesaGlobalService
from payments.services.daraja_auth import DarajaAuthService

logger = logging.getLogger(__name__)

@api_view(['GET'])
def get_daraja_token(request):
    """Get Daraja OAuth token."""
    try:
        auth_service = DarajaAuthService()
        token = auth_service.generate_access_token()
        
        return Response({
            'success': True,
            'access_token': token,
            'token_type': 'Bearer',
            'expires_in': 3599,
            'generated_at': timezone.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Failed to generate Daraja token: {str(e)}")
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def initiate_stk_push(request):
    """Initiate STK Push payment."""
    serializer = STKPushRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        service = MpesaPaybillService()
        result = service.initiate_stk_push(
            phone_number=serializer.validated_data['phone_number'],
            amount=serializer.validated_data['amount'],
            account_reference=serializer.validated_data.get('account_reference'),
            transaction_desc=serializer.validated_data.get('transaction_desc')
        )
        
        if result['success']:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        logger.error(f"STK Push failed: {str(e)}")
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def query_stk_status(request):
    """Query STK Push status."""
    serializer = STKQueryRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        service = MpesaPaybillService()
        result = service.query_stk_status(
            serializer.validated_data['checkout_request_id']
        )
        
        return Response(result, status=status.HTTP_200_OK)
            
    except Exception as e:
        logger.error(f"STK Query failed: {str(e)}")
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def process_visa_payment(request):
    """Process Visa card payment."""
    serializer = VisaPaymentRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        service = VisaPaymentService()
        result = service.process_visa_payment(
            card_data=serializer.validated_data['card_data'],
            amount=serializer.validated_data['amount'],
            currency=serializer.validated_data.get('currency', 'USD'),
            description=serializer.validated_data.get('description', 'Visa Payment'),
            reference=serializer.validated_data.get('reference')
        )
        
        if result['success']:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        logger.error(f"Visa payment failed: {str(e)}")
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def process_mpesa_global(request):
    """Process M-Pesa Global payment."""
    serializer = MpesaGlobalRequestSerializer(data=request.data)
    
    if not serializer.is_valid():
        return Response({
            'success': False,
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        service = MpesaGlobalService()
        result = service.process_payment(
            card_data=serializer.validated_data['card_data'],
            amount=serializer.validated_data['amount'],
            currency=serializer.validated_data.get('currency', 'USD'),
            description=serializer.validated_data.get('description', 'M-Pesa Global Payment'),
            reference=serializer.validated_data.get('reference')
        )
        
        if result['success']:
            return Response(result, status=status.HTTP_200_OK)
        else:
            return Response(result, status=status.HTTP_400_BAD_REQUEST)
            
    except Exception as e:
        logger.error(f"M-Pesa Global payment failed: {str(e)}")
        return Response({
            'success': False,
            'error': str(e)
        }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)