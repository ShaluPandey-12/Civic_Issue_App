
"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

const roles = ["Citizen", "Admin", "Head"] as const;
const MOCK_OTP = "123456";

type Role = (typeof roles)[number];

export default function LoginPage() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("Citizen");
  const [mobileNumber, setMobileNumber] = useState("1234567890");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(MOCK_OTP);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = () => {
    setOtpSent(true);
    setError("");
    alert("Mock OTP sent: 123456. Use it to log in for testing.");
  };

  const handleVerifyOtp = () => {
    if (!mobileNumber) {
      setError("Please enter a mobile number.");
      return;
    }

    if (otp !== MOCK_OTP) {
      setError("Invalid OTP. Use 123456 for testing.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "Admin") router.push("/admin");
      else if (role === "Head") router.push("/head");
      else router.push("/citizen");
    }, 600);
  };

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl rounded-[28px] border border-slate-200 bg-white px-8 py-10 shadow-[0_24px_80px_rgba(15,23,42,0.1)]">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-slate-950 px-4 py-2 text-sm font-semibold text-white shadow transition hover:bg-slate-800"
          >
            <span>←</span>
            Back
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-semibold text-slate-900">Welcome to CivicSolve</h1>
          <p className="mt-2 text-sm font-semibold text-blue-700">See it. Snap it. Solve it. Together.</p>
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

        <p className="mt-4 text-center text-sm text-slate-500">
          Report issues and track their status using your mobile number.
        </p>

        <div className="mt-8 space-y-4">
          <label className="block text-sm font-medium text-slate-700">Mobile Number</label>
          <input
            type="tel"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            placeholder="1234567890"
            className="w-full rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
          />

          {otpSent && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="123456"
                className="w-full rounded-3xl border border-slate-300 bg-slate-100 px-4 py-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>
          )}

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="button"
            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            disabled={loading}
            className="w-full rounded-3xl bg-blue-600 px-4 py-4 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            {loading ? "Please wait..." : otpSent ? "Verify OTP" : "Send OTP"}
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Want a new account?{' '}
          <Link href="/signup" className="font-semibold text-blue-600 hover:text-blue-700">
            Sign Up
          </Link>
        </p>
      </div>
    </main>
  );
}
"use client"

export { default } from '../page'

