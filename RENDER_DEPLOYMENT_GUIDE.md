# Render Deployment Guide for E-commerce Project

## Project Configuration Complete ✅

Your Django e-commerce project has been configured for Render deployment.

## What Was Configured:

### 1. **settings.py Updates**
   - DEBUG mode now controlled by environment variable
   - SECRET_KEY from environment variable
   - ALLOWED_HOSTS set to allow all hosts (Render requirement)
   - Added WhiteNoise middleware for static file serving
   - STATIC_ROOT configured for production
   - Static files storage optimized with WhiteNoise

### 2. **requirements.txt**
   - Added `gunicorn==21.2.0` (WSGI server)
   - Added `whitenoise==6.5.0` (Static file serving)

### 3. **Procfile**
   - Defines web process for Render
   - Uses Gunicorn to serve the application

### 4. **runtime.txt**
   - Specifies Python 3.12.3

### 5. **.gitignore**
   - Excludes sensitive files and cache files
   - Prevents committing db.sqlite3 and .env files

## Deployment Steps on Render:

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up (free tier available)
3. Connect your GitHub account

### Step 2: Create New Web Service
1. Click "New" → "Web Service"
2. Select your repository: `chandrashekhar502/E-commerse`
3. Fill in the details:
   - **Name**: e-commerce-app (or any name)
   - **Region**: Choose closest to you
   - **Branch**: main
   - **Build Command**: `pip install -r requirements.txt && python manage.py collectstatic --noinput`
   - **Start Command**: `gunicorn shoping_cart.wsgi:application --log-file -`
   - **Instance Type**: Free (or your preference)

### Step 3: Set Environment Variables
In Render dashboard, add these environment variables:

| Variable | Value |
|----------|-------|
| `DJANGO_SECRET_KEY` | Generate a secure key |
| `DJANGO_DEBUG` | `False` (for production) |
| `DATABASE_URL` | (if using Render PostgreSQL) |
| `GOOGLE_API_KEY` | (if using Gemini API) |

### Step 4: Database Setup (Optional)
If you want to use PostgreSQL instead of SQLite:
1. In Render, add PostgreSQL addon
2. Install `dj-database-url`: `pip install dj-database-url`
3. Update settings.py to use DATABASE_URL

### Step 5: Deploy!
1. Click "Create Web Service"
2. Render will automatically build and deploy
3. Your app will be live at `https://your-app-name.onrender.com`

## Post-Deployment Tasks:

### Run Migrations
After first deployment, run migrations:
```bash
# In Render shell or as deploy command
python manage.py migrate
```

### Create Superuser
Create admin account for Django admin:
```bash
python manage.py createsuperuser
```

### Collect Static Files
Ensure static files are collected:
```bash
python manage.py collectstatic --noinput
```

## Important Notes:

### Free Tier Limitations:
- Render free tier: 750 hours/month
- App sleeps after 15 minutes of inactivity
- First request may be slow (cold start)

### Database:
- Currently using SQLite (included in free tier)
- For production, consider Render PostgreSQL (free tier available)
- SQLite resets on each deployment with free tier

### Static Files:
- WhiteNoise configured for efficient static file serving
- Files compressed and cached automatically
- No need for separate CDN on free tier

### Environment Variables:
- Keep sensitive data in environment variables
- Never commit `.env` file to GitHub
- Use Render dashboard to manage secrets

## Troubleshooting:

### App Not Starting
- Check logs in Render dashboard
- Verify all environment variables are set
- Ensure requirements.txt includes all dependencies

### Static Files Not Loading
- Verify WhiteNoise is in MIDDLEWARE
- Check STATIC_ROOT is configured
- Run collectstatic command

### Database Errors
- Run migrations after deployment
- Check database connection settings
- Verify DATABASE_URL if using PostgreSQL

## Local Testing Before Deployment:

```bash
# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Collect static files
python manage.py collectstatic

# Test with Gunicorn
gunicorn shoping_cart.wsgi:application
```

## Additional Resources:

- [Render Documentation](https://render.com/docs)
- [Django Deployment Checklist](https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/)
- [WhiteNoise Documentation](http://whitenoise.evans.io/)

## Support:

If you encounter issues during deployment:
1. Check Render logs for error messages
2. Verify all environment variables are set correctly
3. Ensure all dependencies are in requirements.txt
4. Test locally with Gunicorn before deploying

---

**Your project is now ready for Render deployment! 🚀**