import { SupportRequest, SupportCard } from './types';

/**
 * Template-based support card generator
 * Creates elegant, dignity-preserving wording based on support request details
 */

const emotionalStateContext: Record<string, string> = {
  overwhelmed: 'You are carrying something heavy right now.',
  anxious: 'Your mind is spinning, and that makes sense.',
  sad: 'Something hurts, and you deserve to not carry that alone.',
  disconnected: 'You feel far from yourself or others, and that matters.',
  uncertain: 'You are in the fog, trying to find your way forward.',
};

const supportTypeLanguage: Record<string, string> = {
  listening: 'someone who will truly listen to you',
  perspective: 'a different way of seeing what you are facing',
  practical_help: 'help with the concrete things that are difficult',
  company: 'genuine presence—someone to just be there with you',
  accountability: 'someone to help you follow through on what matters to you',
};

function titleFromState(state: string, urgency: string): string {
  const urgencyAdverb = urgency === 'immediate' ? 'right now' : 'soon';
  const baseState = emotionalStateContext[state] || 'You need support.';

  return baseState;
}

function generateCardDescription(request: SupportRequest): string {
  const emotionalContext = emotionalStateContext[request.emotionalState] || 'You need support.';
  const supportLanguage = supportTypeLanguage[request.supportType] || 'caring human support';
  const energyNote =
    request.energyLevel === 'low'
      ? 'You do not have much left to give right now, and that is okay.'
      : 'You have some energy, and it matters where you direct it.';

  const formatText = request.preferredFormat.replace('_', ' ');

  return `${emotionalContext} What might help is ${supportLanguage} through ${formatText}. ${energyNote} Someone nearby has both the capacity and the genuine desire to meet you here. This is not about solving everything. It is about not being alone with this.`;
}

export function generateSupportCard(request: SupportRequest): Omit<SupportCard, 'id' | 'supportRequestId'> {
  const title = titleFromState(request.emotionalState, request.urgency);
  const description = generateCardDescription(request);

  return {
    title,
    description,
    callToAction: 'Find someone to support me',
  };
}

export function generateCardVariation(
  request: SupportRequest,
  variationIndex: number
): Omit<SupportCard, 'id' | 'supportRequestId'> {
  const variations: Array<Omit<SupportCard, 'id' | 'supportRequestId'>> = [
    generateSupportCard(request),
    {
      title: 'You are worthy of real human support.',
      description: `What you are feeling—${request.emotionalState.replace('_', ' ')}—is real and valid. Someone with capacity and care is ready to offer ${supportTypeLanguage[request.supportType] || 'help'} exactly the way you need it. Small moments of connection can matter more than grand solutions.`,
      callToAction: 'Connect with a supporter now',
    },
    {
      title: 'You do not have to figure this out alone.',
      description: `The path forward is not always clear when you are ${request.emotionalState.replace('_', ' ')}. That is when ${supportTypeLanguage[request.supportType] || 'another person'} can make the real difference. Someone is here. Someone wants to help. That someone could be waiting right now.`,
      callToAction: 'Discover your match',
    },
  ];

  return variations[variationIndex % variations.length];
}
