
"use client";

import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

const roles = ["Citizen", "Admin", "Head"] as const;

type Role = (typeof roles)[number];

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("Citizen");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const signup = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      return alert("Please complete all fields.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    setLoading(true);

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        fullName,
        email,
        role: role.toLowerCase(),
      });

      router.push("/login");
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login instead.");
      } else {
        alert("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-3xl rounded-[32px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.1)]">
        <div className="px-8 py-8 sm:px-14 sm:py-10">
          <div className="mb-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
            >
              <span>←</span>
              Back
            </Link>
          </div>

          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-lg shadow-blue-200/40">
            <span className="text-2xl">🛠</span>
          </div>

          <div className="text-center">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-slate-500">Create an Account</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900">Sign up to report issues and help your community.</h1>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-2 rounded-3xl bg-slate-100 p-1 text-center text-sm font-medium text-slate-600">
            {roles.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRole(item)}
                className={`rounded-3xl py-3 transition-all duration-200 ${
                  role === item
                    ? "bg-white text-slate-900 shadow-sm"
                    : "bg-transparent hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Full Name</span>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="h-14 w-full rounded-3xl border border-slate-300 bg-slate-100 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Official Email</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter official email"
                className="h-14 w-full rounded-3xl border border-slate-300 bg-slate-100 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Password</span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a strong password"
                className="h-14 w-full rounded-3xl border border-slate-300 bg-slate-100 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-700">Confirm Password</span>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="h-14 w-full rounded-3xl border border-slate-300 bg-slate-100 px-4 text-sm text-slate-800 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </label>
          </div>

          <button
            type="button"
            onClick={signup}
            disabled={loading}
            className="mt-8 flex h-14 w-full items-center justify-center rounded-3xl bg-blue-600 text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-blue-600 hover:text-blue-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </main>


'use client';

import { SignupForm } from '@/components/signup-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { CivicSolveLogo } from '@/components/icons';
import type { UserRole } from '@/lib/types';
import { useState } from 'react';

export default function SignupPage() {
  const [role, setRole] = useState<UserRole>('Citizen');

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="text-center">
           <div className="flex justify-center items-center gap-2 mb-4">
            <CivicSolveLogo className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-3xl font-headline">Create an Account</CardTitle>
          <CardDescription>
            {role === 'Citizen' 
                ? 'Sign up to report issues and help your community.'
                : 'Create a new staff account for your designated role.'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="Citizen" className="w-full" onValueChange={(value) => setRole(value as UserRole)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="Citizen">Citizen</TabsTrigger>
              <TabsTrigger value="Admin">Admin</TabsTrigger>
              <TabsTrigger value="Head">Head</TabsTrigger>
            </TabsList>
            <TabsContent value="Citizen">
              <SignupForm role="Citizen" />
            </TabsContent>
            <TabsContent value="Admin">
               <SignupForm role="Admin" />
            </TabsContent>
            <TabsContent value="Head">
                <SignupForm role="Head" />
            </TabsContent>
          </Tabs>
           <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/" className="underline">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
