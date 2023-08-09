import { LinkedListNode } from "../components/list-page/list-class";
import { IResultArray } from "./main";

export interface ILinkedListElement extends IResultArray {
  isSmallCircleTop?: boolean;
  isSmallCircleBottom?: boolean;
}

export interface ILinkedList<T> {
  addToHead: (item: T) => void;
  addToTail: (item: T) => void;
  removeFromHead: () => void;
  removeFromTail: () => void;
  insertAtIndex: (item: T, index: number) => void;
  removeByIndex: (index: number) => void;
  printArrayFromLinkedList: () => T[];
  getSize: () => void;
  getHead: () => LinkedListNode<T> | null;
  getTail: () => LinkedListNode<T> | null;
}