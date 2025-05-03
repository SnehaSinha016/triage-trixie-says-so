
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

type CrisisResourcesProps = {
  onClose: () => void;
};

const CrisisResources = ({ onClose }: CrisisResourcesProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Talk to Someone</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>
        
        <p className="text-gray-700 mb-4">
          Reaching out takes courage. These resources are available 24/7 and staffed by compassionate people who care.
        </p>
        
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-blue-50">
            <h4 className="font-bold flex items-center gap-2">
              <span className="text-xl">📞</span> 988 Suicide & Crisis Lifeline
            </h4>
            <p className="text-gray-600 text-sm mt-1">Call or text 988, or chat at 988lifeline.org</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-purple-50">
            <h4 className="font-bold flex items-center gap-2">
              <span className="text-xl">💬</span> Crisis Text Line
            </h4>
            <p className="text-gray-600 text-sm mt-1">Text HOME to 741741</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-green-50">
            <h4 className="font-bold flex items-center gap-2">
              <span className="text-xl">🏳️‍🌈</span> Trevor Project (LGBTQ+)
            </h4>
            <p className="text-gray-600 text-sm mt-1">Call 1-866-488-7386 or text START to 678678</p>
          </div>
          
          <div className="border rounded-lg p-4 bg-amber-50">
            <h4 className="font-bold flex items-center gap-2">
              <span className="text-xl">🌍</span> International Association for Suicide Prevention
            </h4>
            <p className="text-gray-600 text-sm mt-1">Find resources in your country at iasp.info/resources</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-4">Remember: You matter. This moment will pass. You are not alone.</p>
          <Button 
            onClick={onClose}
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white"
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CrisisResources;
