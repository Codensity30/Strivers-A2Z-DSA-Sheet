import { useState, useEffect, useRef, useCallback } from 'react';

export function useVisualizer(steps = [], options = {}) {
  const { initialSpeed = 1000, loop = false } = options;

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(initialSpeed);

  const timerRef = useRef(null);
  const stepsCount = steps.length;

  // Safe bounds check if steps array changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsPlaying(false);
  }, [steps]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const play = useCallback(() => {
    if (stepsCount <= 1) return;
    if (currentStepIndex >= stepsCount - 1) {
      // If at end, start from 0
      setCurrentStepIndex(0);
    }
    setIsPlaying(true);
  }, [currentStepIndex, stepsCount]);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, play, pause]);

  const stepForward = useCallback(() => {
    setCurrentStepIndex(prev => {
      if (prev < stepsCount - 1) {
        return prev + 1;
      }
      pause();
      return prev;
    });
  }, [stepsCount, pause]);

  const stepBack = useCallback(() => {
    setCurrentStepIndex(prev => Math.max(0, prev - 1));
  }, []);

  const reset = useCallback(() => {
    pause();
    setCurrentStepIndex(0);
  }, [pause]);

  const jumpTo = useCallback((index) => {
    const target = Math.max(0, Math.min(stepsCount - 1, index));
    setCurrentStepIndex(target);
  }, [stepsCount]);

  // Interval timer effect
  useEffect(() => {
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setCurrentStepIndex(prev => {
        if (prev < stepsCount - 1) {
          return prev + 1;
        } else if (loop) {
          return 0;
        } else {
          pause();
          return prev;
        }
      });
    }, speed);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, speed, stepsCount, loop, pause]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing into input or textarea
      const tag = document.activeElement?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        stepForward();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        stepBack();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        reset();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [togglePlay, stepForward, stepBack, reset]);

  const currentStep = steps[currentStepIndex] || null;
  const progressPercent = stepsCount > 1 ? (currentStepIndex / (stepsCount - 1)) * 100 : 0;

  return {
    currentStepIndex,
    currentStep,
    totalSteps: stepsCount,
    isPlaying,
    speed,
    progressPercent,
    isAtStart: currentStepIndex === 0,
    isAtEnd: currentStepIndex >= stepsCount - 1,
    play,
    pause,
    togglePlay,
    stepForward,
    stepBack,
    reset,
    jumpTo,
    setSpeed
  };
}
