"""
URL configuration for payments app.
"""
from django.urls import path
from payments.views import (
    get_daraja_token,
    initiate_stk_push,
    query_stk_status,
    process_visa_payment,
    process_mpesa_global
)
from payments.webhooks.mpesa_handlers import (
    mpesa_paybill_webhook,
    mpesa_b2c_result_webhook,
    mpesa_b2c_timeout_webhook
)

urlpatterns = [
    # Auth endpoints
    path('auth/mpesa/token/', get_daraja_token, name='daraja_token'),
    
    # Payment endpoints
    path('payments/mpesa/stk-push/', initiate_stk_push, name='stk_push'),
    path('payments/mpesa/stk-query/', query_stk_status, name='stk_query'),
    path('payments/visa/', process_visa_payment, name='visa_payment'),
    path('payments/mpesa/global/', process_mpesa_global, name='mpesa_global'),
    
    # Webhook endpoints
    path('webhooks/mpesa/paybill/', mpesa_paybill_webhook, name='mpesa_paybill_webhook'),
    path('webhooks/mpesa/b2c/result/', mpesa_b2c_result_webhook, name='mpesa_b2c_result_webhook'),
    path('webhooks/mpesa/b2c/timeout/', mpesa_b2c_timeout_webhook, name='mpesa_b2c_timeout_webhook'),
]