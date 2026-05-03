from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.db.models import Q
from django.http import HttpResponse
from s_card.models import Student

# AUTH
def login_view(request):
    if request.method == "POST":
        username = request.POST.get("name")
        password = request.POST.get("password")
        user = authenticate(request, username=username, password=password)
        if user:
            login(request, user)
            return redirect('home')
        return HttpResponse("Invalid credentials!")
    return render(request, "login.html")

def signup(request):
    if request.method == "POST":
        username = request.POST.get("name")
        email = request.POST.get("email")
        password = request.POST.get("password")
        if User.objects.filter(username=username).exists():
            return HttpResponse("Username exists!")
        user = User.objects.create_user(username=username, email=email, password=password)
        user.save()
        return redirect('login')
    return render(request, "signup.html")

def logout_view(request):
    logout(request)
    return redirect('login')

# DASHBOARD
@login_required(login_url='login')
def home(request):
    search_query = request.GET.get('search', '')
    students = Student.objects.filter(
        Q(fname__icontains=search_query) | Q(lname__icontains=search_query)
    ) if search_query else Student.objects.all()
    return render(request, "base.html", {'students': students, 'search_query': search_query})

# CRUD
@login_required
def registration(request):
    if request.method == "POST":
        Student.objects.create(fname=request.POST.get('fname'), lname=request.POST.get('lname'), email=request.POST.get('email'), address=request.POST.get('address'))
        return redirect('home')
    return render(request, "registration.html")

@login_required
def show(request, id): return render(request, "show.html", {'student': get_object_or_404(Student, id=id)})
@login_required
def update(request, id):
    student = get_object_or_404(Student, id=id)
    if request.method == "POST":
        student.fname = request.POST.get('fname'); student.lname = request.POST.get('lname')
        student.email = request.POST.get('email'); student.address = request.POST.get('address')
        student.save()
        return redirect('home')
    return render(request, "update.html", {'student': student})
@login_required
def delete(request, id):
    get_object_or_404(Student, id=id).delete()
    return redirect('home')

# E-COMMERCE (यहाँ से सभी missing functions जोड़े गए हैं)
@login_required
def shop(request): return render(request, "shop.html")
@login_required
def blog(request): return render(request, "blog.html")
@login_required
def about(request): return render(request, "about.html")
@login_required
def contact(request): return render(request, "contact.html")
@login_required
def cart(request): return render(request, "cart.html")
@login_required
def sproduct(request): return render(request, "sproduct.html")
@login_required
def sproduct1(request): return render(request, "sproduct1.html")
@login_required
def service(request): return render(request, "service.html")
@login_required
def aboutus(request): return render(request, "aboutus.html")
@login_required
def contactus(request): return render(request, "contactus.html")