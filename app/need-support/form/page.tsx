'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import {
  SupportRequest,
  EnergyLevel,
  EmotionalState,
  Urgency,
  SupportType,
  PreferredFormat,
  BandwidthLevel,
} from '@/lib/types';

const TOTAL_STEPS = 4;

export default function NeedSupportForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<SupportRequest>>({
    energyLevel: 'low',
    emotionalState: 'overwhelmed',
    urgency: 'soon',
    supportType: 'listening',
    preferredFormat: 'text',
    bandwidthForExplanation: 'very_limited',
    additionalContext: '',
  });

  useEffect(() => {
    const userStr = sessionStorage.getItem('currentUser');
    if (!userStr) {
      router.push('/auth/signup');
      return;
    }
    setUser(JSON.parse(userStr));
  }, [router]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    const supportRequest: SupportRequest = {
      id: `request-${Date.now()}`,
      userId: user.id,
      energyLevel: (formData.energyLevel as EnergyLevel) || 'low',
      emotionalState: (formData.emotionalState as EmotionalState) || 'overwhelmed',
      urgency: (formData.urgency as Urgency) || 'soon',
      supportType: (formData.supportType as SupportType) || 'listening',
      preferredFormat: (formData.preferredFormat as PreferredFormat) || 'text',
      bandwidthForExplanation: (formData.bandwidthForExplanation as BandwidthLevel) || 'very_limited',
      additionalContext: formData.additionalContext,
      createdAt: new Date(),
      status: 'active',
    };

    sessionStorage.setItem('currentSupportRequest', JSON.stringify(supportRequest));
    router.push('/need-support/review');
  };

  if (!user) return null;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-sm text-slate-600 hover:text-slate-900 mb-6 inline-block">
            ← Back to dashboard
          </Link>
          <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />
        </div>

        <Card padding="lg">
          {/* Step 1: Energy & Emotional State */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">How are you feeling right now?</h2>
                <p className="text-slate-600">Let's start with understanding where you are emotionally.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Energy Level</label>
                  <div className="space-y-2">
                    {(['low', 'medium', 'high'] as EnergyLevel[]).map((level) => (
                      <label key={level} className="flex items-center">
                        <input
                          type="radio"
                          name="energyLevel"
                          value={level}
                          checked={formData.energyLevel === level}
                          onChange={(e) => handleChange('energyLevel', e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-slate-700 capitalize">{level} energy</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Emotional State</label>
                  <Select
                    value={formData.emotionalState}
                    onChange={(e) => handleChange('emotionalState', e.target.value)}
                    options={[
                      { value: 'overwhelmed', label: 'Overwhelmed' },
                      { value: 'anxious', label: 'Anxious' },
                      { value: 'sad', label: 'Sad' },
                      { value: 'disconnected', label: 'Disconnected' },
                      { value: 'uncertain', label: 'Uncertain' },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Urgency & Support Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">What do you need?</h2>
                <p className="text-slate-600">Tell us about your support needs.</p>
              </div>

              <div className="space-y-4">
                <Select
                  label="How urgent is this?"
                  value={formData.urgency}
                  onChange={(e) => handleChange('urgency', e.target.value)}
                  options={[
                    { value: 'immediate', label: 'Right now (immediate)' },
                    { value: 'soon', label: 'Soon (within a day)' },
                    { value: 'whenever', label: "Whenever someone's available" },
                  ]}
                />

                <Select
                  label="What kind of support would help?"
                  value={formData.supportType}
                  onChange={(e) => handleChange('supportType', e.target.value)}
                  options={[
                    { value: 'listening', label: 'Someone to listen to me' },
                    { value: 'practical_help', label: 'Practical help with something' },
                    { value: 'perspective', label: 'A different perspective' },
                    { value: 'company', label: 'Just some company' },
                    { value: 'accountability', label: 'Accountability or follow-through' },
                  ]}
                />
              </div>
            </div>
          )}

          {/* Step 3: Format & Bandwidth */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">How do you want to connect?</h2>
                <p className="text-slate-600">Let us know your preferences.</p>
              </div>

              <div className="space-y-4">
                <Select
                  label="How do you prefer to connect?"
                  value={formData.preferredFormat}
                  onChange={(e) => handleChange('preferredFormat', e.target.value)}
                  options={[
                    { value: 'text', label: 'Text message' },
                    { value: 'voice', label: 'Voice call' },
                    { value: 'video', label: 'Video call' },
                    { value: 'in_person', label: 'In person' },
                  ]}
                />

                <Select
                  label="How much explanation can you manage right now?"
                  value={formData.bandwidthForExplanation}
                  onChange={(e) => handleChange('bandwidthForExplanation', e.target.value)}
                  options={[
                    { value: 'very_limited', label: 'Very limited (keep it short)' },
                    { value: 'somewhat_limited', label: 'Somewhat limited' },
                    { value: 'moderate', label: 'Moderate' },
                    { value: 'high', label: 'High (happy to talk at length)' },
                  ]}
                />

                <TextArea
                  label="Anything else you want to share? (optional)"
                  value={formData.additionalContext || ''}
                  onChange={(e) => handleChange('additionalContext', e.target.value)}
                  placeholder="Share any context that might help..."
                  rows={4}
                />
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Review your request</h2>
                <p className="text-slate-600">Make sure everything looks good before we find you a match.</p>
              </div>

              <Card padding="md" className="bg-slate-50">
                <div className="space-y-4 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Energy Level</span>
                    <span className="font-medium text-slate-900 capitalize">{formData.energyLevel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Emotional State</span>
                    <span className="font-medium text-slate-900 capitalize">{formData.emotionalState}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Urgency</span>
                    <span className="font-medium text-slate-900 capitalize">{formData.urgency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Support Type</span>
                    <span className="font-medium text-slate-900">{formData.supportType?.replace('_', ' ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Preferred Format</span>
                    <span className="font-medium text-slate-900">{formData.preferredFormat?.replace('_', ' ')}</span>
                  </div>
                  {formData.additionalContext && (
                    <div>
                      <span className="text-slate-600">Additional Context</span>
                      <p className="font-medium text-slate-900 mt-1">{formData.additionalContext}</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            {currentStep > 1 && (
              <Button variant="secondary" onClick={handlePrev} className="flex-1">
                Previous
              </Button>
            )}
            {currentStep < TOTAL_STEPS ? (
              <Button variant="primary" onClick={handleNext} className="flex-1">
                Next
              </Button>
            ) : (
              <Button variant="primary" onClick={handleSubmit} className="flex-1">
                Find My Match
              </Button>
            )}
          </div>
        </Card>
      </div>
    </Layout>
  );
}

// Import Link
import Link from 'next/link';
