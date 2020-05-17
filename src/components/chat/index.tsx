import React, { useState, useRef, useEffect } from 'react';
import _ from 'lodash';
import Message from './message';
import Input from './input';
import Options from './options';
import { IChat, CHAT_TYPE, IMessage } from './utils';
import './chat.css';


interface ChatManagerProps {
  chats: IChat[];
}

const Chat: React.FC<ChatManagerProps> = (props) => {
  const [queue, setQueue] = useState<IChat[]>(props.chats);
  const [chats, setChats] = useState<IChat[]>([]);

  const next = (queueParam?: IChat[]) => {
    const popped = _.first(queueParam || queue);
    if (popped) {
      setQueue((q) => q.slice(1, q.length));
      setChats((c) => [...c, popped]);
    }
  }

  const enqueue = (items: IChat[]) => {
    const combined = [...queue, ...items];
    next(combined);
  }

  useEffect(() => {
    const nextMsg = _.first(queue);
    const timeout = setTimeout(next, nextMsg && nextMsg.delay || 0);
    return () => {
      clearTimeout(timeout);
    }
  }, [queue]);

  const chatProps = {enqueue};

  return (
    <div className="chat">
      {_.map(chats, (chat, i) => {
        switch(chat.type) {
          case CHAT_TYPE.message:
            const tail = i === chats.length - 1 
              || chats[i].type !== chats[i+1].type
              || (chats[i] as IMessage).side !== (chats[i+1] as IMessage).side;

            return <Message key={i} tail={tail} {...chat} {...chatProps} />;
          case CHAT_TYPE.option:
            return <Options key={i} {...chat} {...chatProps} />;
          case CHAT_TYPE.input:
            return <Input key={i} {...chat} {...chatProps} />
          case CHAT_TYPE.interaction:
            // todo: should we limit this to once? or be on caller or smth?
            // caller should maybe be a component
            chat.action();
            return;
          default:
            return null;
        }
      })}
    </div>
  );
}

export default Chat;
