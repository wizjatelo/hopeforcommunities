from django.contrib import admin
from .models import PaymentTransaction, AccessToken, WebhookLog

@admin.register(PaymentTransaction)
class PaymentTransactionAdmin(admin.ModelAdmin):
    list_display = ('transaction_id', 'amount', 'currency', 'status', 'payment_method', 'created_at')
    list_filter = ('status', 'payment_method', 'created_at')
    search_fields = ('transaction_id', 'phone_number', 'account_reference')
    readonly_fields = ('created_at', 'updated_at', 'completed_at')
    fieldsets = (
        ('Transaction Details', {
            'fields': ('transaction_id', 'merchant_request_id', 'checkout_request_id')
        }),
        ('Payment Information', {
            'fields': ('amount', 'currency', 'phone_number', 'account_reference', 'transaction_desc', 'payment_method')
        }),
        ('Status Information', {
            'fields': ('status', 'status_message', 'mpesa_response_code', 'mpesa_response_description', 
                      'result_code', 'result_description')
        }),
        ('Card Details', {
            'fields': ('card_last_four', 'card_type'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at', 'completed_at'),
            'classes': ('collapse',)
        }),
        ('Raw Data', {
            'fields': ('callback_metadata', 'raw_response'),
            'classes': ('collapse',)
        }),
    )

@admin.register(AccessToken)
class AccessTokenAdmin(admin.ModelAdmin):
    list_display = ('provider', 'expires_at', 'created_at')
    list_filter = ('provider', 'expires_at')
    readonly_fields = ('created_at',)

@admin.register(WebhookLog)
class WebhookLogAdmin(admin.ModelAdmin):
    list_display = ('webhook_type', 'processed', 'created_at', 'ip_address')
    list_filter = ('webhook_type', 'processed', 'created_at')
    search_fields = ('webhook_type', 'processing_error')
    readonly_fields = ('created_at',)
    fieldsets = (
        ('Webhook Information', {
            'fields': ('webhook_type', 'processed', 'processing_error', 'ip_address')
        }),
        ('Data', {
            'fields': ('payload', 'headers'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at',),
            'classes': ('collapse',)
        }),
    )