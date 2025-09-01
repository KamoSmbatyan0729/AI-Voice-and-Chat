import { createContext, useContext, useRef, useState, useCallback, useEffect } from 'react';
import { useSettings } from './SettingsContext';

const SpeechSynthesisContext = createContext();

export function SpeechSynthesisProvider({ children }) {
  const { voiceEnabled, language, speechRate, voiceType } = useSettings();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);
  const utteranceRef = useRef(null);

  // Load voices and update when they change
  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = useCallback(
    (text) => {
      
      if (!voiceEnabled || !isSupported || !text) return;
      window.speechSynthesis.cancel();

      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.lang = language;

      // Find preferred voice
      const preferred = voices.find((v) =>
        v.lang?.startsWith(language) &&
        (voiceType === 'female'
          ? v.name.toLowerCase().includes('female')
          : v.name.toLowerCase().includes('male'))
      );

      if (preferred) {
        utterance.voice = preferred;
      }

      utteranceRef.current = utterance;
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        utteranceRef.current = null;
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        utteranceRef.current = null;
      };

      window.speechSynthesis.speak(utterance);
    },
    [voiceEnabled, isSupported, speechRate, language, voiceType, voices]
  );

  const stopSpeaking = useCallback(() => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, []);

  return (
    <SpeechSynthesisContext.Provider value={{
      isSpeaking,
      isSupported,
      voices,
      speak,
      stopSpeaking
    }}>
      {children}
    </SpeechSynthesisContext.Provider>
  );
}

export function useSpeechSynthesisContext() {
  return useContext(SpeechSynthesisContext);
}