'use client';

import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';

export default function Landing() {
  return (
    <Layout>
      <div className="space-y-12 fade-in-up">
        {/* Hero Section */}
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold leading-tight">
              Before crisis, connection.
            </h1>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Tether is an AI-powered reciprocal care network. Ask for small forms of real human support
              when you need it, before disconnection turns into crisis.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link href="/auth/signup" className="flex-1 max-w-xs">
              <Button variant="primary" size="lg" className="w-full btn-warm">
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

        {/* Value Proposition */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <Card padding="lg" className="card-warm text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-xl">🤝</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Not a therapy app</h3>
              <p className="text-slate-600">
                Real human connection. Real support from people who understand what it means to struggle.
              </p>
            </div>
          </Card>

          <Card padding="lg" className="card-warm text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Not a social network</h3>
              <p className="text-slate-600">
                Private. Purposeful. No feeds, no performance, no judgment. Just dignity and care.
              </p>
            </div>
          </Card>

          <Card padding="lg" className="card-warm text-center">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-xl">🔄</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg">Reciprocal</h3>
              <p className="text-slate-600">
                Sometimes you need support. Sometimes you have capacity to give it. Both matter.
              </p>
            </div>
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-20 bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 rounded-3xl p-12 text-center space-y-8 border border-orange-100">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Ready to connect?</h2>
            <p className="text-slate-700 text-lg max-w-2xl mx-auto">
              Whether you need support or have capacity to give it, Tether creates meaningful connections
              when they matter most.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
            <Link href="/auth/signup" className="flex-1 max-w-sm">
              <Button variant="primary" size="lg" className="w-full btn-warm text-lg py-4">
                Join Tether
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer note */}
        <div className="text-center text-sm text-slate-500 pt-12 pb-8">
          <p className="text-lg">✨ Tether: Dignity-first support, when you need it most.</p>
        </div>
      </div>
    </Layout>
  );
}
