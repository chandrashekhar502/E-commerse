from django.contrib import admin
from django.urls import path
from s_card import views
from . import views
urlpatterns = [
    path('admin/',admin.site.urls),
    path('', views.home, name='home'),
    path('shop/', views.shop, name='shop'),
    path('blog/', views.blog, name= 'blog'),
    path('about/', views.about, name= 'about'),
    path('contact/', views.contact, name= 'contact'),
    path('cart/', views.cart, name= 'cart'),
    path('sproduct/', views.sproduct, name= 'sproduct'),
     path('sproduct1/', views.sproduct, name= 'sproduct'),
]
