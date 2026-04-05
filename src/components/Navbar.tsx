"use client";

import React from 'react';
import Link from "next/link";
import { Radar, ShieldAlert, BookOpen, MessageSquare, Database } from "lucide-react";

export default function Navbar({ onOpenChat }: { onOpenChat: () => void }) {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-8 py-4 bg-slate-900/80 backdrop-blur-lg border-b border-slate-800">
      <div className="flex items-center gap-3">
        <div className="bg-cyan-500 p-2 rounded-lg">
          <Radar className="w-6 h-6 text-slate-950" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tighter text-white uppercase">
            Cyclone <span className="text-cyan-400">Atlas</span>
          </h1>
          <p className="text-[10px] tracking-widest text-slate-500 font-mono -mt-1">
            INDIA | MISSION CONTROL
          </p>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <NavLink href="/timeline" icon={<Database className="w-4 h-4" />} label="Timeline" />
        <NavLink href="/risk" icon={<Radar className="w-4 h-4" />} label="Risk Outlook" />
        <NavLink href="/precaution" icon={<ShieldAlert className="w-4 h-4" />} label="Precaution" />
        <NavLink href="/archive" icon={<BookOpen className="w-4 h-4" />} label="Archive" />
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenChat}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 rounded-md text-sm font-medium text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 transition-all"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Ask AI</span>
        </button>
      </div>
    </nav>
  );
}

function NavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-cyan-400 transition-colors"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
