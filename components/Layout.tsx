'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { notificationStorage } from '@/lib/notifications';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) return;

    const user = JSON.parse(userStr);
    setCurrentUser(user);
    setUnreadCount(notificationStorage.getUnreadCount(user.id));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation */}
      <nav className="border-b border-slate-200 bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-slate-900">
            Tether
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/notifications" className="relative text-sm text-slate-600 hover:text-slate-900">
              Notifications
              {unreadCount > 0 && (
                <span className="absolute -top-2 -right-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-2.5 py-0.5 text-[10px] font-semibold text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
            {currentUser ? (
              <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
                Dashboard
              </Link>
            ) : (
              <Link href="/auth/signin" className="text-sm text-slate-600 hover:text-slate-900">
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 py-12">{children}</main>
    </div>
  );
}
