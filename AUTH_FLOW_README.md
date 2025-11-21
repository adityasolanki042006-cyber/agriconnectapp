# Authentication & Onboarding Flow - AgriConnect

## Overview
This document describes the complete authentication and multi-step onboarding flow implemented for AgriConnect using Lovable Cloud (Supabase).

## Technology Stack
- **Backend**: Lovable Cloud (Supabase)
- **Auth**: Supabase Authentication
- **Database**: PostgreSQL (via Supabase)
- **Frontend**: React + TypeScript + Tailwind CSS

---

## Database Schema

### `users` Table
Stores user profile information after successful registration.

**Columns:**
- `id` (uuid, PRIMARY KEY) - References auth.users.id
- `full_name` (text, NOT NULL) - User's full name
- `email` (text, NOT NULL) - User's email address
- `phone` (text, NOT NULL) - User's phone number
- `user_type` (text, NOT NULL) - Either 'farmer' or 'businessman'
- `created_at` (timestamp, NOT NULL) - Account creation timestamp

**Row Level Security (RLS):**
- Users can view, insert, and update only their own profile
- Profile is automatically created via database trigger when auth user signs up

---

## User Flow

### 1. Registration Flow (New Users)

#### Step 1: User Type Selection (`/usertype`)
- User selects their role: **Farmer** or **Businessman**
- Each option displays a card with icon and description
- Selection is saved in sessionStorage
- User is automatically navigated to `/register`

#### Step 2: Basic Details Form (`/register`)
- User fills out:
  - Full Name
  - Email Address
  - Phone Number
  - Password (min 6 characters)
  - Confirm Password
- Real-time validation for all fields
- Submit button disabled until form is valid
- On successful signup:
  - Supabase Auth user created
  - Profile row inserted in `users` table (via trigger)
  - User automatically logged in
  - Success toast displayed
  - Redirected to homepage `/`

### 2. Sign In Flow (Existing Users)

#### Sign In Page (`/signin`)
- User enters email and password
- Error handling for invalid credentials
- "Forgot Password?" link to reset flow
- "Don't have an account? Register" link to `/usertype`
- On success: redirect to homepage with welcome toast

### 3. Password Reset Flow

#### Forgot Password (`/forgot-password`)
- User enters email address
- Supabase sends password reset email
- Confirmation message displayed
- Link back to sign in page

---

## Protected Routes

Routes wrapped with `<ProtectedRoute>` component:
- `/orders` - View user's orders
- `/checkout` - Complete purchase
- `/dashboard` - User profile dashboard
- `/admin` - Admin panel (additional email check)

**Behavior:**
- Unauthenticated users → Redirected to `/signin`
- Authenticated users trying to access `/signin`, `/register`, `/usertype` → Redirected to `/`

---

## Navigation Behavior

### When NOT Logged In:
- Display "Sign In" button → navigates to `/signin`
- Display "Register" button → navigates to `/usertype`

### When Logged In:
- Display "Dashboard" button → navigates to `/dashboard`
- Display "Admin" button (only for admin@agriconnect.com) → navigates to `/admin`
- Display "Logout" button → signs out and redirects to `/signin`

---

## Key Features

### Authentication Context (`AuthContext`)
- Manages user session state across entire app
- Uses `supabase.auth.onAuthStateChange` for real-time auth updates
- Persists sessions via Supabase (automatic)
- Methods: `signUp`, `signIn`, `signOut`

### User Profile Dashboard (`/dashboard`)
- Displays all user information from `users` table
- Shows: Full Name, Email, Phone, User Type, Member Since
- Quick links to Marketplace and Orders

### Form Validation
- Real-time validation with inline error messages
- Email format validation
- Phone number validation (7-15 digits)
- Password strength requirements (min 6 chars)
- Password confirmation matching

### Error Handling
- Friendly error messages for common issues:
  - "Email already in use"
  - "Invalid email or password"
  - "Password is too weak"
  - Network errors
- Toast notifications for all important actions

### Security Features
- Row Level Security (RLS) on `users` table
- Automatic profile creation via database trigger
- Secure password storage (handled by Supabase)
- Session management with auto-refresh
- Protected routes with authentication checks

---

## File Structure

```
src/
├── pages/
│   ├── UserType.tsx         # Step 1: Role selection
│   ├── Register.tsx         # Step 2: Basic details form
│   ├── SignIn.tsx          # Sign in page
│   ├── ForgotPassword.tsx  # Password reset
│   ├── Dashboard.tsx       # User profile dashboard
│   └── Admin.tsx           # Admin panel (protected)
├── components/
│   ├── Navigation.tsx      # Main navigation with auth state
│   └── ProtectedRoute.tsx  # Route wrapper for auth
├── context/
│   └── AuthContext.tsx     # Authentication context provider
└── integrations/supabase/
    └── client.ts           # Supabase client (auto-generated)
```

---

## Database Trigger

The following trigger automatically creates a user profile when a new auth user signs up:

```sql
CREATE TRIGGER on_auth_user_created_profile
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_profile();
```

This ensures that user data (full_name, phone, user_type) from signup is immediately stored in the `users` table.

---

## Accessing User Data in Lovable Cloud

1. **View Backend**: Click the Cloud tab in Lovable interface
2. **Database**: Navigate to Database → Tables → users
3. **View Records**: See all registered users and their profiles
4. **Auth Users**: Navigate to Users → Authentication to see auth records

---

## Testing the Flow

1. Visit `/usertype` → Select "Farmer" or "Businessman"
2. Fill out registration form with valid data
3. Submit → Account created, auto-login
4. Visit `/dashboard` → View your profile
5. Log out → Click "Logout"
6. Sign in again → Use same credentials at `/signin`
7. Test password reset → Click "Forgot Password?"

---

## Notes

- Email confirmation is **disabled** (auto-confirm enabled in Supabase config)
- Admin access requires email: `admin@agriconnect.com`
- User type affects UI presentation but not permissions (unless customized)
- All styling uses Tailwind CSS with responsive design
- Session persists across browser refreshes

---

## Security Considerations

✅ RLS policies protect user data
✅ Passwords securely hashed by Supabase
✅ Sessions managed server-side
✅ Protected routes block unauthenticated access
✅ Input validation on all forms
✅ HTTPS enforced (production)

---

**Last Updated**: November 2025
**Framework**: Lovable Cloud + React + Supabase
