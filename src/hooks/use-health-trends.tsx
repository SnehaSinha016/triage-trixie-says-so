
import { useState, useEffect } from 'react';

type SymptomEntry = {
  timestamp: string;
  symptomId: string;
  outcome: 'success' | 'warning' | 'danger';
};

type MoodEntry = {
  timestamp: string;
  mood: string;
  anxiety: string;
  sleep: string;
  outcome: 'success' | 'warning' | 'danger';
};

export function useHealthTrends() {
  const [symptomHistory, setSymptomHistory] = useState<SymptomEntry[]>([]);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load history from localStorage on mount
  useEffect(() => {
    const savedSymptoms = localStorage.getItem('symptom-history');
    const savedMoods = localStorage.getItem('mood-history');
    
    if (savedSymptoms) {
      try {
        setSymptomHistory(JSON.parse(savedSymptoms));
      } catch (e) {
        console.error('Failed to parse saved symptom history', e);
      }
    }
    
    if (savedMoods) {
      try {
        setMoodHistory(JSON.parse(savedMoods));
      } catch (e) {
        console.error('Failed to parse saved mood history', e);
      }
    }
    
    setIsLoaded(true);
  }, []);
  
  // Add a new symptom entry
  const addSymptomEntry = (entry: SymptomEntry) => {
    const newHistory = [...symptomHistory, entry];
    setSymptomHistory(newHistory);
    localStorage.setItem('symptom-history', JSON.stringify(newHistory));
  };
  
  // Add a new mood entry
  const addMoodEntry = (entry: MoodEntry) => {
    const newHistory = [...moodHistory, entry];
    setMoodHistory(newHistory);
    localStorage.setItem('mood-history', JSON.stringify(newHistory));
  };
  
  // Clear all history
  const clearHistory = () => {
    setSymptomHistory([]);
    setMoodHistory([]);
    localStorage.removeItem('symptom-history');
    localStorage.removeItem('mood-history');
  };
  
  // Analyze trends
  const analyzeSymptomTrends = () => {
    if (symptomHistory.length < 2) return null;
    
    // Group by symptom
    const groupedSymptoms: Record<string, SymptomEntry[]> = {};
    symptomHistory.forEach(entry => {
      if (!groupedSymptoms[entry.symptomId]) {
        groupedSymptoms[entry.symptomId] = [];
      }
      groupedSymptoms[entry.symptomId].push(entry);
    });
    
    // Look for patterns
    const trends = Object.entries(groupedSymptoms)
      .filter(([_, entries]) => entries.length >= 2)
      .map(([symptomId, entries]) => {
        const frequency = entries.length;
        const recentOutcomes = entries
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
          .slice(0, 3)
          .map(e => e.outcome);
        
        const improving = recentOutcomes[0] === 'success' && 
          (recentOutcomes[1] === 'warning' || recentOutcomes[1] === 'danger');
          
        const worsening = recentOutcomes[0] === 'danger' && 
          (recentOutcomes[1] === 'warning' || recentOutcomes[1] === 'success');
          
        const persistent = recentOutcomes.every(o => o === recentOutcomes[0]);
        
        return {
          symptomId,
          frequency,
          improving,
          worsening,
          persistent,
          status: improving ? 'improving' : worsening ? 'worsening' : persistent ? 'persistent' : 'fluctuating'
        };
      });
      
    return trends;
  };
  
  return { 
    symptomHistory, 
    moodHistory, 
    addSymptomEntry, 
    addMoodEntry, 
    clearHistory,
    analyzeSymptomTrends,
    isLoaded
  };
}
