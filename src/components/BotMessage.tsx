
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import TrixieAvatar from './TrixieAvatar';

type BotMessageProps = {
  children: ReactNode;
  delay?: number;
};

const BotMessage = ({ children, delay = 0 }: BotMessageProps) => {
  return (
    <motion.div 
      className="trixie-bubble"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
    >
      <TrixieAvatar size="sm" />
      <div className="bot-message">
        <div className="bg-mint/10 py-2 px-4 rounded-2xl rounded-bl-none border border-mint/20 text-gray-800">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default BotMessage;
