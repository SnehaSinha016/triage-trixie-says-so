
import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type UserMessageProps = {
  children: ReactNode;
};

const UserMessage = ({ children }: UserMessageProps) => {
  return (
    <motion.div 
      className="user-message"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="bg-white py-2 px-4 rounded-2xl rounded-br-none border border-gray-200 shadow-sm text-gray-800">
        {children}
      </div>
    </motion.div>
  );
};

export default UserMessage;
