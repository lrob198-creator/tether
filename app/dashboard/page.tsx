'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { User } from '@/lib/types';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
      router.push('/auth/signup');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('isAuthenticated');
    router.push('/');
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Welcome, {user.name}</h1>
            <p className="text-slate-600 mt-1">What would you like to do today?</p>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-slate-600 hover:text-slate-900 underline"
          >
            Logout
          </button>
        </div>

        {/* Main Actions */}
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {/* I Need Support */}
          <Card padding="lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">I need support</h2>
                <p className="text-slate-600">
                  Connect with someone who can help you right now. Tell us what you need, and we'll
                  find a match.
                </p>
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
                <Button variant="primary" size="md" className="w-full">
                  Start
                </Button>
              </Link>
            </div>
          </Card>

          {/* I Have Capacity */}
          <Card padding="lg">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">I have capacity</h2>
                <p className="text-slate-600">
                  Let people know when you're available to support others. Help someone through a
                  difficult moment.
                </p>
              </div>

              <div className="space-y-3 text-sm text-slate-600">
                <p>You'll share:</p>
                <ul className="list-disc list-inside space-y-1 text-slate-500">
                  <li>How much time you have available</li>
                  <li>What kinds of support you can offer</li>
                  <li>How you prefer to connect</li>
                </ul>
              </div>

              <Button
                variant="secondary"
                size="md"
                className="w-full"
                disabled
              >
                Coming Soon
              </Button>
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
