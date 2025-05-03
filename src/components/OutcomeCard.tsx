
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Users, Book } from 'lucide-react';

export type Outcome = 'success' | 'warning' | 'danger';

type OutcomeCardProps = {
  type: Outcome;
  title: string;
  emoji: string;
  description: string;
  explanation: string;
  condition?: string;
  compassionateWord?: string;
  onSelfCare?: () => void;
  onTalkToSomeone?: () => void;
  onToolbox?: () => void;
  onMoodJournal?: () => void;
  isMentalHealth?: boolean;
};

const OutcomeCard = ({ 
  type, 
  title, 
  emoji, 
  description, 
  explanation, 
  condition, 
  compassionateWord, 
  onSelfCare,
  onTalkToSomeone,
  onToolbox,
  onMoodJournal,
  isMentalHealth = false
}: OutcomeCardProps) => {
  const typeClasses = {
    success: 'outcome-success',
    warning: 'outcome-warning',
    danger: 'outcome-danger'
  };

  const [showLearnMore, setShowLearnMore] = useState(false);
  
  const toggleLearnMore = () => {
    setShowLearnMore(prev => !prev);
  };

  // Information about common conditions for the Learn More feature
  const getConditionInfo = (conditionName?: string) => {
    if (!conditionName) return null;
    
    const conditions: Record<string, { description: string, signs: string[], whenToSeek: string }> = {
      "Possible heart-related condition": {
        description: "Heart-related conditions include various issues that affect your heart's function. These can range from mild to severe.",
        signs: ["Chest pain or pressure", "Shortness of breath", "Fatigue", "Irregular heartbeat"],
        whenToSeek: "Seek immediate help if you experience severe chest pain, especially with shortness of breath, nausea, or pain radiating to your arm, jaw or back."
      },
      "Likely muscle strain or mild indigestion": {
        description: "Muscle strain in the chest area or mild indigestion are common and usually not serious conditions.",
        signs: ["Localized pain that worsens with movement", "Discomfort after eating", "Sour taste in mouth"],
        whenToSeek: "If pain is severe, persistent, or accompanied by other symptoms like fever, seek medical advice."
      },
      "Possible severe depression or crisis": {
        description: "Depression is a mood disorder causing persistent feelings of sadness and loss of interest that can interfere with daily activities.",
        signs: ["Persistent sad or empty mood", "Loss of interest in activities", "Changes in sleep patterns", "Thoughts of self-harm"],
        whenToSeek: "If you're having thoughts of harming yourself, call a crisis hotline or go to the nearest emergency room immediately."
      },
      "Possible anxiety or mild depression": {
        description: "Anxiety and mild depression are common mental health conditions that can affect your mood, thoughts, and physical health.",
        signs: ["Persistent worry", "Feeling on edge", "Sleep disturbances", "Low mood"],
        whenToSeek: "If symptoms interfere with daily life for more than two weeks, consider seeking professional help."
      },
      "Normal life stressors": {
        description: "Everyone experiences stress from time to time as a natural response to life's challenges.",
        signs: ["Temporary anxiety", "Occasional sleep issues", "Short periods of low mood"],
        whenToSeek: "If stress becomes overwhelming or persists for weeks, consider seeking support."
      }
    };
    
    // Return info for the specific condition or a generic response
    return conditions[conditionName] || {
      description: "This condition may require medical attention to properly diagnose and treat.",
      signs: ["Various symptoms may occur", "Consult with a healthcare provider for specific guidance"],
      whenToSeek: "If symptoms worsen or persist, contact a healthcare professional."
    };
  };
  
  const conditionInfo = getConditionInfo(condition);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", bounce: 0.4 }}
      className={`outcome-card ${typeClasses[type]}`}
    >
      <span className="text-5xl mb-4 animate-bounce-in">{emoji}</span>
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-4">{description}</p>
      
      {condition && (
        <div className="bg-white/60 p-3 rounded-xl w-full mt-1 mb-3">
          <h3 className="font-semibold text-sm">Might be: {condition} 🩺</h3>
          <p className="text-xs text-gray-600 mt-1">We're just a bot, not a doc!</p>
          
          {/* Learn More button */}
          <button 
            onClick={toggleLearnMore}
            className="text-xs text-blue-600 hover:text-blue-800 mt-2 flex items-center"
          >
            <Info size={12} className="mr-1" />
            {showLearnMore ? "Show less" : "Learn more"}
          </button>
          
          {/* Learn More content */}
          {showLearnMore && conditionInfo && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-3 text-xs bg-white/80 p-3 rounded-lg"
            >
              <p className="font-medium mb-2">{conditionInfo.description}</p>
              
              <p className="font-medium mt-2">Common signs:</p>
              <ul className="list-disc ml-4 mb-2">
                {conditionInfo.signs.map((sign, index) => (
                  <li key={index}>{sign}</li>
                ))}
              </ul>
              
              <div className="bg-yellow-50 p-2 rounded mt-2 border border-yellow-200">
                <p className="font-medium text-yellow-800">When to seek help:</p>
                <p className="text-yellow-800">{conditionInfo.whenToSeek}</p>
              </div>
            </motion.div>
          )}
        </div>
      )}
      
      <div className="bg-white/70 p-4 rounded-xl w-full mt-2">
        <h3 className="font-semibold text-sm mb-1">Why we said this 💭</h3>
        <p className="text-sm text-gray-700">{explanation}</p>
      </div>
      
      {compassionateWord && (type === 'warning' || type === 'danger') && (
        <motion.div 
          className="bg-gradient-to-r from-amber-50 to-yellow-100 p-4 rounded-xl w-full mt-4 border border-amber-200"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-medium text-amber-800">{compassionateWord}</p>
        </motion.div>
      )}

      {(isMentalHealth || type === 'warning' || type === 'danger') && (
        <div className="flex flex-col gap-2 mt-4 w-full">
          {onTalkToSomeone && (
            <button 
              onClick={onTalkToSomeone}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">📞</span> Talk to Someone
            </button>
          )}
          
          {onSelfCare && (
            <button 
              onClick={onSelfCare}
              className="bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">🧘</span> Try a Self-Care Tip
            </button>
          )}
          
          {onToolbox && (
            <button 
              onClick={onToolbox}
              className="bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">🧰</span> Open Self-Care Toolbox
            </button>
          )}
          
          {onMoodJournal && (
            <button 
              onClick={onMoodJournal}
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
            >
              <span className="text-xl">📓</span> Track Your Mood
            </button>
          )}
          
          {/* Peer Support Community button */}
          <button 
            onClick={() => alert("Peer Support Community coming soon!")}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Users size={18} className="mr-1" /> Connect with Peers
          </button>
          
          {/* Health Resources button */}
          <button 
            onClick={() => alert("Local Health Resources coming soon!")}
            className="bg-gradient-to-r from-amber-500 to-amber-600 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
          >
            <Book size={18} className="mr-1" /> Find Local Resources
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default OutcomeCard;
