# CivicSolve - Citizen Features

## Overview
This document describes the features implemented for the citizen-facing part of the CivicSolve application.

## Features Implemented

### 1. Report Page (`/report`)
- **Purpose**: Allow citizens to report civic issues
- **Features**:
  - Upload issue photo (from file or camera)
  - Select emergency type from predefined categories
  - Add detailed description
  - Image storage in Firebase Storage
  - Document storage in Firestore `reports` collection
  - Auto-timestamp and status tracking

### 2. Leaderboard Page (`/leaderboard`)
- **Purpose**: Gamify civic participation with a points system
- **Features**:
  - Real-time user rankings based on points
  - Display user coins/points earned
  - Show number of reports submitted per user
  - Point earning rules breakdown:
    - 5 pts per base report
    - 10 pts for emergency reports
    - 20 pts for resolved issues
  - User profile cards with avatars and badges

### 3. Citizen Dashboard (`/citizen`)
- **Purpose**: Central hub for citizen activities
- **Features**:
  - Navigation sidebar with all key pages
  - Issue category explorer (11 predefined categories)
  - Quick stats (submitted reports, in progress, resolved)
  - Logged-in user information in footer
  - Dark sidebar with light main content

### 4. Authentication System
- **Firebase Authentication Integration**
  - `useAuth()` hook for accessing current user
  - Real-time auth state management
  - User info displayed throughout the app
  - Automatic fallback to "John Citizen" for demo purposes

## File Structure

```
src/
├── app/
│   ├── layout.tsx                 # Root layout with AuthProvider
│   ├── citizen/page.tsx           # Citizen dashboard
│   ├── report/page.tsx            # Report issue page
│   ├── leaderboard/page.tsx       # Leaderboard & rewards
│   └── globals.css                # Global styles
├── lib/
│   ├── firebase.ts                # Firebase config & exports
│   ├── authContext.tsx            # Auth provider & hook
│   ├── seedData.ts                # Sample data for testing
│   └── utils.ts                   # Utility functions
```

## Setup & Running

### Prerequisites
- Node.js 18+
- Firebase project configured
- Environment variables set

### Installation
```bash
cd "c:\Users\Admin\Desktop\projects\gssoc proj\Civic_Issue_App"
npm install
```

### Development
```bash
npm run dev
# App runs on http://localhost:9003
```

### Type Checking
```bash
npm run typecheck
```

### Build
```bash
npm run build
npm run start
```

## Firebase Setup

### Collections Required
1. **reports** - Issue reports submitted by users
   - Fields: `type`, `description`, `imageUrl`, `createdAt`, `status`

2. **users** - User profiles and leaderboard data
   - Fields: `displayName`, `email`, `points`, `reports`, `badges`, `createdAt`

### Storage Setup
- Bucket: `civic-issue-app-631cc.firebasestorage.app`
- Path: `reports/{timestamp}_{filename}`

## Authentication Flow

1. User signs up/logs in via Firebase Auth
2. `AuthProvider` wraps the app and listens for auth state changes
3. `useAuth()` hook provides `user` object and `loading` state
4. User info displayed in sidebar and leaderboard

## Testing with Sample Data

To populate the leaderboard with test data:

```javascript
import { seedSampleUsers } from "@/lib/seedData";

// Call during component mount or on a button click
await seedSampleUsers();
```

This will create 9 sample users if the database is empty.

## Future Enhancements
- Real-time leaderboard updates with Firestore listeners
- User profile pages with detailed stats
- Badge system and achievements
- Filtering and sorting on leaderboard
- Share reports on social media
- Email notifications for report updates
- Admin dashboard for tracking
