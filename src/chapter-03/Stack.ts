class StackNode<T> {
  prev: null | StackNode<T> = null;
  value: T;

  constructor(value: T, prev: StackNode<T> | null = null) {
    this.value = value;
    this.prev = prev;
  }
}

export class Stack<T> {
  #length: number = 0;
  #topNode: null | StackNode<T> = null;

  constructor() {}

  get length(): number {
    return this.#length;
  }

  peek(): T | undefined {
    return this.#topNode?.value;
  }

  isEmpty(): boolean {
    return this.#length === 0;
  }

  push(value: T): this {
    this.#topNode = new StackNode(value, this.#topNode);
    this.#length++;
    return this;
  }

  pop(): T | undefined {
    if (!this.#topNode) {
      return undefined;
    }

    const result = this.#topNode.value;
    this.#topNode = this.#topNode.prev;
    this.#length--;

    return result;
  }

  clear(): void {
    while (this.#topNode) {
      const prev = this.#topNode.prev;
      this.#topNode.prev = null;
      this.#topNode = prev;
    }

    this.#length = 0;
  }

  toArray(): T[] {
    return [...this];
  }

  *[Symbol.iterator](): Iterator<T> {
    let currentNode = this.#topNode;

    while (currentNode) {
      yield currentNode.value;
      currentNode = currentNode.prev;
    }
  }
}
