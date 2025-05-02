
import { motion } from 'framer-motion';

export type Symptom = {
  id: string;
  name: string;
  emoji: string;
  description: string;
};

type SymptomCardProps = {
  symptom: Symptom;
  onClick: (symptom: Symptom) => void;
  index: number;
};

const SymptomCard = ({ symptom, onClick, index }: SymptomCardProps) => {
  return (
    <motion.div
      className="triage-card card-hover"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={() => onClick(symptom)}
    >
      <div className="flex flex-col items-center text-center">
        <span className="text-4xl emoji-bounce mb-2">{symptom.emoji}</span>
        <h3 className="font-bold text-lg mb-1">{symptom.name}</h3>
        <p className="text-sm text-gray-500">{symptom.description}</p>
      </div>
    </motion.div>
  );
};

export default SymptomCard;
