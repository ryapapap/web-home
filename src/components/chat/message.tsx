import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import { ChatProps } from './utils';

export interface MessageProps {
  msg: string;
  tail: boolean;
  side?: 'left' | 'right';
  delay?: number; 
}

const Message: React.FC<MessageProps & ChatProps> = ({
  children,
  msg,
  tail,
  side = 'left',
  delay = 600,
  next,
}) => {

  useEffect(() => {
    const timeout = setTimeout(next, delay);
    return () => clearTimeout(timeout);
  }, []);

  const style = useSpring({
    transform: 'scale(1.0)',
    from: {
      transform: 'scale(0.0)',
    },
    config: {
      mass: 1,
      tension: 380,
      friction: 27,
    },
  });

  return (
    <animated.div 
      className={`chat-msg ${side} ${tail ? 'tail' : ''}`} 
      style={style}
    >
      {children || msg}
    </animated.div>
  );
};

export default Message;
