from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(req):
    return render(req, 'base.html')
def shop(req):
    return render(req, 'shop.html')

def blog(req):
    return render(req, 'blog.html')

def about(req):
    return render(req, 'about.html')

def contact(req):
    return render(req, 'contact.html')

def cart(req):
    return render(req, 'cart.html')

def sproduct(req):
    return render(req, 'sproduct.html')

def sproduct1(req):
    return render(req, 'sproduct1.html')