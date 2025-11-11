import { useState, useEffect, useRef } from 'react';
import type { Phase } from '../types';
import { PHASE_DURATIONS, getNextPhase } from '../config/timerConfig';

export function usePomodoro2020Timer() {
  const [currentPhase, setCurrentPhase] = useState<Phase>('focus');
  const [remainingSeconds, setRemainingSeconds] = useState(PHASE_DURATIONS['focus']);
  const [isRunning, setIsRunning] = useState(false);
  const [cycleCount, setCycleCount] = useState(0);
  const [totalSecondsForCurrentPhase, setTotalSecondsForCurrentPhase] = useState(
    PHASE_DURATIONS['focus']
  );

  const targetTimestampRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const currentPhaseRef = useRef<Phase>(currentPhase);
  const isRunningRef = useRef<boolean>(isRunning);

  // Keep refs in sync
  useEffect(() => {
    currentPhaseRef.current = currentPhase;
  }, [currentPhase]);

  useEffect(() => {
    isRunningRef.current = isRunning;
  }, [isRunning]);

  // Transition to next phase
  const transitionToNextPhase = () => {
    const phase = currentPhaseRef.current;
    const nextPhase = getNextPhase(phase);
    
    // Increment cycle count when completing rest phase
    if (phase === 'rest') {
      setCycleCount((prev) => prev + 1);
    }

    setCurrentPhase(nextPhase);
    const newDuration = PHASE_DURATIONS[nextPhase];
    setRemainingSeconds(newDuration);
    setTotalSecondsForCurrentPhase(newDuration);

    // If timer is running, set new target timestamp
    if (isRunningRef.current) {
      targetTimestampRef.current = Date.now() + newDuration * 1000;
    }
  };

  // Start the timer
  const start = () => {
    setIsRunning(true);
    targetTimestampRef.current = Date.now() + remainingSeconds * 1000;
  };

  // Pause the timer
  const pause = () => {
    setIsRunning(false);
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Resume the timer
  const resume = () => {
    setIsRunning(true);
    targetTimestampRef.current = Date.now() + remainingSeconds * 1000;
  };

  // Skip current phase
  const skipPhase = () => {
    const wasRunning = isRunning;
    const nextPhase = getNextPhase(currentPhase);
    
    // Increment cycle count when skipping rest phase
    if (currentPhase === 'rest') {
      setCycleCount((prev) => prev + 1);
    }

    setCurrentPhase(nextPhase);
    const newDuration = PHASE_DURATIONS[nextPhase];
    setRemainingSeconds(newDuration);
    setTotalSecondsForCurrentPhase(newDuration);

    if (wasRunning) {
      targetTimestampRef.current = Date.now() + newDuration * 1000;
    } else {
      targetTimestampRef.current = null;
    }
  };

  // Reset to initial state
  const reset = () => {
    setIsRunning(false);
    setCurrentPhase('focus');
    setRemainingSeconds(PHASE_DURATIONS['focus']);
    setTotalSecondsForCurrentPhase(PHASE_DURATIONS['focus']);
    setCycleCount(0);
    targetTimestampRef.current = null;
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Timer tick effect
  useEffect(() => {
    if (!isRunning) {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Set initial target timestamp if not set
    if (targetTimestampRef.current === null) {
      targetTimestampRef.current = Date.now() + remainingSeconds * 1000;
    }

    // Create interval
    intervalRef.current = window.setInterval(() => {
      if (targetTimestampRef.current === null) return;

      const now = Date.now();
      const remaining = Math.max(0, Math.round((targetTimestampRef.current - now) / 1000));
      
      setRemainingSeconds(remaining);

      // Phase transition when timer reaches 0
      if (remaining <= 0) {
        transitionToNextPhase();
      }
    }, 1000);

    // Cleanup
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isRunning, currentPhase]);

  // Calculate progress (0 to 1)
  const progress = totalSecondsForCurrentPhase > 0
    ? 1 - remainingSeconds / totalSecondsForCurrentPhase
    : 0;

  return {
    currentPhase,
    remainingSeconds,
    totalSecondsForCurrentPhase,
    isRunning,
    cycleCount,
    progress,
    start,
    pause,
    resume,
    skipPhase,
    reset,
  };
}

