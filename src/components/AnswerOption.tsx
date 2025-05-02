
import { motion } from 'framer-motion';

export type Answer = {
  id: string;
  text: string;
  emoji: string;
  value: string | number | boolean;
};

type AnswerOptionProps = {
  answer: Answer;
  onSelect: (value: string | number | boolean) => void;
  index: number;
  isSelected?: boolean;
};

const AnswerOption = ({ answer, onSelect, index, isSelected = false }: AnswerOptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={`answer-option ${isSelected ? 'border-mint bg-mint/10' : ''}`}
      onClick={() => onSelect(answer.value)}
    >
      <span className="text-xl emoji-bounce">{answer.emoji}</span>
      <span>{answer.text}</span>
    </motion.div>
  );
};

export default AnswerOption;
