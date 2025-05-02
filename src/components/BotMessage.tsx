
import { ReactNode } from 'react';
import TrixieAvatar from './TrixieAvatar';

type BotMessageProps = {
  children: ReactNode;
  delay?: number;
};

const BotMessage = ({ children, delay = 0 }: BotMessageProps) => {
  return (
    <div 
      className="trixie-bubble"
      style={{ animationDelay: `${delay}ms` }}
    >
      <TrixieAvatar size="sm" />
      <div className="bot-message">
        {children}
      </div>
    </div>
  );
};

export default BotMessage;
