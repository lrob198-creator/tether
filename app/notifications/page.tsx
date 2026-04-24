'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { Notification } from '@/lib/types';
import { notificationStorage } from '@/lib/notifications';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
      router.push('/auth/signup');
      return;
    }

    const currentUser = JSON.parse(userStr);
    setUserId(currentUser.id);
    setNotifications(notificationStorage.getNotifications(currentUser.id));
  }, [router]);

  const handleMarkRead = (notificationId: string) => {
    if (!userId) return;
    notificationStorage.markAsRead(userId, notificationId);
    setNotifications((prev) => prev.map((n) =>
      n.id === notificationId ? { ...n, isRead: true } : n
    ));
  };

  const handleMarkAll = () => {
    if (!userId) return;
    notificationStorage.markAllAsRead(userId);
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleClear = () => {
    if (!userId) return;
    notificationStorage.clearAll(userId);
    setNotifications([]);
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Notifications</h1>
            <p className="text-slate-600 mt-2">
              Keep track of matches, profile updates, and support actions in one place.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="md" onClick={handleMarkAll} disabled={!notifications.length || unreadCount === 0}>
              Mark all as read
            </Button>
            <Button variant="secondary" size="md" onClick={handleClear} disabled={!notifications.length}>
              Clear all
            </Button>
          </div>
        </div>

        <Card padding="lg" className="card-warm">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div>
                <p className="text-slate-700">You have</p>
                <p className="text-4xl font-bold text-slate-900">{notifications.length}</p>
                <p className="text-slate-500">notification{notifications.length !== 1 ? 's' : ''}</p>
              </div>
              {unreadCount > 0 ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium">
                  {unreadCount} new
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">
                  All caught up
                </div>
              )}
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          {notifications.length === 0 ? (
            <Card padding="lg" className="bg-slate-50">
              <div className="text-center space-y-4">
                <h2 className="text-xl font-semibold text-slate-900">No notifications yet</h2>
                <p className="text-slate-600">When your profile is complete or a match is found, you'll see it here.</p>
                <Link href="/dashboard">
                  <Button variant="primary" size="md" className="w-full sm:w-auto">
                    Back to dashboard
                  </Button>
                </Link>
              </div>
            </Card>
          ) : (
            notifications.map((notification) => (
              <Card
                key={notification.id}
                padding="lg"
                className={notification.isRead ? 'bg-white border-slate-200' : 'bg-blue-50 border-blue-200'}
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h2 className="text-lg font-semibold text-slate-900">{notification.title}</h2>
                      {!notification.isRead && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-slate-700">{notification.message}</p>
                    <p className="text-xs text-slate-500">{new Date(notification.createdAt).toLocaleString()}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    {!notification.isRead && (
                      <Button variant="outline" size="sm" onClick={() => handleMarkRead(notification.id)}>
                        Mark read
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
