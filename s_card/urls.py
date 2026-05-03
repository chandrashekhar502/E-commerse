from django.urls import path

from s_card import admin
from . import views

# app_name = 's_card'  

urlpatterns = [
    # AUTH (Public)
    path('', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),
    path('logout/', views.logout_view, name='logout'),
       
    
    # DASHBOARD
    path('home/', views.home, name='home'),
    
    # CRUD
    path('register/', views.registration, name='registration'),
    path('student/<int:id>/', views.show, name='show'),
    path('student/<int:id>/edit/', views.update, name='update'),
    path('student/<int:id>/delete/', views.delete, name='delete'),
    
    # E-COMMERCE
    path('shop/', views.shop, name='shop'),
    path('cart/', views.cart, name='cart'),
    path('blog/', views.blog, name='blog'),
    path('about/', views.about, name='about'),
    path('contact/', views.contact, name='contact'),
    path('sproduct/', views.sproduct, name='sproduct'),
    path('sproduct1/', views.sproduct1, name='sproduct1'),
    
    # OTHER
    path('service/', views.service, name='service'),
    path('aboutus/', views.aboutus, name='aboutus'),
    path('contactus/', views.contactus, name='contactus'),
]