
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

type Language = {
  code: string;
  name: string;
  flag: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  // Add more languages as needed
];

type LanguageSelectorProps = {
  onLanguageChange: (langCode: string) => void;
  currentLanguage: string;
};

const LanguageSelector = ({ onLanguageChange, currentLanguage }: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];
  
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 px-3 py-2 rounded-lg bg-white/80 hover:bg-white/90 transition-colors text-sm"
      >
        <Globe size={14} className="mr-1" />
        <span>{currentLang.flag}</span>
        <span>{currentLang.name}</span>
      </button>
      
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full right-0 mt-1 bg-white rounded-lg shadow-lg py-1 w-32 z-10"
        >
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => {
                onLanguageChange(language.code);
                setIsOpen(false);
              }}
              className={`flex items-center w-full px-3 py-2 text-left text-sm hover:bg-gray-100
                ${language.code === currentLanguage ? 'bg-gray-100' : ''}`}
            >
              <span className="mr-2">{language.flag}</span>
              <span>{language.name}</span>
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default LanguageSelector;
