# Contributing to CivicSolve

Thank you for your interest in contributing! This document will help you get the project running locally and understand the current state of the codebase.

---

## Project Status

> ⚠️ **This project is actively under development.** Core route implementations (`/citizen`, `/admin`, `/head`, `/worker`) are not yet present in the repository. Contributors are welcome to help build them out — please check the [open issues](https://github.com/ShaluPandey-12/Civic_Issue_App/issues) before starting work to avoid duplication.

---

## Current Source Structure

```
src/
├── ai/
│   └── dev.ts              # Genkit AI development entry point
├── app/
│   ├── globals.css         # Global Tailwind styles
│   ├── layout.tsx          # Root Next.js layout
│   └── page.tsx            # Landing page (entry point)
└── lib/
    ├── firebase.ts         # Firebase app initialization
    └── utils.ts            # Shared utility functions
```

Planned but not yet implemented:
- `src/app/citizen/` — Citizen dashboard & issue reporting
- `src/app/admin/` — Admin command center
- `src/app/head/` — Department head analytics
- `src/app/worker/` — Field worker task list
- `src/components/` — Shared UI components (ShadCN)
- `src/ai/flows/` — Genkit AI flows (duplicate detection, image clarity, chatbot)

---

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm or yarn
- A Firebase project (free tier works)
- A Google AI Studio API key (for Genkit/Gemini features)

---

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/ShaluPandey-12/Civic_Issue_App.git
cd Civic_Issue_App
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in the values:

```dotenv
# Firebase Configuration
# Get these from your Firebase project settings → General → Your apps → SDK setup
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google AI (Genkit)
# Get this from https://aistudio.google.com/app/apikey
GOOGLE_GENAI_API_KEY=your_genai_key_here
```

> **Never commit `.env.local` to the repository.** It is already listed in `.gitignore`.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/) and create a new project.
2. Enable **Authentication** → Sign-in method → Email/Password and Phone.
3. Create a **Firestore Database** in test mode to get started.
4. Enable **Cloud Storage** for image uploads.
5. Copy the Firebase config values from **Project Settings → General → Your apps** into `.env.local`.

---

## Contributing Guidelines

- **Check open issues first** before starting any feature or fix.
- **One PR per issue** — keep changes focused and reviewable.
- **Branch naming:** `feature/your-feature-name` or `fix/issue-description`
- **Commit messages:** Use clear, present-tense messages (e.g. `Add citizen dashboard layout`)
- **Do not commit** `.env.local`, `node_modules/`, or build artifacts.

---

## Reporting Issues

Found a bug or missing feature? [Open an issue](https://github.com/ShaluPandey-12/Civic_Issue_App/issues/new) with:
- A clear description of the problem
- Steps to reproduce (if applicable)
- Expected vs actual behavior
