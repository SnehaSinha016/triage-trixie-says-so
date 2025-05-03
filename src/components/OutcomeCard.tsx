
import { motion } from 'framer-motion';

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
  isMentalHealth = false
}: OutcomeCardProps) => {
  const typeClasses = {
    success: 'outcome-success',
    warning: 'outcome-warning',
    danger: 'outcome-danger'
  };

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

      {isMentalHealth && (type === 'warning' || type === 'danger') && (
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
        </div>
      )}
    </motion.div>
  );
};

export default OutcomeCard;
