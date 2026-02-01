"""
Payment configuration loader from YAML.
"""
import os
from pathlib import Path
import yaml
from django.conf import settings

class PaymentConfig:
    """Load and manage payment configuration."""
    
    def __init__(self):
        self.config = self._load_config()
    
    def _load_config(self):
        """Load configuration from YAML file."""
        config_path = Path(__file__).parent.parent.parent / 'config' / 'payment_config.yaml'
        
        if not config_path.exists():
            # Create default config from settings
            return self._create_default_config()
        
        with open(config_path, 'r') as f:
            return yaml.safe_load(f)
    
    def _create_default_config(self):
        """Create default configuration from Django settings."""
        return {
            'app': {
                'name': settings.APP_NAME,
                'environment': settings.APP_ENVIRONMENT,
                'base_url': settings.APP_BASE_URL,
                'api_version': settings.API_VERSION,
            },
            'server': {
                'port': 8000,
                'cors': {
                    'enabled': True,
                    'allowed_origins': ['*']
                }
            },
            'security': {
                'jwt': {
                    'secret': os.getenv('JWT_SECRET'),
                    'expires_in_seconds': 3600
                },
                'encryption': {
                    'algorithm': 'AES-256-GCM'
                }
            },
            'payments': {
                'mpesa': {
                    'daraja': {
                        'environment': os.getenv('DARAJA_ENVIRONMENT', 'sandbox'),
                        'base_url': 'https://sandbox.safaricom.co.ke' if os.getenv('DARAJA_ENVIRONMENT') == 'sandbox' else 'https://api.safaricom.co.ke',
                        'oauth': {
                            'method': 'GET',
                            'endpoint': '/oauth/v1/generate?grant_type=client_credentials',
                            'auth_type': 'basic',
                            'consumer_key': os.getenv('DARAJA_CONSUMER_KEY'),
                            'consumer_secret': os.getenv('DARAJA_CONSUMER_SECRET'),
                            'token_cache': {
                                'enabled': True,
                                'ttl_seconds': 3500
                            }
                        },
                        'paybill': {
                            'shortcode': os.getenv('MPESA_PAYBILL_SHORTCODE'),
                            'passkey': os.getenv('DARAJA_PASSKEY'),
                            'stk_push': {
                                'endpoint': '/mpesa/stkpush/v1/processrequest',
                                'transaction_type': 'CustomerPayBillOnline',
                                'account_reference': 'HopeForCommunities',
                                'transaction_desc': 'Donation',
                                'callback_url': f'{settings.APP_BASE_URL}/api/v1/webhooks/mpesa/paybill'
                            },
                            'query': {
                                'endpoint': '/mpesa/stkpushquery/v1/query'
                            }
                        },
                        'b2c': {
                            'endpoint': '/mpesa/b2c/v1/paymentrequest',
                            'initiator_name': os.getenv('MPESA_INITIATOR_NAME'),
                            'security_credential': os.getenv('MPESA_SECURITY_CREDENTIAL'),
                            'result_url': f'{settings.APP_BASE_URL}/api/v1/webhooks/mpesa/b2c/result',
                            'timeout_url': f'{settings.APP_BASE_URL}/api/v1/webhooks/mpesa/b2c/timeout'
                        }
                    },
                    'mpesa_global': {
                        'enabled': os.getenv('MPESA_GLOBAL_ENABLED', 'False').lower() == 'true',
                        'base_url': 'https://api.safaricom.co.ke',
                        'merchant_id': os.getenv('MPESA_GLOBAL_MERCHANT_ID'),
                        'api_key': os.getenv('MPESA_GLOBAL_API_KEY'),
                        'supported_cards': ['visa'],
                        'settlement_currency': 'USD',
                        'callback_url': f'{settings.APP_BASE_URL}/api/v1/webhooks/mpesa/global'
                    }
                },
                'visa': {
                    'enabled': True,
                    'provider': 'mpesa_global',
                    'requires_3ds': True
                }
            },
            'routes': {
                'auth': {
                    'daraja_token': '/api/v1/auth/mpesa/token'
                },
                'payments': {
                    'stk_push': '/api/v1/payments/mpesa/stk-push',
                    'stk_query': '/api/v1/payments/mpesa/stk-query',
                    'mpesa_global': '/api/v1/payments/mpesa/global',
                    'visa': '/api/v1/payments/visa'
                },
                'webhooks': {
                    'mpesa_paybill': '/api/v1/webhooks/mpesa/paybill',
                    'mpesa_b2c_result': '/api/v1/webhooks/mpesa/b2c/result',
                    'mpesa_b2c_timeout': '/api/v1/webhooks/mpesa/b2c/timeout',
                    'mpesa_global': '/api/v1/webhooks/mpesa/global'
                }
            }
        }
    
    def get(self, key, default=None):
        """Get configuration value by dot notation key."""
        keys = key.split('.')
        value = self.config
        
        for k in keys:
            if isinstance(value, dict) and k in value:
                value = value[k]
            else:
                return default
        
        return value
    
    @property
    def mpesa_config(self):
        """Get M-Pesa configuration."""
        return self.get('payments.mpesa')
    
    @property
    def daraja_config(self):
        """Get Daraja configuration."""
        return self.get('payments.mpesa.daraja')
    
    @property
    def mpesa_global_config(self):
        """Get M-Pesa Global configuration."""
        return self.get('payments.mpesa.mpesa_global')

payment_config = PaymentConfig()