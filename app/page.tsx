'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Landing() {
  return (
    <Layout>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-bold text-slate-900 leading-tight">
            Before crisis, connection.
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Tether is an AI-powered reciprocal care network. Ask for small forms of real human support
            when you need it, before disconnection turns into crisis.
          </p>
        </div>

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <Card padding="md">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900">Not a therapy app</h3>
              <p className="text-sm text-slate-600">
                Real human connection. Real support from people who understand what it means to struggle.
              </p>
            </div>
          </Card>

          <Card padding="md">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900">Not a social network</h3>
              <p className="text-sm text-slate-600">
                Private. Purposeful. No feeds, no performance, no judgment. Just dignity and care.
              </p>
            </div>
          </Card>

          <Card padding="md">
            <div className="space-y-3">
              <h3 className="font-semibold text-slate-900">Reciprocal</h3>
              <p className="text-sm text-slate-600">
                Sometimes you need support. Sometimes you have capacity to give it. Both matter.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-12 text-center space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Ready to connect?</h2>
            <p className="text-slate-600 text-lg">
              Whether you need support or have capacity to give it, Tether is here.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/signup" className="flex-1 max-w-xs">
              <Button variant="primary" size="lg" className="w-full">
                Get Started
              </Button>
            </Link>
            <Link href="/auth/signin" className="flex-1 max-w-xs">
              <Button variant="outline" size="lg" className="w-full">
                Already a member?
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-slate-500 pt-8">
          <p>Tether: Dignity-first support, when you need it most.</p>
        </div>
      </div>
    </Layout>
  );
}
