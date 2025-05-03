
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';

type SelfCareToolboxProps = {
  onClose: () => void;
};

const SelfCareToolbox = ({ onClose }: SelfCareToolboxProps) => {
  const [breathCount, setBreathCount] = useState(0);
  const [breathingActive, setBreathingActive] = useState(false);
  const [journalText, setJournalText] = useState('');
  const [affirmationIndex, setAffirmationIndex] = useState(0);

  const startBreathing = () => {
    setBreathingActive(true);
    setBreathCount(0);
    
    // Animation cycle for 4-7-8 breathing
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setBreathCount(count % 19); // 4+7+8 = 19 total count
      if (count >= 38) { // Do two full cycles then stop
        clearInterval(interval);
        setBreathingActive(false);
      }
    }, 1000);
  };

  const getBreathingInstruction = () => {
    const count = breathCount % 19;
    if (count < 4) return "Breathe in...";
    if (count < 11) return "Hold...";
    return "Breathe out...";
  };

  const affirmations = [
    "I am worthy of care and attention. 💖",
    "My feelings are valid, whatever they may be. 🌈",
    "I can take one small step forward today. 👣",
    "My body is doing the best it can right now. 🌱",
    "It's okay to not be okay sometimes. 💭",
    "I am enough, exactly as I am. ✨",
    "Today, I choose self-compassion over criticism. 🫧",
    "Each breath brings me new peace. 🧘‍♀️",
    "I release what I cannot control. 🕊️",
    "My healing doesn't need to be perfect. 💗"
  ];

  const getNextAffirmation = () => {
    setAffirmationIndex((prev) => (prev + 1) % affirmations.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-purple-600">Self-Care Toolbox</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <Tabs defaultValue="breathing">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="breathing">🫁 Breathe</TabsTrigger>
            <TabsTrigger value="affirmations">💫 Affirm</TabsTrigger>
            <TabsTrigger value="journal">📝 Journal</TabsTrigger>
            <TabsTrigger value="grounding">🧠 Ground</TabsTrigger>
          </TabsList>

          <TabsContent value="breathing" className="space-y-4">
            <div className="text-center py-2">
              <h4 className="font-medium mb-2">4-7-8 Calming Breath</h4>
              <p className="text-sm text-gray-600 mb-4">
                Breathe in for 4, hold for 7, exhale for 8. This practice helps activate your parasympathetic nervous system.
              </p>

              <div className="relative w-32 h-32 mx-auto my-6">
                <motion.div 
                  className="absolute inset-0 bg-purple-100 rounded-full"
                  animate={{
                    scale: breathingActive ? 
                      breathCount % 19 < 4 ? [1, 1.5] : 
                      breathCount % 19 < 11 ? 1.5 : 
                      [1.5, 1] : 1
                  }}
                  transition={{ 
                    duration: breathingActive ? 
                      breathCount % 19 < 4 ? 4 : 
                      breathCount % 19 < 11 ? 7 : 8 : 0
                  }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center font-semibold text-purple-800">
                  {breathingActive ? getBreathingInstruction() : "Ready?"}
                </div>
              </div>

              <Button 
                onClick={startBreathing}
                disabled={breathingActive}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {breathingActive ? "Breathing..." : "Start Breathing"}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="affirmations">
            <div className="text-center py-6">
              <h4 className="font-medium mb-3">Daily Affirmation</h4>
              
              <motion.div
                key={affirmationIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gradient-to-r from-purple-50 to-blue-50 p-6 rounded-lg border border-purple-100 mb-6"
              >
                <p className="text-lg font-medium text-purple-800">
                  {affirmations[affirmationIndex]}
                </p>
              </motion.div>
              
              <Button
                onClick={getNextAffirmation}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                Another Affirmation <ArrowRight size={16} className="ml-1" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="journal">
            <div className="py-2">
              <h4 className="font-medium mb-2">Mindful Journal</h4>
              <p className="text-sm text-gray-600 mb-3">
                Writing down your thoughts can help create emotional clarity. No one else will see this—it's just for you.
              </p>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  How are you feeling right now?
                </label>
                <textarea 
                  className="w-full h-32 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="I'm feeling..."
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                ></textarea>
              </div>
              
              <div className="text-right">
                <Button
                  variant="outline"
                  onClick={() => setJournalText('')}
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  Clear
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="grounding">
            <div className="py-2">
              <h4 className="font-medium mb-2">5-4-3-2-1 Grounding Technique</h4>
              <p className="text-sm text-gray-600 mb-3">
                This simple exercise can help bring you back to the present when feeling overwhelmed or anxious.
              </p>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <h5 className="font-medium text-blue-700 flex items-center">
                    <span className="bg-blue-200 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-blue-800">5</span>
                    Things you can SEE
                  </h5>
                  <p className="text-sm text-gray-600 ml-8 mt-1">
                    Look around and name 5 things you can see right now.
                  </p>
                </div>
                
                <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                  <h5 className="font-medium text-green-700 flex items-center">
                    <span className="bg-green-200 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-green-800">4</span>
                    Things you can TOUCH
                  </h5>
                  <p className="text-sm text-gray-600 ml-8 mt-1">
                    Notice 4 things you can physically feel.
                  </p>
                </div>
                
                <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-100">
                  <h5 className="font-medium text-yellow-700 flex items-center">
                    <span className="bg-yellow-200 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-yellow-800">3</span>
                    Things you can HEAR
                  </h5>
                  <p className="text-sm text-gray-600 ml-8 mt-1">
                    Listen for 3 sounds around you.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-3 rounded-lg border border-orange-100">
                  <h5 className="font-medium text-orange-700 flex items-center">
                    <span className="bg-orange-200 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-orange-800">2</span>
                    Things you can SMELL
                  </h5>
                  <p className="text-sm text-gray-600 ml-8 mt-1">
                    Find 2 scents to focus on.
                  </p>
                </div>
                
                <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                  <h5 className="font-medium text-red-700 flex items-center">
                    <span className="bg-red-200 w-6 h-6 rounded-full flex items-center justify-center mr-2 text-red-800">1</span>
                    Thing you can TASTE
                  </h5>
                  <p className="text-sm text-gray-600 ml-8 mt-1">
                    Notice 1 taste in your mouth.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end mt-4">
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SelfCareToolbox;
