
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Phone, Heart, MessageSquare, ArrowRight } from 'lucide-react';

type CrisisResourcesProps = {
  onClose: () => void;
};

const crisisResources = [
  {
    name: "National Suicide Prevention Lifeline",
    phone: "988",
    description: "24/7, free and confidential support for people in distress.",
    website: "https://988lifeline.org",
    icon: <Phone className="h-5 w-5" />
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free 24/7 text support with a trained crisis counselor.",
    website: "https://www.crisistextline.org",
    icon: <MessageSquare className="h-5 w-5" />
  },
  {
    name: "SAMHSA's National Helpline",
    phone: "1-800-662-HELP (4357)",
    description: "Treatment referral and information service (in English and Spanish).",
    website: "https://www.samhsa.gov/find-help/national-helpline",
    icon: <Heart className="h-5 w-5" />
  }
];

const CrisisResources = ({ onClose }: CrisisResourcesProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-red-500">Crisis Resources</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <p className="text-gray-600 mb-4 text-sm">
          If you're in crisis or having thoughts of harm, please reach out to one of these resources. 
          You matter, and help is available. 💜
        </p>
        
        <Carousel className="w-full max-w-xs mx-auto mb-6">
          <CarouselContent>
            {crisisResources.map((resource, index) => (
              <CarouselItem key={index}>
                <div className="p-2">
                  <div className="bg-red-50 border border-red-100 rounded-xl p-4 flex flex-col items-center text-center h-48 justify-between">
                    <div className="bg-white p-3 rounded-full mb-2">
                      {resource.icon}
                    </div>
                    <h4 className="font-semibold text-gray-800">{resource.name}</h4>
                    <p className="font-bold text-red-500 my-1">{resource.phone}</p>
                    <p className="text-xs text-gray-600 mb-2">{resource.description}</p>
                    <a 
                      href={resource.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-500 flex items-center hover:underline"
                    >
                      Visit website <ArrowRight size={12} className="ml-1" />
                    </a>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-2 mt-2">
            <CarouselPrevious className="relative inset-0 translate-y-0" />
            <CarouselNext className="relative inset-0 translate-y-0" />
          </div>
        </Carousel>

        <div className="bg-amber-50 border border-amber-100 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-amber-800 mb-1 flex items-center">
            <span className="text-xl mr-2">🚨</span> In immediate danger?
          </h4>
          <p className="text-sm text-amber-700">
            If you or someone else is in immediate physical danger, please call 
            <span className="font-bold"> 911 </span> 
            or go to your nearest emergency room.
          </p>
        </div>
        
        <div className="flex justify-end">
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

export default CrisisResources;
