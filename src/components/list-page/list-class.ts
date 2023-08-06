import { ILinkedList } from "../../types/list";

export class LinkedListNode<T> {
  value: T
  next: LinkedListNode<T> | null

  constructor(value: T, next?: LinkedListNode<T> | null) {
    this.value = value;
    this.next = next === undefined ? null : next;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: LinkedListNode<T> | null;
  private tail: LinkedListNode<T> | null;
  private size: number;
  private addFromArray (items: T[]) {
    items.forEach(item => this.addToTail(item));
  }

  constructor(array: T[]) {
    this.head = null;
    this.tail = null;
    this.size = 0;

    if (array?.length) {
      this.addFromArray(array);
    }
  }

  addToHead = (item: T) => {
    const node = new LinkedListNode(item);

    if (this.head === null) {
      this.head = node;
      this.tail = this.head;
      this.size++;

      return this;
    }

    let curr = this.head;

    this.head = node;
    this.head.next = curr;

    this.size++;
    return this;
  };

  addToTail = (item: T) => {
    const node = new LinkedListNode(item);

    if (!this.head || !this.tail) {
      this.head = node;
      this.tail = node;
      this.size++;
      
      return this;
    }
    
    this.tail.next = node;
    this.tail = node;
    this.size++;

    return this;
  };

  removeFromHead = () => {
    if (!this.head) return null;

    if (this.head.next) {
      this.head = this.head.next;
      this.size--;
    } else {
      this.head = null;
      this.tail = null;
      this.size--;
    }
  };

  removeFromTail = () => {
    if (!this.tail) return null;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      this.size--;
    }

    let currentNode = this.head;

    while (currentNode?.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;
    this.size--;
  };

  insertAtIndex = (item: T, index: number) => {
    if (index < 0 || index > this.size) return null;
    if (index === 0) return this.addToHead(item);
    
    const node = new LinkedListNode(item);
    let prev = null;
    let current = this.head;

    for (let i = 0; i < index; i++) {
      prev = current;
      current = current!.next;
    }

    prev!.next = node;
    node.next = current;

    this.size++;
  };

  removeByIndex = (index: number) => {
    if (index < 0 || index > this.size) return null;
    if (index === 0) return this.removeFromHead();

    let prev = null;
    let current = this.head;

    for (let i = 0; i < index; i++) {
      prev = current;
      current = current!.next;
    }

    prev!.next = current!.next;
    this.size--;
  };

  printArrayFromLinkedList = (): T[] => {
    let arr: T[] = [];
    let currentNode = this.head;

    for (let i = 0; i < this.size; i++) {
      if (currentNode) {
        arr.push(currentNode.value);
        currentNode = currentNode.next;
      }
    }

    return arr;
  };

  getSize = () => {
    return this.size;
  };

  getTail = () => {
    return this.tail;
  };

  getHead = () => {
    return this.head;
  };
}