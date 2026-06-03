
"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/authContext";
import { db, storage } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
  setDoc,
  increment,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

import { CheckCircle, Trophy, ArrowRight, X } from "lucide-react";

const EMERGENCY_TYPES = [
  "Emergency Report",
  "Pothole",
  "Broken Streetlight",
  "Garbage",
  "Water Leak",
  "Noise Complaint",
  "Other",
];

export default function ReportPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [type, setType] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const [submitted, setSubmitted] = useState(false);
  const [pointsEarned, setPointsEarned] = useState(0);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (f: File | null) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const removeImage = () => {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage(null);

      if (authLoading) return;
      if (!user?.uid) return setMessage("Login required");
      if (!type) return setMessage("Select issue type");

      let imageUrl = null;

      // ✅ IMAGE UPLOAD FIXED
      if (file) {
        const path = `reports/${Date.now()}_${file.name}`;
        const ref = storageRef(storage, path);
        await uploadBytes(ref, file);
        imageUrl = await getDownloadURL(ref);
      }

      // ✅ SAVE REPORT
      await addDoc(collection(db, "reports"), {
        type,
        description,
        imageUrl,
        userId: user.uid,
        email: user.email, // IMPORTANT for your requirement
        createdAt: serverTimestamp(),
        status: "open",
      });

      // ✅ POINT SYSTEM
      const isEmergency =
        type === "Emergency Report" ||
        type === "Water Leak" ||
        type === "Pothole" ||
        type === "Broken Streetlight";

      const points = isEmergency ? 15 : 5;

      const userRef = doc(db, "users", user.uid);
      const snap = await getDoc(userRef);

      if (!snap.exists()) {
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous",
          points,
          reports: 1,
        });
      } else {
        await setDoc(
          userRef,
          {
            points: increment(points),
            reports: increment(1),
          },
          { merge: true }
        );
      }

      setPointsEarned(points);
      setSubmitted(true);

      setTimeout(() => router.push("/leaderboard"), 1200);
    } catch (err) {
      console.error(err);
      setMessage("Error submitting report");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href="/citizen"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
          >
            <span>←</span>
            Back
          </Link>
        </div>

        {submitted ? (
          <div className="border rounded-lg bg-white p-8 text-center">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold">Issue Submitted!</h1>

            <div className="bg-blue-50 p-6 rounded-lg mt-6">
              <Trophy className="w-6 h-6 mx-auto text-yellow-500 mb-2" />
              <p className="text-2xl font-bold text-blue-600">
                +{pointsEarned} Points
              </p>
            </div>

            <Link
              href="/leaderboard"
              className="inline-flex mt-6 bg-blue-600 text-white px-6 py-3 rounded"
            >
              Go to Leaderboard
            </Link>
          </div>
        ) : (
          <div className="bg-white border rounded-lg p-6">

            <h1 className="text-2xl font-bold text-blue-600">
              Report an Issue
            </h1>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">

              {/* IMAGE UI FIXED (YOUR STYLE IMPROVED) */}
              <div className="border-2 border-dashed rounded-lg p-4 text-center relative">

                {preview ? (
                  <div className="relative">
                    <img
                      src={preview}
                      className="max-h-60 mx-auto rounded"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <p className="text-slate-400">Upload image (optional)</p>
                )}

                <input
                  ref={fileRef}
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) =>
                    handleFile(e.target.files?.[0] || null)
                  }
                />

                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="mt-3 px-4 py-2 bg-slate-100 rounded"
                >
                  Choose Image
                </button>
              </div>

              {/* TYPE */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Issue Type</option>
                {EMERGENCY_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              {/* DESCRIPTION */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border p-2 rounded"
                rows={4}
              />

              {message && (
                <p className="text-red-500 text-sm">{message}</p>
              )}

              <button
                disabled={loading || authLoading}
                className="w-full bg-blue-600 text-white py-3 rounded"
              >
                {loading ? "Submitting..." : "Submit Report"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}


'use client'

import { ReportIssueForm } from '@/components/report-issue-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import type { IssueCategory } from '@/lib/types';

const standardCategories: IssueCategory[] = [
    'Garbage & Waste Management Problems',
    'Water Supply Quality',
    'Drainage Issues',
    'Roads, Footpaths & Infrastructure Damage',
    'Streetlights & Electricity Failures',
    'Parks, Trees & Environmental Concerns',
    'Illegal Constructions & Encroachments',
    'Stray Animals & Public Health Hazards',
    'Sanitation & Toiletry Issues',
    'Mosquito Control & Fogging',
];

function ReportPageContent() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const category = searchParams.get('category') as IssueCategory | null;

    useEffect(() => {
        if (!loading && !user) {
            router.push('/');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }


  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-headline">Report a New Issue</CardTitle>
          <CardDescription>
            Help improve your community by reporting issues. Please provide a clear
            photo and description.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReportIssueForm 
            user={user} 
            allowedCategories={standardCategories}
            initialCategory={category}
          />
        </CardContent>
      </Card>
    </div>
  );
}


export default function ReportPage() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
        <ReportPageContent />
    </Suspense>
  )
}
