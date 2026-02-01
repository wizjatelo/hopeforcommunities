"""
Daraja OAuth authentication service.
"""
import base64
import requests
from django.conf import settings
from django.core.cache import cache
from django.utils import timezone
from datetime import timedelta
import logging
from payments.models import AccessToken

logger = logging.getLogger(__name__)

class DarajaAuthService:
    """Service for handling Daraja OAuth authentication."""
    
    def __init__(self):
        from hope_for_communities.config.payment_config import payment_config
        self.config = payment_config.daraja_config
        self.base_url = self.config['base_url']
        self.oauth_config = self.config['oauth']
    
    def _get_basic_auth_token(self):
        """Generate Basic Auth token."""
        consumer_key = self.oauth_config['consumer_key']
        consumer_secret = self.oauth_config['consumer_secret']
        
        if not consumer_key or not consumer_secret:
            raise ValueError("DARAJA_CONSUMER_KEY and DARAJA_CONSUMER_SECRET must be set")
        
        credentials = f"{consumer_key}:{consumer_secret}"
        encoded_credentials = base64.b64encode(credentials.encode()).decode()
        return f"Basic {encoded_credentials}"
    
    def _cache_token(self, access_token, expires_in):
        """Cache access token in Redis and database."""
        cache_key = f"daraja_access_token_{settings.APP_ENVIRONMENT}"
        expires_at = timezone.now() + timedelta(seconds=expires_in)
        
        # Cache in Redis
        cache.set(cache_key, access_token, timeout=expires_in)
        
        # Store in database
        AccessToken.objects.update_or_create(
            provider='daraja',
            defaults={
                'token': access_token,
                'expires_at': expires_at
            }
        )
        
        logger.info(f"Daraja access token cached. Expires at: {expires_at}")
    
    def get_cached_token(self):
        """Get cached access token."""
        cache_key = f"daraja_access_token_{settings.APP_ENVIRONMENT}"
        
        # Try Redis cache first
        token = cache.get(cache_key)
        if token:
            logger.debug("Retrieved Daraja token from Redis cache")
            return token
        
        # Try database cache
        try:
            db_token = AccessToken.objects.get(provider='daraja')
            if not db_token.is_expired():
                # Cache in Redis
                remaining_time = (db_token.expires_at - timezone.now()).seconds
                cache.set(cache_key, db_token.token, timeout=remaining_time)
                logger.debug("Retrieved Daraja token from database cache")
                return db_token.token
        except AccessToken.DoesNotExist:
            pass
        
        return None
    
    def generate_access_token(self, force_refresh=False):
        """Generate or retrieve Daraja access token."""
        
        if not force_refresh:
            # Try to get cached token
            cached_token = self.get_cached_token()
            if cached_token:
                return cached_token
        
        # Generate new token
        url = f"{self.base_url}{self.oauth_config['endpoint']}"
        headers = {
            'Authorization': self._get_basic_auth_token(),
            'Content-Type': 'application/json'
        }
        
        try:
            response = requests.get(url, headers=headers)
            response.raise_for_status()
            
            data = response.json()
            
            if 'access_token' in data and 'expires_in' in data:
                access_token = data['access_token']
                expires_in = int(data['expires_in'])
                
                # Cache the token
                if self.oauth_config['token_cache']['enabled']:
                    self._cache_token(access_token, expires_in)
                
                logger.info("Successfully generated new Daraja access token")
                return access_token
            else:
                logger.error(f"Invalid response from Daraja OAuth: {data}")
                raise Exception(f"Invalid response from Daraja OAuth: {data}")
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Failed to generate Daraja access token: {str(e)}")
            raise Exception(f"Failed to generate Daraja access token: {str(e)}")
    
    def validate_token(self, token):
        """Validate if token is still valid."""
        cache_key = f"daraja_access_token_{settings.APP_ENVIRONMENT}"
        cached_token = cache.get(cache_key)
        return cached_token == token