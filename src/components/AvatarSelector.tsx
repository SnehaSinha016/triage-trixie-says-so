
import { motion } from 'framer-motion';

type AvatarSelectorProps = {
  currentAvatar: string;
  onSelect: (avatarId: string) => void;
};

const avatars = [
  { id: 'bot', emoji: '🤖', name: 'Trixie' },
  { id: 'doctor', emoji: '👩‍⚕️', name: 'Dr. Care' },
  { id: 'friend', emoji: '🧸', name: 'Buddy' },
  { id: 'star', emoji: '✨', name: 'Starry' },
];

const AvatarSelector = ({ currentAvatar, onSelect }: AvatarSelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex space-x-2 p-2 bg-white/70 backdrop-blur-sm rounded-full shadow-sm"
    >
      {avatars.map(avatar => (
        <motion.button
          key={avatar.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onSelect(avatar.id)}
          className={`w-10 h-10 rounded-full flex items-center justify-center text-xl 
            ${currentAvatar === avatar.id ? 'bg-mint text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
          title={avatar.name}
        >
          {avatar.emoji}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default AvatarSelector;
