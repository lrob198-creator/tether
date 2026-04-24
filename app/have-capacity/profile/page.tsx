'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { CapacityProfile, SupportType } from '@/lib/types';

export default function HaveCapacityProfile() {
  const [user, setUser] = useState<any>(null);
  const [capacityProfile, setCapacityProfile] = useState<CapacityProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    const userStr = sessionStorage.getItem('currentUser');
    const profileStr = sessionStorage.getItem('currentCapacityProfile');

    if (!userStr) {
      router.push('/auth/signup');
      return;
    }

    const userData = JSON.parse(userStr);
    setUser(userData);

    if (profileStr) {
      setCapacityProfile(JSON.parse(profileStr));
    } else if (userData.capacityProfile) {
      setCapacityProfile(userData.capacityProfile);
    } else {
      // No profile found, redirect to form
      router.push('/have-capacity/form');
    }
  }, [router]);

  const formatSupportTypes = (types: SupportType[]) => {
    const typeLabels: Record<SupportType, string> = {
      listening: 'Active Listening',
      practical_help: 'Practical Help',
      perspective: 'Fresh Perspective',
      company: 'Company & Presence',
      accountability: 'Accountability',
    };
    return types.map(type => typeLabels[type]).join(', ');
  };

  const formatTime = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
    }
    return `${minutes}m`;
  };

  const formatFormat = (format: string) => {
    const formatLabels: Record<string, string> = {
      text: 'Text Messaging',
      voice: 'Voice Calls',
      video: 'Video Calls',
      in_person: 'In-Person',
    };
    return formatLabels[format] || format;
  };

  const formatBandwidth = (bandwidth: string) => {
    const bandwidthLabels: Record<string, string> = {
      very_limited: 'Very Limited',
      somewhat_limited: 'Somewhat Limited',
      moderate: 'Moderate',
      high: 'High Capacity',
    };
    return bandwidthLabels[bandwidth] || bandwidth;
  };

  if (!user || !capacityProfile) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 mb-6 inline-block">
            ← Back to dashboard
          </Link>
        </div>

        <Card padding="lg">
          <div className="space-y-8">
            {/* Header */}
            <div className="text-center">
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Support Profile</h1>
              <p className="text-slate-600">
                This is how others will see your availability to help. You can update it anytime.
              </p>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Time Available</h3>
                  <p className="text-slate-700">{formatTime(capacityProfile.timeAvailable)}</p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Preferred Format</h3>
                  <p className="text-slate-700">{formatFormat(capacityProfile.formatPreference)}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Types of Support</h3>
                <p className="text-slate-700">{formatSupportTypes(capacityProfile.supportTypesAvailable)}</p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Capacity Level</h3>
                <p className="text-slate-700">{formatBandwidth(capacityProfile.bandwidthLevel)}</p>
              </div>

              {capacityProfile.description && (
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">About You</h3>
                  <p className="text-slate-700">{capacityProfile.description}</p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-slate-200 pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/have-capacity/form" className="flex-1">
                  <Button variant="outline" size="md" className="w-full">
                    Edit Profile
                  </Button>
                </Link>

                <Link href="/dashboard" className="flex-1">
                  <Button variant="primary" size="md" className="w-full">
                    Back to Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </Card>

        {/* Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-600">
            Your profile helps us match you with people who need the support you can provide.
            You'll be notified when there's a good match.
          </p>
        </div>
      </div>
    </Layout>
  );
}