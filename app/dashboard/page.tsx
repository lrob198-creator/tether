'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { User, Notification } from '@/lib/types';
import { notificationStorage } from '@/lib/notifications';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
      router.push('/auth/signup');
      return;
    }
    const userData = JSON.parse(userStr);
    setUser(userData);

    // Load notifications
    const userNotifications = notificationStorage.getNotifications(userData.id);
    setNotifications(userNotifications);
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  const handleMarkAsRead = (notificationId: string) => {
    if (user) {
      notificationStorage.markAsRead(user.id, notificationId);
      setNotifications(prev =>
        prev.map(n => n.id === notificationId ? { ...n, isRead: true } : n)
      );
    }
  };

  const handleMarkAllAsRead = () => {
    if (user) {
      notificationStorage.markAllAsRead(user.id);
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <Layout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {user?.name}</h1>
            <p className="text-slate-600 mt-1">What would you like to do today?</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 hover:text-slate-900 underline"
          >
            Logout
          </button>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <Card padding="lg" className="border-blue-200 bg-blue-50">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">
                  Notifications {unreadCount > 0 && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {unreadCount} new
                    </span>
                  )}
                </h2>
                {unreadCount > 0 && (
                  <button
                    onClick={handleMarkAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {notifications.slice(0, 3).map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg border ${
                      notification.isRead
                        ? 'bg-white border-slate-200'
                        : 'bg-blue-100 border-blue-300'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-900">{notification.title}</h3>
                        <p className="text-sm text-slate-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-500 mt-2">
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="ml-3 text-blue-600 hover:text-blue-800 text-sm underline"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* I Need Support */}
          <Card padding="lg" className="card-warm">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">🤲</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">I need support</h2>
                  <p className="text-slate-600">
                    Connect with someone who can help you right now.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <p>You'll tell us:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-500">
                  <li>Your energy level and emotional state</li>
                  <li>What kind of support would help</li>
                  <li>Your preferred way to connect</li>
                </ul>
              </div>

              <Link href="/need-support/form">
                <Button variant="primary" size="md" className="w-full btn-warm">
                  Start
                </Button>
              </Link>
            </div>
          </Card>

          {/* I Have Capacity */}
          <Card padding="lg" className="card-warm">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl">💪</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-2">I have capacity</h2>
                  <p className="text-slate-600">
                    Help someone through a difficult moment.
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <p>You'll share:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-500">
                  <li>How much time you have available</li>
                  <li>What kinds of support you can offer</li>
                  <li>How you prefer to connect</li>
                </ul>
              </div>

              <Link href="/have-capacity/form">
                <Button variant="secondary" size="md" className="w-full" style={{background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white'}}>
                  Start
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Safety Resources */}
        <div className="border-t border-slate-200 pt-8 mt-12">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Need immediate help?</h3>
          <p className="text-slate-600 mb-4">
            If you're in crisis or need urgent support, please reach out to a crisis line or emergency
            service in your area.
          </p>
          <Link href="/resources">
            <Button variant="outline" size="md">
              View Resources
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
