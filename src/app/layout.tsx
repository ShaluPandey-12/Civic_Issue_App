import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/authContext";

export const metadata: Metadata = {
  title: "CivicSolve — See it. Snap it. Solve it. Together.",
  description:
    "An AI-powered civic issue reporting platform that connects citizens with local authorities. Report problems, track resolutions, and build smarter communities.",
  keywords: [
    "civic issues",
    "city reporting",
    "smart city",
    "AI",
    "community",
    "municipal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
