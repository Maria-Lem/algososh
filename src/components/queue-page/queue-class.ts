import { ElementStates } from "../../types/element-states";
import { IQueue, IQueueElement } from "../../types/queue";

export class Queue<T> implements IQueue<T> {
  private container: T[] | IQueueElement[] = [];
  private head: number = 0;
  private tail: number = 0;
  private item: IQueueElement = { item: '', state: ElementStates.Default };
  private length: number = 0;
  private readonly size: number = 0;

  constructor(size: number) {
    this.size = size;
    this.container = Array(size).fill(this.item);
  }

  getElements = (): T[] | IQueueElement[] => {
    return this.container;
  };

  enqueue = (item: T): void => {
    if (this.length >= this.size) return;

    if (this.isEmpty()) {
      this.head = 0;
      this.tail = 0;
      this.length = 0;
    }

    if (this.length < this.size) {
      this.container[this.tail % this.size] = item;
      this.tail++;
      this.length++;
    }
  };

  dequeue = (): void => {
    this.container[this.head % this.size] = this.item;
    this.head++;
    this.length--;
  };

  peek = (): T | IQueueElement | null => {
    if (this.isEmpty()) return null;

    return this.container[this.head];
  };

  getHead = (): number => {
    return this.head;
  };

  getTail = (): number => {
    return this.tail;
  };

  getSize = (): number => {
    return this.size;
  };

  isEmpty = (): boolean => {
    return this.length === 0;
  };

  clear = (): void => {
    this.container = Array(this.size).fill(this.item);
    this.head = 0;
    this.tail = 0;
    this.length = 0;
  };
}