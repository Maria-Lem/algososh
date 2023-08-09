import { IStack } from "../../types/stack";

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container.push(item);
  };

  pop = (): void => {
    this.container.pop();
  };

  peek = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.container.length - 1];
    }
    return null;
  }

  getElements = (): T[] => {
    return this.container;
  };

  clear = (): void => {
    this.container = [];
  };
}