import React, { useState } from 'react';
import _ from 'lodash';
import Message from './message';
import Input from './input';
import Options from './options';
import { IChat, CHAT_TYPE, IMessage } from './utils';
import './chat.css';

/*
  TODO:
    maybe reuse chat-msg more ?
    animate for form and options
    how do lots of options look ?
    just make sure mobile isn't fucked, ok?
    should manager handle delay?
*/


interface ChatManagerProps {
  chats: IChat[];
}

function immutablePop<T>(arr: T[]): [T, T[]] {
  return [_.first(arr), arr.slice(1, arr.length)];
}

const Chat: React.FC<ChatManagerProps> = (props) => {
  const [popped, newChats] = immutablePop(props.chats);
  const [queue, setQueue] = useState<IChat[]>(newChats);
  const [chats, setChats] = useState<IChat[]>([popped]);

  const next = (queueParam?: IChat[]) => {
    const [popped, newQueue] = immutablePop(queueParam || queue);
    if (popped) {
      setQueue(newQueue);
      setChats([...chats, popped]);
    }
  }

  const enqueue = (items: IChat[]) => {
    const combined = [...queue, ...items];
    next(combined);
  }

  const chatProps = {next, enqueue};

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
