"use client";

import React from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div 
      key={pathname}
      className="animate-slide-up"
      style={{ animationDuration: '0.6s' }}
    >
      {children}
    </div>
  );
}
