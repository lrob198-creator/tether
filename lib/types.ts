// Core domain types for Tether

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  capacityProfile?: CapacityProfile;
}

export type EnergyLevel = 'low' | 'medium' | 'high';
export type EmotionalState = 'overwhelmed' | 'anxious' | 'sad' | 'disconnected' | 'uncertain';
export type Urgency = 'immediate' | 'soon' | 'whenever';
export type SupportType = 'listening' | 'practical_help' | 'perspective' | 'company' | 'accountability';
export type PreferredFormat = 'text' | 'voice' | 'video' | 'in_person';
export type BandwidthLevel = 'very_limited' | 'somewhat_limited' | 'moderate' | 'high';

export interface SupportRequest {
  id: string;
  userId: string;
  energyLevel: EnergyLevel;
  emotionalState: EmotionalState;
  urgency: Urgency;
  supportType: SupportType;
  preferredFormat: PreferredFormat;
  bandwidthForExplanation: BandwidthLevel;
  additionalContext?: string;
  createdAt: Date;
  status: 'active' | 'matched' | 'completed';
}

export interface SupportCard {
  id: string;
  supportRequestId: string;
  title: string;
  description: string;
  callToAction: string;
}

export interface CapacityProfile {
  userId: string;
  timeAvailable: number; // minutes
  supportTypesAvailable: SupportType[];
  formatPreference: PreferredFormat;
  bandwidthLevel: BandwidthLevel;
  description?: string;
}

export interface Match {
  id: string;
  supportRequestId: string;
  capacityUserId: string;
  supportCard: SupportCard;
  matchScore: number;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'match_found' | 'support_requested' | 'profile_completed' | 'profile_reminder';
  title: string;
  message: string;
  relatedId?: string; // match id, request id, etc.
  isRead: boolean;
  createdAt: Date;
}

export interface SessionState {
  currentUser: User | null;
  isAuthenticated: boolean;
  currentSupportRequest?: Partial<SupportRequest>;
}
