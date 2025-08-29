import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

export function useSpeechRecognition() {
  const { micEnabled, language } = useSettings();
  const [isSupported, setIsSupported] = useState(false);
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef(null);

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) {
      setIsSupported(true);
      const rec = new SR();
      rec.lang = language;
      rec.continuous = false;
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onresult = (event) => {
        const text = event.results?.[0]?.[0]?.transcript || '';
        setTranscript(text);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recognitionRef.current = rec;
    }
  }, [language]);

  const startListening = useCallback(() => {
    if (!isSupported || !micEnabled) return;
    setTranscript('');
    try {
      recognitionRef.current?.start();
      setListening(true);
    } catch {
      // Ignore recognition start errors
    }
  }, [isSupported, micEnabled]);

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore recognition stop errors
    }
  }, []);

  return { isSupported, listening, transcript, startListening, stopListening, setListening };
}

export function useSpeechSynthesis() {
  const { voiceEnabled, language, speechRate, voiceType } = useSettings();
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    setIsSupported('speechSynthesis' in window);
    if (!('speechSynthesis' in window)) return;

    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, []);

  const speak = useCallback(
    (text) => {
      if (!voiceEnabled || !isSupported) return;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = speechRate;
      utterance.lang = language;

      const preferred = voices.find((v) =>
        v.lang?.startsWith(language) &&
        (voiceType === 'female'
          ? v.name.toLowerCase().includes('female')
          : v.name.toLowerCase().includes('male'))
      );
      if (preferred) utterance.voice = preferred;

      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    },
    [voiceEnabled, isSupported, speechRate, language, voiceType, voices]
  );

  return { isSupported, voices, speak };
}
