import { Resize } from '../model/actions/global';
import { DispatchAPIAction } from '../model/actions/common';

import { updateState } from '../lib/state';
import { State } from '../model/state';

let onResize: () => void;
let onViewportClick: () => void;

/**
 * Sets up viewer global events
 * @param dispatcher Viewer dispatcher
 */
export const setupGlobalEvents = (state: State, dispatcher: DispatchAPIAction): void => {
  onResize = (): void => {
    const action: Resize = {
      type: 'resize',
    };
    dispatcher(action).catch((ex) => {
      const { stack, message } = ex as Error;
      console.error('Error dispatching action', stack || message);
    });
  };

  window.addEventListener('resize', onResize);

  onViewportClick = (): void => {
    if (state.toggleReadModeOnClick) {
      const avoidReadModeChange = state.dragging || state.selectingText || state.highlightClicked;
      if (!avoidReadModeChange) {
        updateState({ readMode: !state.readMode });
      }
    }
  };

  if (state.olectioContainerNode) {
    state.olectioContainerNode.addEventListener('click', onViewportClick);
  }
};

/**
 * Removes global events
 */
export const removeGlobalEvents = (state: State): void => {
  const { olectioContainerNode } = state;
  if (onResize) {
    window.removeEventListener('resize', onResize);
  }
  if (olectioContainerNode && onViewportClick) {
    olectioContainerNode.removeEventListener('click', onViewportClick);
  }
};
