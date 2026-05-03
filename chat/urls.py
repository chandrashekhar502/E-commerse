from django.urls import path
from . import views

app_name = 'chat'

urlpatterns = [
    path('api/chatbot/', views.chatbot_endpoint, name='chatbot_endpoint'),
]
