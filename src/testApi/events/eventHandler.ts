import { DispatchAPIAction } from '../../model/actions/common';
import { olectioEvents } from '../../model/events';

export type EventHandler<T extends olectioEvents> = (
  event: T,
  dispatcher: DispatchAPIAction,
) => Promise<void> | void;
