"""
HTTP client utilities for API requests.
"""
import requests
import time
import logging
from typing import Optional, Dict, Any
from requests.exceptions import RequestException, Timeout, ConnectionError

logger = logging.getLogger(__name__)

class HttpClient:
    """HTTP client with retry logic and error handling."""
    
    def __init__(self, base_url: str = '', timeout: int = 30, max_retries: int = 3):
        self.base_url = base_url
        self.timeout = timeout
        self.max_retries = max_retries
        self.session = requests.Session()
        
        # Default headers
        self.session.headers.update({
            'User-Agent': 'HopeForCommunities-Payment-Service/1.0',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    
    def set_auth_token(self, token: str, token_type: str = 'Bearer'):
        """Set authorization token."""
        self.session.headers.update({
            'Authorization': f'{token_type} {token}'
        })
    
    def set_basic_auth(self, username: str, password: str):
        """Set basic authentication."""
        self.session.auth = (username, password)
    
    def add_header(self, key: str, value: str):
        """Add custom header."""
        self.session.headers[key] = value
    
    def remove_header(self, key: str):
        """Remove header."""
        if key in self.session.headers:
            del self.session.headers[key]
    
    def _make_request_with_retry(self, method: str, url: str, **kwargs) -> requests.Response:
        """Make HTTP request with retry logic."""
        retry_count = 0
        last_exception = None
        
        while retry_count <= self.max_retries:
            try:
                response = self.session.request(method, url, timeout=self.timeout, **kwargs)
                response.raise_for_status()
                return response
                
            except (Timeout, ConnectionError) as e:
                retry_count += 1
                last_exception = e
                
                if retry_count <= self.max_retries:
                    wait_time = 2 ** retry_count  # Exponential backoff
                    logger.warning(f"Request failed (attempt {retry_count}/{self.max_retries}): {str(e)}. Retrying in {wait_time}s...")
                    time.sleep(wait_time)
                else:
                    logger.error(f"Max retries exceeded for {method} {url}: {str(e)}")
                    raise
            
            except RequestException as e:
                logger.error(f"Request failed for {method} {url}: {str(e)}")
                raise
        
        raise last_exception or RequestException("Request failed")
    
    def get(self, endpoint: str, params: Optional[Dict] = None, **kwargs) -> Dict:
        """Make GET request."""
        url = self._build_url(endpoint)
        
        try:
            response = self._make_request_with_retry('GET', url, params=params, **kwargs)
            return response.json()
        except Exception as e:
            logger.error(f"GET request failed for {url}: {str(e)}")
            raise
    
    def post(self, endpoint: str, data: Optional[Dict] = None, json: Optional[Dict] = None, **kwargs) -> Dict:
        """Make POST request."""
        url = self._build_url(endpoint)
        
        try:
            response = self._make_request_with_retry('POST', url, data=data, json=json, **kwargs)
            return response.json()
        except Exception as e:
            logger.error(f"POST request failed for {url}: {str(e)}")
            raise
    
    def put(self, endpoint: str, data: Optional[Dict] = None, json: Optional[Dict] = None, **kwargs) -> Dict:
        """Make PUT request."""
        url = self._build_url(endpoint)
        
        try:
            response = self._make_request_with_retry('PUT', url, data=data, json=json, **kwargs)
            return response.json()
        except Exception as e:
            logger.error(f"PUT request failed for {url}: {str(e)}")
            raise
    
    def delete(self, endpoint: str, **kwargs) -> Dict:
        """Make DELETE request."""
        url = self._build_url(endpoint)
        
        try:
            response = self._make_request_with_retry('DELETE', url, **kwargs)
            return response.json()
        except Exception as e:
            logger.error(f"DELETE request failed for {url}: {str(e)}")
            raise
    
    def _build_url(self, endpoint: str) -> str:
        """Build full URL from endpoint."""
        if endpoint.startswith('http://') or endpoint.startswith('https://'):
            return endpoint
        return f"{self.base_url.rstrip('/')}/{endpoint.lstrip('/')}"
    
    def download_file(self, url: str, save_path: str):
        """Download file from URL."""
        try:
            response = self._make_request_with_retry('GET', url, stream=True)
            
            with open(save_path, 'wb') as f:
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
            
            logger.info(f"File downloaded successfully to {save_path}")
            
        except Exception as e:
            logger.error(f"File download failed: {str(e)}")
            raise
    
    def check_status(self, endpoint: str = '') -> bool:
        """Check if service is available."""
        url = self._build_url(endpoint) if endpoint else self.base_url
        
        try:
            response = self.session.get(url, timeout=5)
            return response.status_code == 200
        except Exception:
            return False
    
    def close(self):
        """Close the HTTP session."""
        self.session.close()
    
    def __enter__(self):
        return self
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()