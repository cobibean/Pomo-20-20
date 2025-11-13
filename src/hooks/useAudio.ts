import { useCallback, useRef, useEffect } from 'react';

export function useAudio() {
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());
  const isInitializedRef = useRef(false);

  // Initialize audio context (needs user interaction)
  const initAudio = useCallback(async () => {
    if (isInitializedRef.current) return;

    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }

      // Resume context if suspended (required by browsers)
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }

      // Preload sounds - map the user's specific files
      const sounds = [
        { name: 'focus-end', file: 'lofi-ender.wav' },
        { name: 'eye-break-end', file: 'GIO_HEAL_gong_short.wav' },
        { name: 'rest-end', file: 'BOS_BC_Gong_Long_Shot_Black_Cm.wav' }
      ];

      for (const sound of sounds) {
        try {
          const response = await fetch(`/sounds/${sound.file}`);
          const arrayBuffer = await response.arrayBuffer();
          const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
          audioBuffersRef.current.set(sound.name, audioBuffer);
        } catch (error) {
          console.warn(`Failed to load sound: ${sound.file}`, error);
        }
      }

      isInitializedRef.current = true;
    } catch (error) {
      console.warn('Audio initialization failed:', error);
    }
  }, []);

  // Play sound function
  const playSound = useCallback(async (soundName: string) => {
    if (!audioContextRef.current || !isInitializedRef.current) {
      console.log(`Audio not initialized yet, cannot play: ${soundName}`);
      return;
    }

    const buffer = audioBuffersRef.current.get(soundName);
    if (!buffer) {
      console.warn(`Sound not found: ${soundName}. Make sure audio files are in /public/sounds/`);
      return;
    }

    try {
      const source = audioContextRef.current.createBufferSource();
      source.buffer = buffer;
      source.connect(audioContextRef.current.destination);
      source.start(0);
      console.log(`Playing sound: ${soundName}`);
    } catch (error) {
      console.warn(`Failed to play sound: ${soundName}`, error);
    }
  }, []);

  // Initialize on first user interaction
  useEffect(() => {
    const handleInteraction = () => {
      initAudio();
      // Remove listeners after first interaction
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [initAudio]);

  return { playSound, initAudio, isInitialized: isInitializedRef.current };
}
