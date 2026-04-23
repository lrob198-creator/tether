'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { SupportRequest } from '@/lib/types';
import { generateSupportCard, generateCardVariation } from '@/lib/cardGenerator';

export default function CardReview() {
  const [user, setUser] = useState<any>(null);
  const [supportRequest, setSupportRequest] = useState<SupportRequest | null>(null);
  const [variationIndex, setVariationIndex] = useState(0);
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
    setSupportRequest(JSON.parse(requestStr));
  }, [router]);

  if (!user || !supportRequest) return null;

  const card = generateCardVariation(supportRequest, variationIndex);

  const handleApprove = () => {
    // Save the approved card
    sessionStorage.setItem('approvedCard', JSON.stringify(card));
    // Trigger matching and redirect
    router.push('/matches');
  };

  const handleRegenerate = () => {
    setVariationIndex((prev) => prev + 1);
  };

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <Link href="/need-support/form" className="text-sm text-slate-600 hover:text-slate-900 mb-6 inline-block">
          ← Back
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Here's your support card</h1>
          <p className="text-slate-600">
            This is how we'll present your need to potential supporters. Feel free to adjust until it feels right.
          </p>
        </div>

        {/* Support Card Display */}
        <Card padding="lg" className="mb-8 border-2 border-slate-300">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-slate-900">{card.title}</h2>
            <p className="text-lg text-slate-700 leading-relaxed">{card.description}</p>
            <div className="pt-4">
              <Button variant="primary" size="md">
                {card.callToAction}
              </Button>
            </div>
          </div>
        </Card>

        {/* Context */}
        <Card padding="md" className="bg-slate-50 mb-8">
          <div className="space-y-3 text-sm">
            <p>
              <span className="font-medium text-slate-900">Your emotional state:</span>{' '}
              <span className="text-slate-600">{supportRequest.emotionalState.replace('_', ' ')}</span>
            </p>
            <p>
              <span className="font-medium text-slate-900">Support type you need:</span>{' '}
              <span className="text-slate-600">{supportRequest.supportType.replace('_', ' ')}</span>
            </p>
            <p>
              <span className="font-medium text-slate-900">Preferred format:</span>{' '}
              <span className="text-slate-600">{supportRequest.preferredFormat.replace('_', ' ')}</span>
            </p>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            variant="secondary"
            size="md"
            onClick={handleRegenerate}
            className="flex-1"
          >
            Try different wording
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleApprove}
            className="flex-1"
          >
            This looks good
          </Button>
        </div>

        {/* Additional options */}
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900">
            Cancel and return to dashboard
          </Link>
        </div>
      </div>
    </Layout>
  );
}
