
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Settings, Palette, User, Shield } from 'lucide-react';

type AvatarOption = {
  id: string;
  name: string;
  emoji: string;
};

type ThemeOption = {
  id: string;
  name: string;
  className: string;
  previewColor: string;
};

type ToneOption = {
  id: string;
  name: string;
  emoji: string;
  description: string;
};

type PersonalizationModalProps = {
  onClose: () => void;
  onSavePreferences: (preferences: UserPreferences) => void;
  currentPreferences?: UserPreferences;
};

export type UserPreferences = {
  avatar: string;
  theme: string;
  tone: string;
  anonymous: boolean;
};

const avatarOptions: AvatarOption[] = [
  { id: 'bot', name: 'Trixie the Bot', emoji: '🤖' },
  { id: 'doctor', name: 'Dr. Care', emoji: '👩‍⚕️' },
  { id: 'nurse', name: 'Nurse Joy', emoji: '👨‍⚕️' },
  { id: 'friend', name: 'Friendly Pal', emoji: '🧸' },
  { id: 'star', name: 'Starry Guide', emoji: '✨' },
  { id: 'heart', name: 'Hearty Helper', emoji: '💖' },
];

const themeOptions: ThemeOption[] = [
  { id: 'default', name: 'Minty Fresh', className: 'theme-default', previewColor: '#4ade80' },
  { id: 'lavender', name: 'Lavender Dreams', className: 'theme-lavender', previewColor: '#c4b5fd' },
  { id: 'coral', name: 'Coral Reef', className: 'theme-coral', previewColor: '#fda4af' },
  { id: 'blue', name: 'Ocean Blue', className: 'theme-blue', previewColor: '#60a5fa' },
  { id: 'sunshine', name: 'Sunshine', className: 'theme-sunshine', previewColor: '#fcd34d' },
];

const toneOptions: ToneOption[] = [
  { id: 'playful', name: 'Playful', emoji: '🥳', description: 'Fun, light, and cheerful tone' },
  { id: 'gentle', name: 'Gentle', emoji: '💖', description: 'Soft, nurturing, and kind tone' },
  { id: 'professional', name: 'Professional', emoji: '👩‍⚕️', description: 'Clear, factual, and concise tone' },
];

const PersonalizationModal = ({ onClose, onSavePreferences, currentPreferences }: PersonalizationModalProps) => {
  const [preferences, setPreferences] = useState<UserPreferences>(
    currentPreferences || {
      avatar: 'bot',
      theme: 'default',
      tone: 'gentle',
      anonymous: false
    }
  );
  
  const [activeTab, setActiveTab] = useState<'avatar' | 'theme' | 'tone' | 'privacy'>('avatar');
  
  const handleSave = () => {
    onSavePreferences(preferences);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4"
    >
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Customize Your Experience</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            ✕
          </button>
        </div>

        <div className="flex mb-6 border-b">
          <button 
            onClick={() => setActiveTab('avatar')} 
            className={`py-2 px-4 ${activeTab === 'avatar' ? 'border-b-2 border-mint text-mint font-medium' : 'text-gray-500'}`}
          >
            <User size={16} className="inline mr-1" />
            Avatar
          </button>
          <button 
            onClick={() => setActiveTab('theme')} 
            className={`py-2 px-4 ${activeTab === 'theme' ? 'border-b-2 border-mint text-mint font-medium' : 'text-gray-500'}`}
          >
            <Palette size={16} className="inline mr-1" />
            Theme
          </button>
          <button 
            onClick={() => setActiveTab('tone')} 
            className={`py-2 px-4 ${activeTab === 'tone' ? 'border-b-2 border-mint text-mint font-medium' : 'text-gray-500'}`}
          >
            <Settings size={16} className="inline mr-1" />
            Tone
          </button>
          <button 
            onClick={() => setActiveTab('privacy')} 
            className={`py-2 px-4 ${activeTab === 'privacy' ? 'border-b-2 border-mint text-mint font-medium' : 'text-gray-500'}`}
          >
            <Shield size={16} className="inline mr-1" />
            Privacy
          </button>
        </div>
        
        <div className="mb-8">
          {activeTab === 'avatar' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-3 gap-3"
            >
              {avatarOptions.map(avatar => (
                <div 
                  key={avatar.id} 
                  onClick={() => setPreferences({...preferences, avatar: avatar.id})}
                  className={`flex flex-col items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${preferences.avatar === avatar.id ? 'bg-mint/20 border border-mint' : 'border border-gray-200'}`}
                >
                  <span className="text-3xl mb-2">{avatar.emoji}</span>
                  <span className="text-sm font-medium text-center">{avatar.name}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'theme' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              {themeOptions.map(theme => (
                <div 
                  key={theme.id}
                  onClick={() => setPreferences({...preferences, theme: theme.id})}
                  className={`flex items-center p-3 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${preferences.theme === theme.id ? 'bg-mint/20 border border-mint' : 'border border-gray-200'}`}
                >
                  <div 
                    className="w-8 h-8 rounded-full mr-3" 
                    style={{ background: theme.previewColor }}
                  />
                  <span className="font-medium">{theme.name}</span>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'tone' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {toneOptions.map(tone => (
                <div 
                  key={tone.id}
                  onClick={() => setPreferences({...preferences, tone: tone.id})}
                  className={`p-4 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors ${preferences.tone === tone.id ? 'bg-mint/20 border border-mint' : 'border border-gray-200'}`}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-2xl mr-2">{tone.emoji}</span>
                    <span className="font-medium">{tone.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{tone.description}</p>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'privacy' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              <div className="p-4 border rounded-lg">
                <div className="flex items-start mb-2">
                  <div className="flex items-center h-5">
                    <input
                      id="anonymous-mode"
                      type="checkbox"
                      checked={preferences.anonymous}
                      onChange={() => setPreferences({...preferences, anonymous: !preferences.anonymous})}
                      className="w-4 h-4 rounded focus:ring-mint text-mint border-gray-300"
                    />
                  </div>
                  <label htmlFor="anonymous-mode" className="ml-2 font-medium">
                    Anonymous Mode 🤫
                  </label>
                </div>
                <p className="text-sm text-gray-600 ml-6">
                  When enabled, we won't store your triage sessions. 
                  Your privacy matters to us! (This setting can be changed anytime.)
                </p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <span className="font-medium">Data we collect:</span> We only store symptom selections and answers to help improve the app. 
                  No personally identifiable information is stored unless you explicitly create an account.
                </p>
              </div>
            </motion.div>
          )}
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-mint hover:bg-mint/80 text-white"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalizationModal;
