
import { motion } from 'framer-motion';

export type Outcome = 'success' | 'warning' | 'danger';

type OutcomeCardProps = {
  type: Outcome;
  title: string;
  emoji: string;
  description: string;
  explanation: string;
};

const OutcomeCard = ({ type, title, emoji, description, explanation }: OutcomeCardProps) => {
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
      
      <div className="bg-white/70 p-4 rounded-xl w-full mt-2">
        <h3 className="font-semibold text-sm mb-1">Why we said this 💭</h3>
        <p className="text-sm text-gray-700">{explanation}</p>
      </div>
    </motion.div>
  );
};

export default OutcomeCard;
