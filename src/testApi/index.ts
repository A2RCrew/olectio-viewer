import log from 'loglevel';
import { DispatchAPIAction } from '../model/actions/common';
import { olectioEventHandler, olectioEvents } from '../model/events';
import { State } from '../model/state';
import setupButtonBar from './buttons/setupButtonBar';
import events from './events';
import { EventHandler } from './events/eventHandler';

let dispatcher: DispatchAPIAction;
let state: State;
log.setLevel('info');

export const getState = (): State => state;

export const setState = (newState: State): void => {
  state = newState;
  setupButtonBar(state, dispatcher).catch((ex) => {
    const { stack, message } = ex as Error;
    console.error('Error in setup button bar', stack || message);
  });
};

export const setDispatcher = (newDispatcher: DispatchAPIAction): void => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatcher = newDispatcher;
};

export const eventHandler: olectioEventHandler = (event) =>
  new Promise<void>((resolve) => {
    if (dispatcher) {
      const eventReference = (
        events as {
          [key: string]: EventHandler<olectioEvents>;
        }
      )[event.type];
      if (!eventReference) {
        log.warn(`Event not implemented ${event.type}`);
      } else {
        const promise = eventReference(event, dispatcher);
        if (promise) {
          promise.then(resolve).catch((ex) => {
            const { stack, message } = ex as Error;
            console.error('Error at event handler promise', stack || message);
          });
        }
      }
    } else {
      setTimeout(() => eventHandler(event).then(resolve), 0);
    }
  });

declare global {
  interface Window {
    olectioSetDispatcher: (newDispatcher: DispatchAPIAction) => void;
    olectioEventHandler: olectioEventHandler;
    olectioSetState: (newState: State) => void;
  }
}

window.olectioSetDispatcher = setDispatcher;
window.olectioEventHandler = eventHandler;
window.olectioSetState = setState;
