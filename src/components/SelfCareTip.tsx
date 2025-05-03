
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const selfCareTips = [
  {
    title: "Box Breathing",
    description: "Breathe in for 4 counts, hold for 4, exhale for 4, hold for 4. Repeat 5 times.",
    emoji: "🫁"
  },
  {
    title: "5-4-3-2-1 Grounding",
    description: "Name 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, and 1 you can taste.",
    emoji: "👀"
  },
  {
    title: "Self-Compassion Break",
    description: "Place your hand on your heart and say: 'This is a moment of suffering. Suffering is part of life. May I be kind to myself in this moment.'",
    emoji: "❤️"
  },
  {
    title: "Gratitude Moment",
    description: "Take a moment to name three things, no matter how small, that you're grateful for right now.",
    emoji: "🙏"
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "Tense and then release each muscle group in your body, starting from your toes and working up to your head.",
    emoji: "💪"
  }
];

type SelfCareTipProps = {
  onClose: () => void;
};

const SelfCareTip = ({ onClose }: SelfCareTipProps) => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const currentTip = selfCareTips[currentTipIndex];

  const getNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % selfCareTips.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Self-Care Moment</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        
        <motion.div
          key={currentTipIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{currentTip.emoji}</span>
            <h4 className="text-lg font-medium">{currentTip.title}</h4>
          </div>
          <p className="text-gray-700">{currentTip.description}</p>
        </motion.div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            onClick={getNextTip}
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white"
          >
            Another Tip <ArrowRight size={16} className="ml-1" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SelfCareTip;
