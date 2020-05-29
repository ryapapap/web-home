import React from 'react';
import { useSpring, animated } from 'react-spring';
import { Link } from 'gatsby';
import { ChatProps } from './utils';

export interface RedirectProps {
  url: string;
  msg: string;
}

const Redirect: React.FC<RedirectProps & ChatProps> = ({
  url,
  msg
}) => {
  const style = useSpring({
    transform: 'scaleY(1.0)',
    from: {
      transform: 'scaleY(0.0)',
    },
    config: {
      mass: 1,
      tension: 380,
      friction: 27,
    },
  });

  return (
    <animated.div 
      className="input-container"
      style={style}
    >
      <div className="chat-options">
        <Link 
          to={url}
          className="chat-option"
        >
          {msg}
        </Link>
      </div>
    </animated.div>
  );
};

export default Redirect;
