import React, { useEffect, useRef, useState } from 'react';
import { useSpring, animated } from 'react-spring';
import TextareaAutosize from 'react-textarea-autosize';
import { AiOutlineSend } from 'react-icons/ai';
import { ChatProps, CHAT_TYPE } from './utils';
import Message from './message';

export interface InputProps {
  response: string;
}

const Input: React.FC<InputProps & ChatProps> = ({
  response,
  enqueue
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [submitted, setSubmitted] = useState<string>(null);

  const onSubmit = () => {
    // TODO: send email to myself with the inputRef.current.value, yo ! (if > size..)
    if (inputRef.current.value) {
      setSubmitted(inputRef.current.value);
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
    <>
      {submitted && <Message 
        msg={submitted}
        tail={true}
        side="right"
        enqueue={enqueue}
      />}
      {!submitted && <animated.div 
        className="input-container"
        style={style}
      >
        <div className="chat-input">
          <TextareaAutosize
            inputRef={inputRef}
            onKeyPress={onKeyPress}
          />
          <button 
            className="chat-submit" 
            onClick={onSubmit}
          >
            <AiOutlineSend />
          </button>
        </div>
      </animated.div>}
    </>
  );
};

export default Input;
