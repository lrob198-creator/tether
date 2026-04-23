'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { SupportRequest, Match } from '@/lib/types';
import { findMatches, getHelperName } from '@/lib/matchingLogic';

export default function MatchesPage() {
  const [user, setUser] = useState<any>(null);
  const [supportRequest, setSupportRequest] = useState<SupportRequest | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const router = useRouter();

  useEffect(() => {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
      router.push('/auth/signup');
      return;
    }
    setUser(JSON.parse(userStr));

    const requestStr = sessionStorage.getItem('currentSupportRequest');
    if (!requestStr) {
      router.push('/need-support/form');
      return;
    }
    const request = JSON.parse(requestStr);
    setSupportRequest(request);

    // Find matches
    const foundMatches = findMatches(request);
    setMatches(foundMatches);
  }, [router]);

  if (!user || !supportRequest) return null;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">We found someone for you!</h1>
          <p className="text-slate-600">
            Based on your needs and their availability, we've matched you with {matches.length}{' '}
            potential supporter{matches.length !== 1 ? 's' : ''}.
          </p>
        </div>

        {matches.length > 0 ? (
          <div className="space-y-6 mb-12">
            {matches.map((match, index) => (
              <Card key={match.id} padding="lg" className="border-l-4 border-l-slate-700">
                <div className="space-y-4">
                  {/* Match Header */}
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-1">
                      Match #{index + 1}
                    </h2>
                    <p className="text-sm text-slate-600">
                      Compatibility Score: {match.matchScore.toFixed(0)}%
                    </p>
                  </div>

                  {/* Support Card */}
                  <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                    <h3 className="font-semibold text-slate-900">{match.supportCard.title}</h3>
                    <p className="text-slate-700 leading-relaxed">{match.supportCard.description}</p>
                  </div>

                  {/* Supporter Info */}
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600 mb-2">Willing to help</p>
                    <p className="font-medium text-slate-900">
                      {getHelperName(match.capacityUserId)} has capacity and is ready to connect.
                    </p>
                  </div>

                  {/* Action Button */}
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full"
                  >
                    {match.supportCard.callToAction}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card padding="lg" className="mb-12">
            <div className="text-center space-y-4">
              <h3 className="text-lg font-semibold text-slate-900">No matches yet</h3>
              <p className="text-slate-600">
                We didn't find anyone available right now, but please check back soon. Support is being
                added to the network all the time.
              </p>
            </div>
          </Card>
        )}

        {/* Next Steps */}
        <Card padding="lg" className="bg-slate-50">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">What happens next?</h3>
            <ul className="space-y-2 text-slate-700">
              <li className="flex gap-3">
                <span className="font-semibold text-slate-900">1.</span>
                <span>We'll reach out to your matched supporter(s) to confirm they're available.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-slate-900">2.</span>
                <span>If they accept, we'll facilitate a safe introduction.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-slate-900">3.</span>
                <span>You'll connect directly and work out the details of your support.</span>
              </li>
            </ul>
          </div>
        </Card>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          <Link href="/dashboard" className="flex-1">
            <Button variant="secondary" size="md" className="w-full">
              Back to Dashboard
            </Button>
          </Link>
          <Link href="/dashboard" className="flex-1">
            <Button variant="primary" size="md" className="w-full">
              Done
            </Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
