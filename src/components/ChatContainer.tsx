
import { ReactNode, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

type ChatContainerProps = {
  children: ReactNode;
};

const ChatContainer = ({ children }: ChatContainerProps) => {
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [children]);

  return (
    <motion.div 
      className="flex flex-col flex-1 overflow-y-auto p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
      <div ref={chatEndRef} />
    </motion.div>
  );
};

export default ChatContainer;
