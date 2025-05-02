
import { ReactNode } from 'react';

type UserMessageProps = {
  children: ReactNode;
};

const UserMessage = ({ children }: UserMessageProps) => {
  return (
    <div className="user-message">
      {children}
    </div>
  );
};

export default UserMessage;
