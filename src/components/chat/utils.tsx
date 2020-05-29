import React from 'react';
import { MessageProps } from './message';
import { InputProps } from './input';
import { OptionsProps } from './options';
import { RedirectProps } from './redirect';

export enum CHAT_TYPE {
  message = 'message',
  option = 'options',
  input = 'input',
  interaction = 'interaction',
  redirect = 'redirect',
}

export interface IMessage extends MessageProps {
  type: typeof CHAT_TYPE.message;
  delay?: number;
}

export interface IOption {
  text: string;
  result: IChat[];
}

export interface IOptionMessage extends OptionsProps {
  type: typeof CHAT_TYPE.option;
  delay?: number;
}

export interface IInputMessage extends InputProps {
  type: typeof CHAT_TYPE.input;
  delay?: number;
}

export interface IInteractionMessage {
  type: typeof CHAT_TYPE.interaction;
  delay?: number;
  Component: React.FC;
}

export interface IRedirectMessage extends RedirectProps {
  type: typeof CHAT_TYPE.redirect;
  delay?: number;
}

export type IChat = IMessage | IOptionMessage | IInputMessage | IInteractionMessage | IRedirectMessage;

export interface ChatProps {
  enqueue: (items: IChat[]) => void;
}
