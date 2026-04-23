import { SupportRequest, CapacityProfile, Match, SupportCard } from './types';
import { mockCapacityProfiles, mockUsers } from './mockData';

/**
 * Simple rule-based matching algorithm
 * Scores matches based on:
 * - Support type match (exact match = 100)
 * - Format compatibility (exact match = 100, similar = 50)
 * - Urgency/capacity fit (urgent + high capacity = higher score)
 * - Available time (longer available time = slight bonus)
 */
function calculateMatchScore(
  request: SupportRequest,
  capacityProfile: CapacityProfile
): number {
  let score = 0;

  // Support type match (40% weight)
  const supportTypeMatch = capacityProfile.supportTypesAvailable.includes(request.supportType);
  score += supportTypeMatch ? 40 : 0;

  // Format compatibility (30% weight)
  const formatMatch = capacityProfile.formatPreference === request.preferredFormat;
  score += formatMatch ? 30 : 15; // Partial credit for different but compatible formats

  // Urgency/bandwidth fit (20% weight)
  const urgencyBandwidthMatch =
    (request.urgency === 'immediate' && capacityProfile.bandwidthLevel === 'high') ||
    (request.urgency === 'soon' && capacityProfile.bandwidthLevel !== 'very_limited') ||
    request.urgency === 'whenever';
  score += urgencyBandwidthMatch ? 20 : 10;

  // Time availability bonus (10% weight)
  if (capacityProfile.timeAvailable >= 60) {
    score += 10;
  } else if (capacityProfile.timeAvailable >= 30) {
    score += 5;
  }

  return Math.min(100, score); // Cap at 100
}

export function findMatches(
  request: SupportRequest,
  limit: number = 3
): Match[] {
  const matchScores: Array<{
    userId: string;
    score: number;
    profile: CapacityProfile;
  }> = [];

  // Score all capacity profiles
  Object.entries(mockCapacityProfiles).forEach(([userId, profile]) => {
    const score = calculateMatchScore(request, profile);
    matchScores.push({ userId, score, profile });
  });

  // Sort by score descending and take top matches
  const topMatches = matchScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .filter((m) => m.score > 0); // Only return meaningful matches

  // Convert to Match objects
  return topMatches.map((m, index) => ({
    id: `match-${request.id}-${index}`,
    supportRequestId: request.id,
    capacityUserId: m.userId,
    supportCard: {
      id: `card-${request.id}-${index}`,
      supportRequestId: request.id,
      title: `Someone cares and has capacity to help`,
      description: `A caring person with ${m.profile.timeAvailable} minutes available can offer ${request.supportType.replace('_', ' ')} support via ${request.preferredFormat.replace('_', ' ')}.`,
      callToAction: 'Connect with this supporter',
    },
    matchScore: m.score,
    createdAt: new Date(),
  }));
}

export function getMatcherProfileInfo(userId: string): CapacityProfile | null {
  return mockCapacityProfiles[userId] || null;
}

export function getHelperName(userId: string): string {
  const user = mockUsers.find((u) => u.id === userId);
  return user?.name || 'A kind stranger';
}
