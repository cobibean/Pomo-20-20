import type { Phase } from '../types';

export const PHASES: Phase[] = ['focus', 'eye-break', 'rest'];

export const PHASE_DURATIONS: Record<Phase, number> = {
  'focus': 25 * 60,
  'eye-break': 20,
  'rest': 5 * 60,
};

export function getNextPhase(currentPhase: Phase): Phase {
  const currentIndex = PHASES.indexOf(currentPhase);
  const nextIndex = (currentIndex + 1) % PHASES.length;
  return PHASES[nextIndex];
}

