# Advanced Chatbot Configuration Guide

## Table of Contents
1. [Customizing the UI](#customizing-the-ui)
2. [Backend Configuration](#backend-configuration)
3. [Advanced Features](#advanced-features)
4. [Performance Optimization](#performance-optimization)
5. [Security Hardening](#security-hardening)

---

## Customizing the UI

### Change Widget Position

Edit `s_card/static/css/chatbot.css`:

```css
/* Default: Bottom-right */
.chatbot-widget-icon {
    bottom: 30px;
    right: 30px;
}

/* Bottom-left option */
.chatbot-widget-icon {
    bottom: 30px;
    left: 30px;
    right: auto;
}

.chatbot-window {
    bottom: 100px;
    left: 30px;
    right: auto;
}

/* Top-right option */
.chatbot-widget-icon {
    top: 30px;
    bottom: auto;
    right: 30px;
}

.chatbot-window {
    top: 100px;
    bottom: auto;
    right: 30px;
}
```

### Change Color Scheme

Edit CSS variables in `chatbot.css`:

```css
:root {
    --chatbot-primary: #6366f1;           /* Main color */
    --chatbot-secondary: #818cf8;         /* Secondary color */
    --chatbot-dark: #1e293b;              /* Dark text */
    --chatbot-light: #f8fafc;             /* Light background */
    --chatbot-border: #e2e8f0;            /* Border color */
    --chatbot-text: #0f172a;              /* Text color */
    --chatbot-message-user: #6366f1;      /* User message color */
    --chatbot-message-ai: #f1f5f9;        /* AI message background */
}
```

**Popular Color Schemes:**

Green Theme:
```css
--chatbot-primary: #10b981;
--chatbot-secondary: #34d399;
--chatbot-message-user: #10b981;
```

Blue Theme:
```css
--chatbot-primary: #3b82f6;
--chatbot-secondary: #60a5fa;
--chatbot-message-user: #3b82f6;
```

Red Theme:
```css
--chatbot-primary: #ef4444;
--chatbot-secondary: #f87171;
--chatbot-message-user: #ef4444;
```

### Change Widget Icon

Replace the SVG in `s_card/static/js/chatbot.js`:

```javascript
createWidgetHTML() {
    const widgetHTML = `
        <button class="chatbot-widget-icon" id="chatbot-toggle">
            <!-- Replace with your own SVG or emoji -->
            <span style="font-size: 28px;">💬</span>
        </button>
        ...
    `;
}
```

Or use Font Awesome icon:

```javascript
<i class="fa fa-comments"></i>
```

### Customize Initial Message

Edit the empty state in `chatbot.js`:

```javascript
<div class="chatbot-empty-state">
    <div class="chatbot-empty-state-icon">👋</div>
    <div class="chatbot-empty-state-text">
        <strong>Welcome!</strong><br>
        Ask me about our products.
    </div>
</div>
```

### Change Chat Window Size

Edit CSS in `chatbot.css`:

```css
.chatbot-window {
    width: 400px;      /* Default width */
    max-width: 90vw;
    height: 600px;     /* Default height */
    max-height: 90vh;
}

/* Make it wider */
.chatbot-window {
    width: 500px;
    height: 700px;
}
```

---

## Backend Configuration

### Switch Gemini Models

Edit `chat/views.py`:

```python
# Current: Fast and efficient
model = genai.GenerativeModel('gemini-1.5-flash')

# Alternative: More powerful, slower
model = genai.GenerativeModel('gemini-1.5-pro')

# Legacy: Older model
model = genai.GenerativeModel('gemini-pro')
```

### Add System Instructions

Modify the API call in `chat/views.py`:

```python
# Current
response = model.generate_content(user_message)

# With system instruction
system_instruction = """You are a helpful customer service assistant for an e-commerce store. 
Only answer questions about products and services. Be friendly and helpful."""

response = model.generate_content(
    f"{system_instruction}\n\nUser: {user_message}"
)
```

### Adjust Response Parameters

```python
response = model.generate_content(
    user_message,
    generation_config=genai.types.GenerationConfig(
        max_output_tokens=500,           # Limit response length
        temperature=0.7,                 # 0 = deterministic, 1 = creative
        top_p=0.8,                       # Nucleus sampling
        top_k=40,                        # Diversity of output
    )
)
```

### Add Rate Limiting

Create `chat/middleware.py`:

```python
from django.core.cache import cache
from django.http import JsonResponse
from django.utils.decorators import decorator_from_middleware_with_args
from django.utils.decorators import method_decorator

def rate_limit_middleware(request, limit=10, window=60):
    """Rate limit: 10 requests per 60 seconds"""
    client_ip = request.META.get('REMOTE_ADDR')
    cache_key = f"chatbot_rate_{client_ip}"
    
    request_count = cache.get(cache_key, 0)
    
    if request_count >= limit:
        return JsonResponse({
            'success': False,
            'error': 'Too many requests. Please try again later.',
            'response': None
        }, status=429)
    
    cache.set(cache_key, request_count + 1, window)
    return None
```

Then in `views.py`:

```python
from .middleware import rate_limit_middleware

@require_http_methods(["POST"])
def chatbot_endpoint(request):
    # Check rate limit
    rate_check = rate_limit_middleware(request)
    if rate_check:
        return rate_check
    
    # ... rest of code
```

---

## Advanced Features

### 1. Save Chat History to Database

Modify `chat/views.py`:

```python
from .models import ChatMessage

def chatbot_endpoint(request):
    try:
        data = json.loads(request.body)
        user_message = data.get('message', '').strip()
        
        # Save user message
        ChatMessage.objects.create(
            message_text=user_message,
            sender='user'
        )
        
        # ... get AI response ...
        
        # Save AI response
        ChatMessage.objects.create(
            message_text=ai_response,
            sender='ai'
        )
        
        return JsonResponse({...})
    except Exception as e:
        # ...
```

### 2. User Authentication Integration

```python
# In views.py
@require_http_methods(["POST"])
def chatbot_endpoint(request):
    # Check if user is authenticated
    if not request.user.is_authenticated:
        return JsonResponse({
            'success': False,
            'error': 'Please log in to use the chatbot',
            'response': None
        }, status=403)
    
    # ... rest of code
```

### 3. Add Typing Indicator (Already Implemented)

The frontend already includes a typing indicator. You can customize it in CSS:

```css
.chatbot-typing-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #94a3b8;
    animation: typing 1.4s infinite;
}
```

### 4. Add Feedback System

Create `chat/views.py` feedback endpoint:

```python
@require_http_methods(["POST"])
@csrf_exempt
def feedback_endpoint(request):
    try:
        data = json.loads(request.body)
        message_id = data.get('message_id')
        rating = data.get('rating')  # 1-5
        
        # Save feedback (you'd create a Feedback model)
        # ChatFeedback.objects.create(
        #     message_id=message_id,
        #     rating=rating
        # )
        
        return JsonResponse({
            'success': True,
            'message': 'Thank you for your feedback!'
        })
    except Exception as e:
        return JsonResponse({
            'success': False,
            'error': str(e)
        }, status=500)
```

### 5. Export Chat History

Add endpoint in `views.py`:

```python
import csv
from django.http import HttpResponse

@require_http_methods(["GET"])
def export_chat(request):
    """Export chat history as CSV"""
    messages = ChatMessage.objects.all()
    
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename="chat_history.csv"'
    
    writer = csv.writer(response)
    writer.writerow(['Sender', 'Message', 'Date'])
    
    for msg in messages:
        writer.writerow([msg.sender, msg.message_text, msg.created_at])
    
    return response
```

---

## Performance Optimization

### 1. Minify CSS and JavaScript

**Using Django Compressor:**

```bash
pip install django-compressor
```

In `settings.py`:

```python
INSTALLED_APPS = [
    # ...
    'compressor',
]

COMPRESS_ENABLED = True
COMPRESS_OFFLINE = True
```

In base.html:

```html
{% load compress %}
{% compress css %}
<link rel="stylesheet" href="{% static 'css/chatbot.css' %}">
{% endcompress %}

{% compress js %}
<script src="{% static 'js/chatbot.js' %}"></script>
{% endcompress %}
```

### 2. Lazy Load Chatbot Widget

```javascript
// Load chatbot only after page fully loads
window.addEventListener('load', () => {
    const script = document.createElement('script');
    script.src = '{% static "js/chatbot.js" %}';
    script.async = true;
    document.body.appendChild(script);
});
```

### 3. Cache API Responses

In `views.py`:

```python
from django.views.decorators.cache import cache_page

# Cache responses for 1 hour
@cache_page(60 * 60)
@require_http_methods(["POST"])
def chatbot_endpoint(request):
    # ...
```

---

## Security Hardening

### 1. Add CSRF Protection

In `views.py`, remove `@csrf_exempt` and use proper tokens:

```python
from django.middleware.csrf import csrf_protect

@csrf_protect
@require_http_methods(["POST"])
def chatbot_endpoint(request):
    # Include CSRF token in JavaScript
```

In `chatbot.js`:

```javascript
// Get CSRF token from cookie
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

const csrftoken = getCookie('csrftoken');

// Use in fetch
fetch('/api/chatbot/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken,
    },
    body: JSON.stringify({message})
})
```

### 2. Input Sanitization

In `views.py`:

```python
from django.utils.html import escape

user_message = escape(data.get('message', '').strip())
```

### 3. Content Security Policy

In `settings.py`:

```python
SECURE_CONTENT_SECURITY_POLICY = {
    "default-src": ("'self'",),
    "script-src": ("'self'", "'unsafe-inline'", "https://api.github.com"),
    "style-src": ("'self'", "'unsafe-inline'"),
}
```

### 4. HTTPS Only

In `settings.py`:

```python
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
```

### 5. API Key Rotation

Implement automatic key rotation:

```python
# In settings.py
import os
from datetime import timedelta

GEMINI_API_KEY_ROTATION = timedelta(days=90)

# Add logging for key changes
import logging
logger = logging.getLogger(__name__)

def rotate_api_key():
    logger.info("API key rotation needed")
    # Update your key
```

---

## Monitoring & Analytics

### 1. Log All Requests

```python
import logging
from datetime import datetime

logger = logging.getLogger('chatbot')

def chatbot_endpoint(request):
    logger.info(f"[{datetime.now()}] Message received from {request.META.get('REMOTE_ADDR')}")
    logger.info(f"Message: {user_message}")
    logger.info(f"Response: {ai_response}")
```

### 2. Track Usage Metrics

```python
from django.utils import timezone

class ChatAnalytics:
    @staticmethod
    def log_message(user_message, ai_response, response_time):
        ChatMessage.objects.create(
            message_text=user_message,
            sender='user',
            response_time=response_time,
            created_at=timezone.now()
        )
```

### 3. Setup Alerts

Monitor error rates and set up alerts for:
- API errors > 5% of requests
- Response time > 5 seconds
- Rate limit breaches

---

## Testing

### Unit Tests

See `chat/tests.py` for example tests.

Run tests:
```bash
python manage.py test chat
```

### Integration Tests

```python
from django.test import TestCase, Client
import json

class ChatbotIntegrationTest(TestCase):
    def test_full_conversation_flow(self):
        client = Client()
        
        # Send message
        response = client.post(
            '/api/chatbot/',
            data=json.dumps({'message': 'What products do you have?'}),
            content_type='application/json'
        )
        
        self.assertEqual(response.status_code, 200)
        data = json.loads(response.content)
        self.assertTrue(data.get('success'))
        self.assertIsNotNone(data.get('response'))
```

---

## Deployment Checklist

- [ ] API key stored in environment variables
- [ ] `.env` file in `.gitignore`
- [ ] HTTPS enabled
- [ ] CSRF protection enabled
- [ ] Static files collected
- [ ] Rate limiting configured
- [ ] Error logging enabled
- [ ] Monitoring alerts set up
- [ ] Database backups configured
- [ ] API usage monitored

---

This advanced configuration guide should help you optimize and extend the chatbot for production use!
