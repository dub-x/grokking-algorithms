class ListNode<T> {
  value: T;
  prev: ListNode<T> | null;
  next: ListNode<T> | null;

  constructor(
    value: T,
    prev: ListNode<T> | null = null,
    next: ListNode<T> | null = null
  ) {
    this.value = value;
    this.prev = prev;
    this.next = next;
  }
}

export class List<T> {
  firstNode: ListNode<T> | null;
  lastNode: ListNode<T> | null;
  #length = 0;

  constructor() {
    this.firstNode = null;
    this.lastNode = null;
  }

  get length(): number {
    return this.#length;
  }

  at(idx: number): ListNode<T> | null {
    let index = idx < 0 ? this.#length + idx : idx;

    if (index < 0 || index > this.#length - 1) {
      return null;
    }

    if (index < this.#length / 2) {
      let currentNode = this.firstNode;
      for (let i = 0; i < index; i++) {
        currentNode = currentNode!.next;
      }
      return currentNode;
    } else {
      let currentNode = this.lastNode;
      for (let i = this.#length - 1; i > index; i--) {
        currentNode = currentNode!.prev;
      }
      return currentNode;
    }
  }

  get(idx: number): T | undefined {
    const node = this.at(idx);
    return node !== null ? node.value : undefined;
  }

  add(idx: number, value: T): this {
    if (idx === 0) {
      return this.unshift(value);
    }

    if (idx === this.#length || idx === -1) {
      return this.push(value);
    }

    const currentNode = this.at(idx);
    if (!currentNode) {
      return this;
    }

    const prevNode = currentNode.prev;
    const newNode = new ListNode(value, prevNode, currentNode);

    currentNode.prev = newNode;

    if (prevNode) {
      prevNode.next = newNode;
    } else {
      this.firstNode = newNode;
    }

    this.#length++;

    return this;
  }

  delete(idx: number): T | undefined {
    const currentNode = this.at(idx);

    if (!currentNode) {
      return undefined;
    }

    if (currentNode.next) {
      currentNode.next.prev = currentNode.prev;
    } else {
      this.lastNode = currentNode.prev;
    }

    if (currentNode.prev) {
      currentNode.prev.next = currentNode.next;
    } else {
      this.firstNode = currentNode.next;
    }

    this.#length--;

    return currentNode.value;
  }

  push(value: T): this {
    if (!this.lastNode) {
      this.firstNode = new ListNode(value);
      this.lastNode = this.firstNode;
    } else {
      this.lastNode.next = new ListNode(value, this.lastNode);
      this.lastNode = this.lastNode.next;
    }

    this.#length++;
    return this;
  }

  pop(): T | undefined {
    if (!this.lastNode) {
      return undefined;
    }

    const result = this.lastNode.value;

    if (this.lastNode.prev) {
      this.lastNode = this.lastNode.prev;
      this.lastNode.next = null;
    } else {
      this.firstNode = null;
      this.lastNode = null;
    }

    this.#length--;
    return result;
  }

  unshift(value: T): this {
    if (!this.firstNode) {
      this.firstNode = new ListNode(value);
      this.lastNode = this.firstNode;
    } else {
      this.firstNode.prev = new ListNode(value, null, this.firstNode);
      this.firstNode = this.firstNode.prev;
    }

    this.#length++;
    return this;
  }

  shift(): T | undefined {
    if (!this.firstNode) {
      return undefined;
    }

    const result = this.firstNode.value;

    if (this.firstNode.next) {
      this.firstNode = this.firstNode.next;
      this.firstNode.prev = null;
    } else {
      this.firstNode = null;
      this.lastNode = null;
    }

    this.#length--;
    return result;
  }

  clear(): void {
    this.firstNode = null;

    while (this.lastNode) {
      const prev = this.lastNode.prev;
      this.lastNode.prev = this.lastNode.next = null;
      this.lastNode = prev;
    }

    this.#length = 0;
  }

  *[Symbol.iterator](): Iterator<T> {
    let currentNode = this.firstNode;
    while (currentNode) {
      yield currentNode.value;
      currentNode = currentNode.next;
    }
  }
}
