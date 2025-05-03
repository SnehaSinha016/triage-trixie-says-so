
import { motion } from 'framer-motion';
import { Shield } from 'lucide-react';

const AnonymousModeIndicator = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="flex items-center bg-gray-700 text-white px-3 py-1 rounded-full shadow-md text-xs"
    >
      <Shield size={12} className="mr-1" />
      Anonymous Mode 🤫
    </motion.div>
  );
};

export default AnonymousModeIndicator;
