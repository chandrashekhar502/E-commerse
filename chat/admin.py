from django.contrib import admin
from .models import ChatMessage, ChatSession


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'sender', 'message_text_short', 'created_at')
    list_filter = ('sender', 'created_at')
    search_fields = ('message_text',)
    readonly_fields = ('created_at', 'updated_at')
    
    def message_text_short(self, obj):
        return obj.message_text[:50] + '...' if len(obj.message_text) > 50 else obj.message_text
    message_text_short.short_description = 'Message'


@admin.register(ChatSession)
class ChatSessionAdmin(admin.ModelAdmin):
    list_display = ('session_id_short', 'ip_address', 'is_active', 'created_at', 'updated_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('session_id', 'ip_address')
    readonly_fields = ('session_id', 'created_at', 'updated_at')
    
    def session_id_short(self, obj):
        return obj.session_id[:20] + '...' if len(obj.session_id) > 20 else obj.session_id
    session_id_short.short_description = 'Session ID'
