
import { useState, useEffect } from 'react';
import { UserPreferences } from '../components/PersonalizationModal';

const defaultPreferences: UserPreferences = {
  avatar: 'bot',
  theme: 'default',
  tone: 'gentle',
  anonymous: false
};

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedPrefs = localStorage.getItem('triage-preferences');
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs));
      } catch (e) {
        console.error('Failed to parse saved preferences', e);
      }
    }
    setIsLoaded(true);
  }, []);
  
  // Save preferences to localStorage whenever they change
  const savePreferences = (newPreferences: UserPreferences) => {
    setPreferences(newPreferences);
    localStorage.setItem('triage-preferences', JSON.stringify(newPreferences));
  };
  
  return { preferences, savePreferences, isLoaded };
}
