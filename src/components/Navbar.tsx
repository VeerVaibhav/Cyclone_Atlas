"use client";

import React from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radar, ShieldAlert, BookOpen, MessageSquare, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar({ onOpenChat }: { onOpenChat: () => void }) {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] glass-navbar">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-accent-cyan p-2 rounded-xl shadow-[0_0_15px_rgba(34,211,238,0.3)] group-hover:scale-110 transition-transform">
            <Radar className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter text-white uppercase leading-none">
              Cyclone <span className="text-accent-cyan">Atlas</span>
            </h1>
            <p className="text-[10px] tracking-[0.3em] text-slate-500 font-mono uppercase mt-1">
              India | Mission Control
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <NavLink href="/timeline" active={pathname === "/timeline"} icon={<Database className="w-4 h-4" />} label="Timeline" />
          <NavLink href="/risk" active={pathname === "/risk"} icon={<Radar className="w-4 h-4" />} label="Risk Outlook" />
          <NavLink href="/precaution" active={pathname === "/precaution"} icon={<ShieldAlert className="w-4 h-4" />} label="Precaution" />
          <NavLink href="/archive" active={pathname === "/archive"} icon={<BookOpen className="w-4 h-4" />} label="Archive" />
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenChat}
            className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-white/10 rounded-xl text-sm font-bold text-slate-300 hover:text-accent-cyan hover:border-accent-cyan/50 transition-all active:scale-95 animate-pulse-glow"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Ask AI</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label, active }: { href: string; icon: React.ReactNode; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={cn(
        "nav-link",
        active && "nav-link-active"
      )}
    >
      {icon}
      <span className="uppercase tracking-widest text-[11px] font-bold">{label}</span>
    </Link>
  );
}
