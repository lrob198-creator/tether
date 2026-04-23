import { User, CapacityProfile, SupportRequest } from './types';

export const mockUsers: User[] = [
  {
    id: 'user-1',
    name: 'Marcus',
    email: 'marcus@example.com',
    createdAt: new Date(),
  },
  {
    id: 'helper-1',
    name: 'Sarah',
    email: 'sarah@example.com',
    createdAt: new Date(),
  },
  {
    id: 'helper-2',
    name: 'James',
    email: 'james@example.com',
    createdAt: new Date(),
  },
  {
    id: 'helper-3',
    name: 'Elena',
    email: 'elena@example.com',
    createdAt: new Date(),
  },
  {
    id: 'helper-4',
    name: 'David',
    email: 'david@example.com',
    createdAt: new Date(),
  },
  {
    id: 'helper-5',
    name: 'Priya',
    email: 'priya@example.com',
    createdAt: new Date(),
  },
];

export const mockCapacityProfiles: Record<string, CapacityProfile> = {
  'helper-1': {
    userId: 'helper-1',
    timeAvailable: 45,
    supportTypesAvailable: ['listening', 'perspective'],
    formatPreference: 'text',
    bandwidthLevel: 'high',
    description: 'Good listener, loves helping with perspective and new viewpoints.',
  },
  'helper-2': {
    userId: 'helper-2',
    timeAvailable: 90,
    supportTypesAvailable: ['practical_help', 'accountability'],
    formatPreference: 'voice',
    bandwidthLevel: 'moderate',
    description: 'Practical problem-solver. Can help with task planning and follow-through.',
  },
  'helper-3': {
    userId: 'helper-3',
    timeAvailable: 30,
    supportTypesAvailable: ['company', 'listening'],
    formatPreference: 'text',
    bandwidthLevel: 'high',
    description: 'Warm presence. Great for just being there and listening.',
  },
  'helper-4': {
    userId: 'helper-4',
    timeAvailable: 60,
    supportTypesAvailable: ['listening', 'perspective', 'practical_help'],
    formatPreference: 'video',
    bandwidthLevel: 'moderate',
    description: 'Versatile supporter. Can offer different forms of help depending on need.',
  },
  'helper-5': {
    userId: 'helper-5',
    timeAvailable: 120,
    supportTypesAvailable: ['accountability', 'practical_help', 'company'],
    formatPreference: 'in_person',
    bandwidthLevel: 'high',
    description: 'High capacity. Great for deeper, longer-term support initiatives.',
  },
};

export const mockSampleSupportRequests: SupportRequest[] = [
  {
    id: 'request-1',
    userId: 'user-1',
    energyLevel: 'low',
    emotionalState: 'overwhelmed',
    urgency: 'soon',
    supportType: 'listening',
    preferredFormat: 'text',
    bandwidthForExplanation: 'very_limited',
    additionalContext: 'Just finished a difficult week. Need someone to understand.',
    createdAt: new Date(),
    status: 'active',
  },
  {
    id: 'request-2',
    userId: 'user-1',
    energyLevel: 'medium',
    emotionalState: 'uncertain',
    urgency: 'whenever',
    supportType: 'perspective',
    preferredFormat: 'text',
    bandwidthForExplanation: 'moderate',
    additionalContext: 'Looking for different ways to think about a situation.',
    createdAt: new Date(),
    status: 'active',
  },
];
