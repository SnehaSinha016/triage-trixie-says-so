
import { motion } from 'framer-motion';

const PrivacyNote = () => {
  return (
    <motion.div 
      className="text-xs text-center text-gray-500 mt-4 mb-2 px-4 py-2 bg-gray-50 rounded-lg"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <p className="flex items-center justify-center gap-1">
        <span>We don't spill your beans</span>
        <span className="emoji-bounce">🤫</span>
        <span>Your info stays private!</span>
      </p>
    </motion.div>
  );
};

export default PrivacyNote;
