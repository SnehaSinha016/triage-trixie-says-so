
import { useState } from 'react';

type TrixieAvatarProps = {
  size?: 'sm' | 'md' | 'lg';
  customEmoji?: string;
};

const TrixieAvatar = ({ size = 'md', customEmoji }: TrixieAvatarProps) => {
  const [isWaving, setIsWaving] = useState(false);

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const handleMouseEnter = () => {
    setIsWaving(true);
    setTimeout(() => setIsWaving(false), 1000);
  };

  return (
    <div 
      className={`${sizeClasses[size]} bg-mint rounded-full flex items-center justify-center text-white cursor-pointer animate-pulse-soft`}
      onMouseEnter={handleMouseEnter}
    >
      <span className={`text-2xl transition-transform ${isWaving ? 'animate-bounce' : 'animate-float'}`}>
        {isWaving ? '👋' : customEmoji || '🤖'}
      </span>
    </div>
  );
};

export default TrixieAvatar;
