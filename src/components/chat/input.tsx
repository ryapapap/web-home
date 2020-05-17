import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineSend } from 'react-icons/ai';
import { ChatProps, CHAT_TYPE } from './utils';

export interface InputProps {
  response: string;
}

const Input: React.FC<InputProps & ChatProps> = ({
  response,
  enqueue
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = () => {
    // TODO: send email to myself with the inputRef.current.value, yo ! (if > size..)
    if (inputRef.current.value) {
      setSubmitted(true);
      setTimeout(() => enqueue([
        { type: CHAT_TYPE.message, msg: response },
      ]), 1000);
    }
  }

  const onKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onSubmit();
    }
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
    <animated.div 
      className={`chat-input ${submitted ? 'submitted' : ''}`} 
      style={style}
    >
      <TextareaAutosize
        inputRef={inputRef}
        onKeyPress={onKeyPress}
        readOnly={submitted}
      />
      {!submitted && <button 
        className="chat-submit" 
        onClick={onSubmit}
      >
        <AiOutlineSend />
      </button>}
    </animated.div>
  );
};

export default Input;
