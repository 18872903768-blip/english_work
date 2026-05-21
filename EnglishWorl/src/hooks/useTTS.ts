import { useCallback, useRef } from 'react';
import { useWorksheetStore } from '../store/worksheetStore';

export function useTTS() {
  const setIsReading = useWorksheetStore((s) => s.setIsReading);
  const setIsPaused = useWorksheetStore((s) => s.setIsPaused);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const currentWordIndexRef = useRef(-1);
  const wordsRef = useRef<string[]>([]);

  const getVoice = useCallback((): SpeechSynthesisVoice | null => {
    const voices = speechSynthesis.getVoices();
    return (
      voices.find((v) => v.lang === 'en-US' && v.name.includes('Microsoft')) ??
      voices.find((v) => v.lang === 'en-US') ??
      voices.find((v) => v.lang.startsWith('en')) ??
      null
    );
  }, []);

  const speakWord = useCallback((word: string) => {
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    const voice = getVoice();
    if (voice) utterance.voice = voice;
    speechSynthesis.speak(utterance);
  }, [getVoice]);

  const speakFullText = useCallback(
    (text: string, onWordChange?: (index: number) => void) => {
      speechSynthesis.cancel();
      const words = text.split(/\s+/).filter(Boolean);
      wordsRef.current = words;
      currentWordIndexRef.current = -1;

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.85;
      const voice = getVoice();
      if (voice) utterance.voice = voice;

      utterance.onboundary = (event) => {
        if (event.name === 'word') {
          const charIndex = event.charIndex;
          const textBefore = text.substring(0, charIndex);
          const wordCount = textBefore.split(/\s+/).filter(Boolean).length;
          currentWordIndexRef.current = wordCount;
          onWordChange?.(wordCount);
        }
      };

      utterance.onend = () => {
        setIsReading(false);
        setIsPaused(false);
        onWordChange?.(-1);
      };

      utterance.onerror = () => {
        setIsReading(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      speechSynthesis.speak(utterance);
      setIsReading(true);
      setIsPaused(false);
    },
    [getVoice, setIsReading, setIsPaused]
  );

  const pauseReading = useCallback(() => {
    speechSynthesis.pause();
    setIsPaused(true);
  }, [setIsPaused]);

  const resumeReading = useCallback(() => {
    speechSynthesis.resume();
    setIsPaused(false);
  }, [setIsPaused]);

  const stopReading = useCallback(() => {
    speechSynthesis.cancel();
    setIsReading(false);
    setIsPaused(false);
  }, [setIsReading, setIsPaused]);

  return { speakWord, speakFullText, pauseReading, resumeReading, stopReading };
}
