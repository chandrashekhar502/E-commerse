from django.db import models


class ChatMessage(models.Model):
    """
    Optional model to store chat messages in the database.
    Currently not used (messages stored in localStorage on frontend).
    Can be enabled for features like:
    - User account integration
    - Analytics and chat history
    - Admin dashboard for viewing conversations
    """
    
    message_text = models.TextField(max_length=5000)
    sender = models.CharField(
        max_length=10,
        choices=[('user', 'User'), ('ai', 'AI')],
        default='user'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Chat Message'
        verbose_name_plural = 'Chat Messages'
    
    def __str__(self):
        return f"{self.get_sender_display()} - {self.created_at}"


class ChatSession(models.Model):
    """
    Optional model to track chat sessions.
    Can be extended with user information for logged-in users.
    """
    
    session_id = models.CharField(max_length=255, unique=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Chat Session'
        verbose_name_plural = 'Chat Sessions'
    
    def __str__(self):
        return f"Session {self.session_id[:10]}... - {self.created_at}"
