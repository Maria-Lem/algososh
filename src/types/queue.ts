import { ElementStates } from "./element-states";

export interface IQueueElement {
  item: string;
  state: ElementStates;
}

export interface IQueue<T> {
  enqueue: (item: T) => void;
  dequeue: () => void;
  peek: () => T | IQueueElement | null;
  getElements: () => T[] | IQueueElement[];
  clear: () => void;
  getHead: () => number;
  getTail: () => number;
  getSize: () => number;
  isEmpty: () => boolean;
}