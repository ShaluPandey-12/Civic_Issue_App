"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/authContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  doc,
  getDoc,
} from "firebase/firestore";
import { Coins, Trophy, AlertCircle, TrendingUp } from "lucide-react";

interface UserScore {
  id: string;
  name: string;
  email: string;
  points: number;
  reports: number;
  avatar?: string;
  badges?: string[];
}

const pointRules = [
  { icon: AlertCircle, label: "Base Points", value: "5 pts per report" },
  { icon: TrendingUp, label: "Emergency Bonus", value: "10 pts for emergency" },
  { icon: Trophy, label: "Resolution Bonus", value: "20 pts when resolved" },
];

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<UserScore[]>([]);
  const [userScore, setUserScore] = useState<UserScore | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 🔥 REALTIME LEADERBOARD (IMPORTANT FIX)
    const q = query(
      collection(db, "users"),
      orderBy("points", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const users: UserScore[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().displayName || "Anonymous",
        email: doc.data().email || "",
        points: doc.data().points || 0,
        reports: doc.data().reports || 0,
        avatar: doc.data().avatar,
        badges: doc.data().badges || [],
      }));

      setLeaderboard(users);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // current user score listener
  useEffect(() => {
    if (!user?.uid) return;

    const fetchUser = async () => {
      const userDocRef = doc(db, "users", user.uid);
      const snap = await getDoc(userDocRef);

      if (snap.exists()) {
        const data = snap.data();
        setUserScore({
          id: snap.id,
          name: data.displayName || "Anonymous",
          email: data.email || "",
          points: data.points || 0,
          reports: data.reports || 0,
          avatar: data.avatar,
          badges: data.badges || [],
        });
      }
    };

    fetchUser();
  }, [user]);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <Link
            href="/citizen"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
          >
            <span>←</span>
            Back
          </Link>
        </div>

        {/* Header (UNCHANGED UI) */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 flex items-center gap-2">
            <Trophy className="w-8 h-8 text-blue-600" />
            Leaderboard & Rewards
          </h1>
          <p className="mt-2 text-slate-600">
            Earn points for every issue report and climb the rankings.
          </p>
        </div>

        {/* Your Coins */}
        <div className="mb-8 rounded-[20px] border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-widest text-slate-500">
                Your Coins
              </p>
              <p className="mt-4 text-5xl font-bold text-slate-900">
                {userScore?.points || 0}
              </p>
              <p className="mt-2 text-sm text-slate-500">
                Points earned for your contributions
              </p>
            </div>
            <Coins className="w-24 h-24 text-yellow-500 opacity-20" />
          </div>
        </div>

        {/* Info Boxes (UNCHANGED) */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-[20px] border border-blue-200 bg-blue-50 p-6">
            <h3 className="font-semibold text-blue-900">
              Categories for Reports
            </h3>
            <p className="mt-3 text-sm text-blue-700">
              Explore 6 different categories to submit your reports.
            </p>
          </div>

          <div className="rounded-[20px] border border-green-200 bg-green-50 p-6">
            <h3 className="font-semibold text-green-900">
              Winning Conditions & Rewards
            </h3>
            <p className="mt-3 text-sm text-green-700">
              Top 5 reporters get exclusive badges and recognition.
            </p>
          </div>
        </div>

        {/* How it Works */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            How it Works
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {pointRules.map((rule, idx) => {
              const Icon = rule.icon;
              return (
                <div
                  key={idx}
                  className="rounded-[20px] border border-slate-200 bg-white p-6 shadow-sm"
                >
                  <Icon className="w-8 h-8 text-slate-700 mb-3" />
                  <p className="font-medium text-slate-900">{rule.label}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    {rule.value}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="rounded-[20px] border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">

              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left">Rank</th>
                  <th className="px-6 py-4 text-left">User</th>
                  <th className="px-6 py-4 text-center">Reports</th>
                  <th className="px-6 py-4 text-right">Score</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">

                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      Loading leaderboard...
                    </td>
                  </tr>
                ) : leaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-8">
                      No users yet. Start reporting issues!
                    </td>
                  </tr>
                ) : (
                  leaderboard.map((u, idx) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4">
                        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100">
                          {idx + 1}
                        </span>
                      </td>

                      <td className="px-6 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                          {u.name?.charAt(0)?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium">{u.name}</p>
                          <p className="text-xs text-slate-500">{u.email}</p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {u.reports}
                      </td>

                      <td className="px-6 py-4 text-right font-bold">
                        {u.points}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

      </div>
    </main>
  );
}