import json
import os
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Configure Google Gemini API
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

if not GEMINI_API_KEY:
    raise ValueError(
        "GEMINI_API_KEY environment variable not set. "
        "Please add it to your .env file."
    )

genai.configure(api_key=GEMINI_API_KEY)


@require_http_methods(["POST"])
@csrf_exempt
def chatbot_endpoint(request):
    """
    Handle chatbot messages and return AI-generated responses using Google Gemini API.
    
    Expected POST body:
    {
        "message": "User's question or message"
    }
    
    Returns:
    {
        "success": true/false,
        "response": "AI-generated response",
        "error": "Error message if applicable"
    }
    """
    try:
        # Parse incoming JSON request
        data = json.loads(request.body)
        user_message = data.get('message', '').strip()
        
        # Validate user message
        if not user_message:
            return JsonResponse({
                'success': False,
                'error': 'Message cannot be empty',
                'response': None
            }, status=400)
        
        # Limit message length for API and cost control
        if len(user_message) > 5000:
            return JsonResponse({
                'success': False,
                'error': 'Message is too long. Please keep it under 5000 characters.',
                'response': None
            }, status=400)
        
        # Create Gemini model instance with system prompt
        system_prompt = """You are CARA AI, an intelligent shopping assistant for an e-commerce website. 
Your role is to help customers with:
- Product information and recommendations
- Shopping assistance and cart help
- Order tracking and delivery information
- Customer support and general inquiries
- Store policies and procedures

Always be friendly, professional, and helpful. Provide accurate information about products and services.
If you don't know something about the store, politely let the customer know and suggest they contact customer support."""
        
        model = genai.GenerativeModel(
            'gemini-2.5-flash',
            system_instruction=system_prompt
        )
        response = model.generate_content(user_message)
        
        # Extract generated text
        ai_response = response.text if response.text else "I couldn't generate a response. Please try again."
        
        return JsonResponse({
            'success': True,
            'response': ai_response,
            'error': None
        }, status=200)
    
    except json.JSONDecodeError:
        return JsonResponse({
            'success': False,
            'error': 'Invalid JSON format in request',
            'response': None
        }, status=400)
    
    except Exception as e:
        # Log the error for debugging
        print(f"Chatbot Error: {str(e)}")
        
        return JsonResponse({
            'success': False,
            'error': 'An error occurred while processing your request. Please try again.',
            'response': None
        }, status=500)
