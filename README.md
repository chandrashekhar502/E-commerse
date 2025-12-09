# 🛍️ E-Commerce Shopping Cart Application

> A modern, feature-rich e-commerce platform built with Django. Explore products, manage your shopping cart, and enjoy a seamless shopping experience.

<div align="center">

[![Django](https://img.shields.io/badge/Django-5.2.8-darkgreen?style=flat-square&logo=django)](https://www.djangoproject.com/)
[![Python](https://img.shields.io/badge/Python-3.x-blue?style=flat-square&logo=python)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()

[View Demo](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Contributing](#-contributing)

</div>

---

## ✨ Features

🎯 **Core Functionality**
- 🏪 **Shop Page** - Browse through our extensive product catalog
- 🛒 **Shopping Cart** - Add/remove items with real-time cart management
- 📦 **Product Details** - Detailed product information and specifications
- 💳 **Checkout Experience** - Smooth and intuitive checkout process

📱 **User Experience**
- 🎨 **Responsive Design** - Beautiful UI that works on all devices
- ⚡ **Fast Navigation** - Quick access to different sections
- 📖 **Blog** - Latest news and product information
- 💬 **Contact Page** - Easy communication channel with customers
- 📋 **About Us** - Learn more about our brand and mission

🔧 **Technical Features**
- ✅ Clean and modular code architecture
- 📊 SQLite database for data persistence
- 🎯 Django ORM for efficient database operations
- 🖼️ Static files management (CSS, JavaScript, Images)
- 📱 Mobile-responsive templates

---

## 📸 Project Structure

```
E-commerce/
├── manage.py                 # Django management script
├── db.sqlite3               # SQLite database
├── s_card/                  # Main application
│   ├── models.py            # Database models
│   ├── views.py             # View logic
│   ├── urls.py              # URL routing
│   ├── admin.py             # Admin configuration
│   ├── static/              # Static files
│   │   ├── css/
│   │   │   └── style.css    # Main stylesheet
│   │   ├── img/             # Image assets
│   │   │   ├── about/
│   │   │   ├── banner/
│   │   │   ├── blog/
│   │   │   ├── features/
│   │   │   ├── products/
│   │   │   ├── people/
│   │   │   └── pay/
│   │   └── script.js        # JavaScript functionality
│   ├── templates/           # HTML templates
│   │   ├── base.html        # Base template
│   │   ├── header.html      # Header component
│   │   ├── footer.html      # Footer component
│   │   ├── shop.html        # Shop page
│   │   ├── cart.html        # Shopping cart
│   │   ├── sproduct.html    # Single product view
│   │   ├── sproduct1.html   # Alternative product view
│   │   ├── about.html       # About page
│   │   ├── blog.html        # Blog page
│   │   └── contact.html     # Contact page
│   ├── migrations/          # Database migrations
│   └── tests.py             # Unit tests
└── shoping_cart/            # Project configuration
    ├── settings.py          # Django settings
    ├── urls.py              # Main URL configuration
    ├── wsgi.py              # WSGI configuration
    └── asgi.py              # ASGI configuration
```

---

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- pip package manager
- Git

### Step 1: Clone the Repository
```bash
git clone https://github.com/chandrashekhar502/E-commerse.git
cd E-commerce
```

### Step 2: Create Virtual Environment
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate
```

### Step 3: Install Dependencies
```bash
pip install django
```

### Step 4: Run Migrations
```bash
python manage.py migrate
```

### Step 5: Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### Step 6: Collect Static Files
```bash
python manage.py collectstatic
```

### Step 7: Start Development Server
```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` in your browser to see the application.

---

## 💻 Usage

### Home Page
Navigate to the home page to see featured products and site highlights.

### Shopping
1. Click on **Shop** to browse all products
2. Click on any product to view detailed information
3. Add items to your cart from the product page

### Cart Management
- Navigate to **Cart** to review items
- Adjust quantities or remove items
- Proceed to checkout

### Explore Content
- **Blog** - Read latest articles and news
- **About** - Learn about the company
- **Contact** - Get in touch with support

### Admin Panel
Access the Django admin panel at `/admin` with superuser credentials to manage:
- Products and inventory
- Orders and cart data
- User accounts
- Site content

---

## 🎨 Customization

### Styling
Edit `s_card/static/css/style.css` to customize the appearance.

### Templates
Modify HTML templates in `s_card/templates/` to change page layouts and content.

### Static Assets
Add images and resources to `s_card/static/img/` directory.

### JavaScript
Update `s_card/static/script.js` to add interactive features.

---

## 🔐 Security Notes

⚠️ **Important**: This is a development project. Before deploying to production:

1. Change `SECRET_KEY` in `settings.py`
2. Set `DEBUG = False`
3. Configure proper `ALLOWED_HOSTS`
4. Use environment variables for sensitive data
5. Set up HTTPS
6. Implement proper authentication
7. Use a production-grade database (PostgreSQL, MySQL)
8. Configure CSRF and security middlewares

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| **Django** | Web Framework |
| **Python** | Backend Language |
| **SQLite** | Database |
| **HTML5** | Markup |
| **CSS3** | Styling |
| **JavaScript** | Client-side Interactivity |

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📧 Contact & Support

**Author:** Chandrashekhar Kumar  
**Email:** chandrashekhar.kumar.cs.2022@mitmeerut.ac.in  
**GitHub:** [@chandrashekhar502](https://github.com/chandrashekhar502)

For support, open an issue in the repository or contact via email.

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🎓 Learning Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [Python Official Documentation](https://docs.python.org/3/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [Mozilla Web Docs](https://developer.mozilla.org/)

---

## 🚀 Future Enhancements

- [ ] User authentication and profiles
- [ ] Payment gateway integration
- [ ] Order history tracking
- [ ] Product reviews and ratings
- [ ] Search and filtering functionality
- [ ] Email notifications
- [ ] Inventory management
- [ ] Analytics dashboard
- [ ] Mobile app version
- [ ] API endpoints (REST/GraphQL)

---

## 📊 Project Statistics

- **Total Files**: 95+
- **Database**: SQLite
- **Framework**: Django 5.2.8
- **Lines of Code**: 3,986+
- **Static Assets**: 50+ images
- **Templates**: 10 HTML files

---

<div align="center">

### Show Your Support ⭐

If you find this project helpful, please give it a star! Your support means the world to us.

**Happy Shopping! 🛍️**

---

*Last Updated: December 2025*

</div>
