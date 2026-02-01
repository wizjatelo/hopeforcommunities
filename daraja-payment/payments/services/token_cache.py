"""
Token caching service.
"""
from django.core.cache import cache
from django.utils import timezone
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)

class TokenCacheService:
    """Service for managing token caching."""
    
    def __init__(self, provider):
        self.provider = provider
        self.cache_prefix = f"{provider}_token"
    
    def set_token(self, token, ttl_seconds=3500):
        """Cache a token with TTL."""
        cache_key = f"{self.cache_prefix}_{timezone.now().timestamp()}"
        cache.set(cache_key, token, timeout=ttl_seconds)
        logger.info(f"Cached {self.provider} token with TTL: {ttl_seconds} seconds")
    
    def get_token(self):
        """Get cached token."""
        # Get all cache keys for this provider
        cache_keys = self._get_all_cache_keys()
        
        for key in cache_keys:
            token = cache.get(key)
            if token:
                logger.debug(f"Retrieved {self.provider} token from cache")
                return token
        
        logger.debug(f"No cached token found for {self.provider}")
        return None
    
    def clear_tokens(self):
        """Clear all cached tokens for this provider."""
        cache_keys = self._get_all_cache_keys()
        for key in cache_keys:
            cache.delete(key)
        logger.info(f"Cleared all cached tokens for {self.provider}")
    
    def _get_all_cache_keys(self):
        """Get all cache keys for this provider."""
        # Note: This is a simplified implementation
        # In production, you might want to use Redis SCAN or maintain a key index
        current_time = timezone.now().timestamp()
        # Return keys from the last hour
        keys = []
        for i in range(3600):  # Last hour in seconds
            key = f"{self.cache_prefix}_{current_time - i}"
            if cache.get(key):
                keys.append(key)
        return keys
    
    def get_token_ttl(self, token):
        """Get remaining TTL for a token."""
        cache_keys = self._get_all_cache_keys()
        
        for key in cache_keys:
            if cache.get(key) == token:
                ttl = cache.ttl(key)
                if ttl is not None:
                    return ttl
        return 0
    
    def is_token_valid(self, token):
        """Check if token is still valid (cached)."""
        cache_keys = self._get_all_cache_keys()
        
        for key in cache_keys:
            if cache.get(key) == token:
                return cache.ttl(key) > 0
        return False