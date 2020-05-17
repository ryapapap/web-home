import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import _ from 'lodash';
import { ChatProps, IOption } from './utils';
import Message from './message';

export interface OptionsProps {
  options: IOption[];
}

const Options: React.FC<OptionsProps & ChatProps> = ({
  options,
  enqueue
}) => {
  const [selected, setSelected] = useState<number>(null);

  const onSelected = (i: number) => {
    if (selected === null) {
      setSelected(i);
      enqueue(options[i].result);
    }
  }

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

  // a little hacky, but I want
  // 2 or less options side by side,
  // >2 to list horizontally
  const questionsStyle: React.CSSProperties = options.length > 2 ?
   {
      flexBasis: 250,
      flexGrow: 1,
    } 
  : 
    {};

  return (
    <>
    {selected !== null && <Message 
      msg={options[selected].text}
      tail={true}
      side="right"
      enqueue={enqueue}
    />}
    {selected === null && <animated.div 
      className="input-container"
      style={style}
    >
      <div className="chat-options">
        {_.map(options, (option, i) => 
            <button 
              className="chat-option" 
              onClick={() => onSelected(i)}
              style={questionsStyle}
            >
              {option.text}
            </button>
        )}
      </div>
    </animated.div>}
    </>
  );
};

export default Options;
