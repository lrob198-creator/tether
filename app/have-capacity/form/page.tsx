'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Layout from '@/components/Layout';
import Button from '@/components/Button';
import Card from '@/components/Card';
import ProgressBar from '@/components/ProgressBar';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import { CapacityProfile, SupportType, PreferredFormat, BandwidthLevel } from '@/lib/types';
import { notificationStorage } from '@/lib/notifications';

const TOTAL_STEPS = 3;

export default function HaveCapacityForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<Partial<CapacityProfile>>({
    timeAvailable: 30,
    supportTypesAvailable: [],
    formatPreference: 'text',
    bandwidthLevel: 'moderate',
    description: '',
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

  const handleSupportTypeChange = (supportType: SupportType, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      supportTypesAvailable: checked
        ? [...(prev.supportTypesAvailable || []), supportType]
        : (prev.supportTypesAvailable || []).filter((type) => type !== supportType),
    }));
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
    const capacityProfile: CapacityProfile = {
      userId: user.id,
      timeAvailable: formData.timeAvailable || 30,
      supportTypesAvailable: formData.supportTypesAvailable || [],
      formatPreference: (formData.formatPreference as PreferredFormat) || 'text',
      bandwidthLevel: (formData.bandwidthLevel as BandwidthLevel) || 'moderate',
      description: formData.description,
    };

    // Store in sessionStorage for now (in real app, this would go to backend)
    sessionStorage.setItem('currentCapacityProfile', JSON.stringify(capacityProfile));

    // Update user to include capacity profile
    const updatedUser = { ...user, capacityProfile };
    sessionStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Send a profile completion notification
    notificationStorage.addNotification(user.id, {
      userId: user.id,
      type: 'profile_completed',
      title: 'Capacity profile ready',
      message: 'Your helper profile is complete. You are now visible to people who need support.',
      relatedId: user.id,
    });

    router.push('/have-capacity/profile');
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
          {/* Step 1: Time Available */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">How much time do you have?</h2>
                <p className="text-slate-600">Let people know how much time you can dedicate to supporting others.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Time Available (minutes)</label>
                  <div className="space-y-2">
                    {[
                      { value: 15, label: '15 minutes - Quick check-in' },
                      { value: 30, label: '30 minutes - Short conversation' },
                      { value: 60, label: '60 minutes - Full session' },
                      { value: 90, label: '90 minutes - Extended support' },
                      { value: 120, label: '2+ hours - High capacity' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="timeAvailable"
                          value={option.value}
                          checked={formData.timeAvailable === option.value}
                          onChange={(e) => handleChange('timeAvailable', parseInt(e.target.value))}
                          className="mr-3"
                        />
                        <span className="text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Support Types & Format */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">What can you offer?</h2>
                <p className="text-slate-600">Tell us about the types of support you're comfortable providing.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Types of Support</label>
                  <div className="space-y-2">
                    {[
                      { value: 'listening', label: 'Active listening and emotional support' },
                      { value: 'practical_help', label: 'Practical help and problem-solving' },
                      { value: 'perspective', label: 'Fresh perspective and advice' },
                      { value: 'company', label: 'Just being there and providing company' },
                      { value: 'accountability', label: 'Accountability and follow-through support' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={(formData.supportTypesAvailable || []).includes(option.value as SupportType)}
                          onChange={(e) => handleSupportTypeChange(option.value as SupportType, e.target.checked)}
                          className="mr-3"
                        />
                        <span className="text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Preferred Format</label>
                  <Select
                    value={formData.formatPreference}
                    onChange={(e) => handleChange('formatPreference', e.target.value)}
                    options={[
                      { value: 'text', label: 'Text messaging' },
                      { value: 'voice', label: 'Voice call' },
                      { value: 'video', label: 'Video call' },
                      { value: 'in_person', label: 'In-person meeting' },
                    ]}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Bandwidth & Description */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Your capacity details</h2>
                <p className="text-slate-600">Help others understand your availability and approach.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Your Bandwidth Level</label>
                  <div className="space-y-2">
                    {[
                      { value: 'very_limited', label: 'Very limited - Only brief interactions' },
                      { value: 'somewhat_limited', label: 'Somewhat limited - Short conversations' },
                      { value: 'moderate', label: 'Moderate - Standard conversations' },
                      { value: 'high', label: 'High - Extended or multiple sessions' },
                    ].map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name="bandwidthLevel"
                          value={option.value}
                          checked={formData.bandwidthLevel === option.value}
                          onChange={(e) => handleChange('bandwidthLevel', e.target.value)}
                          className="mr-3"
                        />
                        <span className="text-slate-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-3">Optional Description</label>
                  <TextArea
                    value={formData.description || ''}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Tell others a bit about yourself and your approach to supporting others..."
                    rows={4}
                  />
                </div>
              </div>
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            size="md"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </Button>

          {currentStep < TOTAL_STEPS ? (
            <Button
              variant="primary"
              size="md"
              onClick={handleNext}
              disabled={
                (currentStep === 1 && !formData.timeAvailable) ||
                (currentStep === 2 && (formData.supportTypesAvailable || []).length === 0)
              }
            >
              Next
            </Button>
          ) : (
            <Button
              variant="primary"
              size="md"
              onClick={handleSubmit}
            >
              Create Profile
            </Button>
          )}
        </div>
      </div>
    </Layout>
  );
}