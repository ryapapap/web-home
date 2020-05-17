import { MessageProps } from './message';
import { InputProps } from './input';
import { OptionsProps } from './options';

export enum CHAT_TYPE {
  message = 'message',
  option = 'options',
  input = 'input',
  interaction = 'interaction',
}

export interface IMessage extends MessageProps {
  type: typeof CHAT_TYPE.message;
}

export interface IOption {
  text: string;
  result: IChat[];
}

export interface IOptionMessage extends OptionsProps {
  type: typeof CHAT_TYPE.option;
}

export interface IInputMessage extends InputProps {
  type: typeof CHAT_TYPE.input;
}

export interface IInteractionMessage {
  type: typeof CHAT_TYPE.interaction;
  action: () => void;
}

export type IChat = IMessage | IOptionMessage | IInputMessage | IInteractionMessage;

export interface ChatProps {
  next: () => void;
  enqueue: (items: IChat[]) => void;
}