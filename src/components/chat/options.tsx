import React, { useEffect, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import _ from 'lodash';
import { ChatProps, IOption } from './utils';

export interface OptionsProps {
  options: IOption[];
}

const Options: React.FC<OptionsProps & ChatProps> = ({
  options,
  enqueue
}) => {
  const [selected, setSelected] = useState<number>(null);

  const onSelected = (i: number) => {
    setSelected(i);
    enqueue(options[i].result);
  }

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
    <div className="chat-options">
      {selected !== null ? 
        <div className="chat-option selected">{options[selected].text}</div> 
      : 
        _.map(options, (option, i) => 
          <animated.div key={i} style={style}>
            <button 
              className="chat-option" 
              onClick={() => onSelected(i)}
            >
              {option.text}
            </button>
          </animated.div>
        )}
    </div>
  );
};

export default Options;
