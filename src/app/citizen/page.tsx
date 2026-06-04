"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ArrowRight, Briefcase, Droplet, Eye, Flag, Hash, Home, MapPin, ShieldAlert, Sparkles, Trash2, Wind } from "lucide-react";

const issueCategories = [
  { label: "Emergency Report", subtitle: "For critical, urgent issues.", icon: ShieldAlert },
  { label: "Garbage", subtitle: "Overflowing bins, illegal dumping.", icon: Trash2 },
  { label: "Water Supply Quality", subtitle: "Contamination, low pressure.", icon: Droplet },
  { label: "Drainage Issues", subtitle: "Blocked drains, overflowing sewers.", icon: MapPin },
  { label: "Roads & Footpaths", subtitle: "Potholes, broken sidewalks.", icon: Flag },
  { label: "Streetlights", subtitle: "Outages, flickering lights.", icon: Sparkles },
  { label: "Parks & Trees", subtitle: "Fallen trees, park maintenance.", icon: Home },
  { label: "Illegal Constructions", subtitle: "Unauthorized buildings.", icon: Briefcase },
  { label: "Stray Animals", subtitle: "Stray dogs, animal control.", icon: Eye },
  { label: "Sanitation", subtitle: "Public toilet cleanliness.", icon: Wind },
  { label: "Mosquito Control", subtitle: "Fogging requests, stagnant water.", icon: Hash },
];

export default function CitizenPage() {
  const { user, loading } = useAuth();
  const [userPoints, setUserPoints] = useState(0);
  const [userReports, setUserReports] = useState(0);

  useEffect(() => {
    const fetchUserStats = async () => {
      if (!user?.uid) return;
      try {
        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);
        if (userSnapshot.exists()) {
          const data = userSnapshot.data();
          setUserPoints(data.points || 0);
          setUserReports(data.reports || 0);
        }
      } catch (err) {
        console.error("Error fetching user stats:", err);
      }
    };

    fetchUserStats();
  }, [user]);

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
          >
            <span>←</span>
            Back
          </Link>
        </div>

        <div className="grid gap-8 xl:grid-cols-[280px_1fr]">
          <aside className="rounded-[32px] border border-slate-200 bg-slate-900 p-6 text-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-blue-500 text-white">
                <ArrowRight className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm tracking-[0.2em] text-slate-300">CivicSolve</p>
                <h2 className="text-xl font-semibold">Citizen Dashboard</h2>
              </div>
            </div>

            <nav className="space-y-2 text-sm text-slate-300">
              <Link href="/citizen" className="block rounded-3xl bg-slate-800 px-4 py-3 text-white shadow-sm">
                Dashboard
              </Link>
              <Link href="/leaderboard" className="block rounded-3xl px-4 py-3 hover:bg-slate-800 transition">
                Leaderboard & Rewards
              </Link>
            </nav>

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-950 p-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                  {loading ? "..." : (user?.displayName?.charAt(0) || user?.email?.charAt(0) || "U").toUpperCase()}
                </div>
                <div>
                  <p className="text-sm text-slate-300">{loading ? "Loading..." : user?.displayName || "Citizen"}</p>
                  <p className="text-xs text-slate-500">{user?.email || "citizen@test.com"}</p>
                </div>
              </div>
            </div>
          </aside>

          <section>
            <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Citizen Dashboard</p>
                  <h1 className="mt-3 text-3xl font-semibold text-slate-900">Track your reports and see community issues.</h1>
                </div>
                <Link href="/report" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow transition hover:bg-blue-700">
                  Report a New Issue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {issueCategories.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.label}
                      href={`/report?type=${encodeURIComponent(item.label)}`}
                      className={`group rounded-[30px] border p-6 transition hover:-translate-y-1 hover:border-blue-200 hover:bg-blue-50 ${
                        index === 0 ? "border-red-200 bg-red-50" : "border-slate-200 bg-white"
                      }`}
                    >
                      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-3xl ${index === 0 ? "bg-red-100 text-red-700" : "bg-slate-100 text-slate-700"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h2 className="text-lg font-semibold text-slate-900">{item.label}</h2>
                      <p className="mt-3 text-sm leading-6 text-slate-500">{item.subtitle}</p>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Submitted Reports</p>
                <p className="mt-4 text-4xl font-semibold text-slate-900">{userReports}</p>
                <p className="mt-2 text-sm text-slate-500">Your total reports</p>
              </div>
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Your Points</p>
                <p className="mt-4 text-4xl font-semibold text-slate-900">{userPoints}</p>
                <p className="mt-2 text-sm text-slate-500">Current leaderboard score</p>
              </div>
              <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">In Progress</p>
                <p className="mt-4 text-4xl font-semibold text-slate-900">0</p>
                <p className="mt-2 text-sm text-slate-500">Issues actively being worked on</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
