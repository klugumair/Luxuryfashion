# Google OAuth Setup Guide for Outlander E-commerce

## 🚀 Quick Setup Instructions

### 1. Google Cloud Console Setup

1. **Go to Google Cloud Console**: https://console.cloud.google.com/
2. **Create or Select Project**:
   - Click "Select a project" → "New Project"
   - Name: "Outlander E-commerce" (or your preferred name)
   - Click "Create"

3. **Enable Google+ API**:
   - Go to "APIs & Services" → "Library"
   - Search for "Google+ API" 
   - Click "Enable"

4. **Create OAuth 2.0 Credentials**:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Name: "Outlander Web App"

5. **Configure Authorized URLs**:
   ```
   Authorized JavaScript origins:
   - http://localhost:3000
   - https://your-domain.com (for production)
   
   Authorized redirect URIs:
   - https://cyavobcqomnfvmfjgwyg.supabase.co/auth/v1/callback
   - http://localhost:54321/auth/v1/callback (for local development)
   ```

6. **Copy Credentials**:
   - Copy the "Client ID" and "Client Secret"
   - Keep these secure!

### 2. Supabase Configuration

1. **Go to Supabase Dashboard**: https://supabase.com/dashboard
2. **Navigate to Authentication**:
   - Go to your project → Authentication → Providers
3. **Configure Google Provider**:
   - Find "Google" in the list
   - Toggle "Enable sign in with Google"
   - Paste your Google Client ID
   - Paste your Google Client Secret
   - Click "Save"

### 3. Update Local Configuration

Update your `supabase/config.toml` file:

```toml
[auth.external.google]
enabled = true
client_id = "your-actual-google-client-id"
secret = "your-actual-google-client-secret"
redirect_uri = "https://cyavobcqomnfvmfjgwyg.supabase.co/auth/v1/callback"
```

### 4. Environment Variables (Optional)

For additional security, you can use environment variables:

```bash
# .env.local
VITE_GOOGLE_CLIENT_ID=your-google-client-id
VITE_GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 🔧 Features Implemented

### ✅ Complete Google OAuth Flow
- **One-click sign-in** with Google accounts
- **Automatic account creation** for new users
- **Seamless sign-in** for existing users
- **Profile picture sync** from Google account
- **Name and email sync** from Google profile

### ✅ Enhanced User Experience
- **Loading states** during authentication
- **Error handling** with user-friendly messages
- **Automatic redirects** after successful authentication
- **Session persistence** across browser sessions
- **Mobile-responsive** authentication flow

### ✅ Security Features
- **PKCE flow** for enhanced security
- **Session management** with automatic refresh
- **Secure token storage** in localStorage
- **CSRF protection** through Supabase
- **Proper error handling** and logging

### ✅ Database Integration
- **Automatic profile creation** in user_profiles table
- **Role assignment** (default: 'user')
- **Avatar URL storage** from Google profile
- **User metadata sync** with database
- **Admin role support** through database

## 🎯 User Flow

### New User (Google Sign-Up)
1. User clicks "Continue with Google"
2. Redirected to Google OAuth consent screen
3. User grants permissions
4. Redirected back to app with auth code
5. App exchanges code for session
6. User profile automatically created in database
7. User assigned default 'user' role
8. Welcome message displayed
9. Redirected to home page

### Existing User (Google Sign-In)
1. User clicks "Continue with Google"
2. Redirected to Google (may auto-approve if previously consented)
3. Redirected back to app
4. Session established
5. User profile updated if needed
6. Welcome back message displayed
7. Redirected to home page

## 🛠️ Technical Implementation

### Authentication State Management
- **Real-time auth state** tracking with Supabase listeners
- **Automatic session refresh** when tokens expire
- **Persistent sessions** across browser restarts
- **Loading states** during auth operations
- **Error boundaries** for auth failures

### Profile Management
- **Automatic profile creation** on first sign-in
- **Profile updates** on subsequent sign-ins
- **Avatar synchronization** from Google
- **Name parsing** (first/last name from full name)
- **Metadata storage** for provider information

### Admin Features
- **Role-based access control** through database
- **Admin panel access** for users with admin role
- **Audit logging** of admin actions
- **User role management** by existing admins

## 🔍 Testing Your Setup

### 1. Test Google OAuth
1. Click "Continue with Google" button
2. Should redirect to Google consent screen
3. Grant permissions
4. Should redirect back and sign you in
5. Check that profile is created in Supabase

### 2. Test Email/Password
1. Try creating account with email/password
2. Try signing in with email/password
3. Test password reset functionality
4. Verify all flows work correctly

### 3. Test Admin Features
1. Sign up with your admin email
2. Run the admin SQL command in Supabase
3. Sign in and verify admin panel access
4. Test product management features

## 🚨 Troubleshooting

### Common Issues

**"Invalid redirect URI"**
- Check that your redirect URI in Google Console matches exactly
- Ensure no trailing slashes or extra characters
- Verify the Supabase project ID is correct

**"OAuth provider not enabled"**
- Verify Google provider is enabled in Supabase dashboard
- Check that client ID and secret are correctly entered
- Ensure no extra spaces in the credentials

**"Session not found"**
- Clear browser localStorage and cookies
- Try in incognito/private browsing mode
- Check browser console for detailed error messages

**"Profile creation failed"**
- Check that database tables exist (run database-setup.sql)
- Verify RLS policies allow profile creation
- Check Supabase logs for detailed errors

### Debug Steps
1. **Check browser console** for detailed error messages
2. **Check Supabase logs** in the dashboard
3. **Verify database setup** by checking tables exist
4. **Test with different browsers** to isolate issues
5. **Check network tab** for failed requests

## 🎉 Success Indicators

When everything is working correctly, you should see:

- ✅ Google sign-in button works without errors
- ✅ Successful redirect to Google OAuth
- ✅ Successful redirect back to your app
- ✅ User profile appears in header
- ✅ User data saved in Supabase database
- ✅ Toast notifications for auth events
- ✅ Smooth navigation after authentication

## 📞 Support

If you encounter issues:

1. **Check this guide** for common solutions
2. **Review browser console** for error details
3. **Check Supabase dashboard** for auth logs
4. **Verify Google Cloud Console** configuration
5. **Test with different accounts** to isolate issues

Your Google OAuth integration is now complete and ready for production use! 🎊