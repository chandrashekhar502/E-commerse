from django.test import TestCase
from django.test.client import Client
import json


class ChatbotApiTestCase(TestCase):
    """Test cases for the chatbot API endpoint"""
    
    def setUp(self):
        self.client = Client()
        self.endpoint = '/api/chatbot/'
    
    def test_chatbot_endpoint_exists(self):
        """Test that the chatbot endpoint is accessible"""
        response = self.client.post(
            self.endpoint,
            data=json.dumps({'message': 'Test message'}),
            content_type='application/json'
        )
        # Should return 200 or 400+ (not 404)
        self.assertNotEqual(response.status_code, 404)
    
    def test_empty_message_rejected(self):
        """Test that empty messages are rejected"""
        response = self.client.post(
            self.endpoint,
            data=json.dumps({'message': ''}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertFalse(data.get('success'))
    
    def test_message_too_long_rejected(self):
        """Test that messages exceeding 5000 characters are rejected"""
        long_message = 'a' * 5001
        response = self.client.post(
            self.endpoint,
            data=json.dumps({'message': long_message}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertFalse(data.get('success'))
    
    def test_invalid_json_rejected(self):
        """Test that invalid JSON is rejected"""
        response = self.client.post(
            self.endpoint,
            data='not valid json',
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 400)
        data = json.loads(response.content)
        self.assertFalse(data.get('success'))
