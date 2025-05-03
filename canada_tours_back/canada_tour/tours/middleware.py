import logging
from datetime import datetime

logger = logging.getLogger('tours')

class LogVisitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Запись в лог данных о посещении все сайта или api
        if request.path == '/' or request.path.startswith('/api'):
            user_ip = request.META.get('REMOTE_ADDR')
            visit_time = datetime.now().strftime('%Y-%m-%d %H:%M:%S') 
            user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')
            referrer = request.META.get('HTTP_REFERER', 'None')

            # Запись информации в лог
            logger.info(f"Visit Time: {visit_time}, IP: {user_ip}, User-Agent: {user_agent}, Referrer: {referrer}, URL: {request.path}")
        
        response = self.get_response(request)
        return response
