import { useCallback, useEffect, useRef, useState } from 'react';
import { useSettings } from '../context/SettingsContext';

export function useSpeechRecognition() {
  const { micEnabled, language } = useSettings();
  const [isSupported, setIsSupported] = useState(false);
  const [isListening, setListening] = useState(false);
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

      rec.onstart = () =>{
        console.log('Speech recognition started');
        setListening(true);
      }
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      recognitionRef.current = rec;
    }
  }, [language]);

  const start = useCallback(() => {
    if (!isSupported || !micEnabled) return;
    setTranscript('');
    try {
      console.log('Starting recognition');
      recognitionRef.current?.start();
    } catch {
      // Ignore recognition start errors
    }
  }, [isSupported, micEnabled]);

  const stop = useCallback(() => {
    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore recognition stop errors
    }
  }, []);

  return { isSupported, isListening, transcript, start, stop };
}
