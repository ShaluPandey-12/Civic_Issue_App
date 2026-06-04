"use client"

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

export function BackButton({ href, children, className }: { href?: string; children?: ReactNode; className?: string }) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => (href ? router.push(href) : router.back())}
      className={`  inline-flex items-center gap-2
      rounded-full
      bg-slate-950
      px-4 py-2.5
      text-sm font-semibold
      text-white
      shadow-lg
      transition
      hover:bg-slate-800
      hover:scale-105 ${className || ''}`}
      aria-label="Go back"
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </button>
  );
}
