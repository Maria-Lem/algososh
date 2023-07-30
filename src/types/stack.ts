export interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peek: () => T | null;
  getElements: () => T[];
  clear: () => void;
}