import { createContext, useEffect,  useContext, useMemo, useState } from 'react';

// Default settings
const defaultSettings = {
  voiceEnabled: true,
  micEnabled: true,
  speechRate: 1.0, // 0.5 - 2.0
  language: "en-US", // BCP-47 language tag
  voiceType: "male", // 'female' or 'male'
};

// Create context
const SettingsContext = createContext({
  ...defaultSettings,
  setSettings: () => { }, // placeholder
});

export function SettingsProvider({ children }) {
 

  const [settings, setSettingsState] = useState(() => {
    try {
      const saved = localStorage.getItem('app_settings');
      return saved ? { ...defaultSettings, ...JSON.parse(saved) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

   useEffect(() => {
    console.log('Settings changed:', settings);
  }, [settings]);

  const setSettings = (next) => {
    setSettingsState((prev) => {
      const merged = { ...prev, ...next };
      try {
        localStorage.setItem('app_settings', JSON.stringify(merged));
      } catch {
        // Ignore localStorage errors
      }
      return merged;
    });
  };

  const value = useMemo(() => ({ ...settings, setSettings }), [settings]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

// Custom hook
export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
