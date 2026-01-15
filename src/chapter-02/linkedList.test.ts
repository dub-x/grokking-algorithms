import { beforeEach, describe, expect, test } from "vitest";
import { List } from "./LinkedList.js";
import { mockUntypedList } from "./mocks.js";

describe("Linked list", () => {
  let list: List<unknown>;

  beforeEach(() => {
    list = new List();
  });

  describe("Full cycle", () => {
    test("push → add → delete → pop", () => {
      list.push("A").push("B");
      list.add(1, "X");
      expect(list.delete(1)).toBe("X");
      expect(list.pop()).toBe("B");
      expect([...list]).toEqual(["A"]);
    });
  });

  describe("Empty list", () => {
    test("Should have zero length", () => {
      expect(list.length).toBe(0);
    });

    test("Should not have nodes", () => {
      expect(list.firstNode).toBeNull();
      expect(list.lastNode).toBeNull();
    });

    test("Should not allow length change", () => {
      //@ts-ignore
      const mockFn = () => (list.length = 100);
      expect(mockFn).toThrowError();
    });

    test("Should return null for node on at", () => {
      expect(list.at(0)).toBeNull();
      expect(list.at(1000)).toBeNull();
      expect(list.at(-1000)).toBeNull();
    });

    test("Should return undefined on get", () => {
      expect(list.get(0)).toBeUndefined();
      expect(list.get(1000)).toBeUndefined();
    });

    test("Should add element to index 0 on add", () => {
      list.add(0, "Hello world");
      expect(list.get(0)).toBe("Hello world");
      expect(list.length).toBe(1);
    });

    test("Should add element to index -1 on add", () => {
      list.add(-1, "Hello world");
      expect(list.get(0)).toBe("Hello world");
      expect(list.length).toBe(1);
    });

    test("Should handle delete(0) on empty", () => {
      expect(list.delete(0)).toBeUndefined();
      expect(list.length).toBe(0);
    });

    test("Should handle delete(-1) on empty", () => {
      expect(list.delete(-1)).toBeUndefined();
      expect(list.length).toBe(0);
    });

    test("Should firstNode to be equal the lastNode after push", () => {
      list.push("Hello world!");
      expect(list.firstNode?.value).toBe("Hello world!");
      expect(list.lastNode?.value).toBe("Hello world!");
      expect(list.firstNode).toBe(list.lastNode);
    });

    test("Should return undefined on pop", () => {
      expect(list.pop()).toBeUndefined();
      expect(list.length).toBe(0);
    });

    test("Should unshift at start", () => {
      list.unshift("Hello world!");
      expect(list.firstNode?.value).toBe("Hello world!");
      expect(list.lastNode?.value).toBe("Hello world!");
      expect(list.length).toBe(1);
    });

    test("Should return undefined on shift", () => {
      expect(list.shift()).toBeUndefined();
      expect(list.length).toBe(0);
    });

    test("Should clear empty list", () => {
      list.clear();
      expect(list.length).toBe(0);
    });

    test("Should iterate over empty list", () => {
      expect([...list]).toEqual([]);
    });
  });

  describe("At operation", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should return actual node by index", () => {
      let currentNode = list.firstNode;
      for (let i = 0; i < list.length; i++) {
        expect(list.at(i)).toBe(currentNode);
        currentNode = currentNode?.next ?? null;
      }
    });

    test("Should return actual node by negative index", () => {
      let currentNode = list.lastNode;
      for (let i = -1; -i < list.length; i--) {
        expect(list.at(i)).toBe(currentNode);
        currentNode = currentNode?.prev ?? null;
      }
    });

    test("Should return node by index", () => {
      mockUntypedList.forEach((item, index) => {
        expect(list.at(index)?.value).toBe(item);
        expect(list.at(index)?.prev?.value).toBe(mockUntypedList[index - 1]);
        expect(list.at(index)?.next?.value).toBe(mockUntypedList[index + 1]);
      });
    });

    test("Should return node by negative index", () => {
      mockUntypedList.forEach((item, index) => {
        expect(list.at(index - list.length)?.value).toBe(item);
        expect(list.at(index - list.length)?.prev?.value).toBe(
          mockUntypedList[index - 1]
        );
        expect(list.at(index - list.length)?.next?.value).toBe(
          mockUntypedList[index + 1]
        );
      });
    });
  });

  describe("Get operation", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should return item by index", () => {
      for (let i = 0; i < mockUntypedList.length; i++) {
        expect(list.get(i)).toBe(mockUntypedList[i]);
      }
    });

    test("Should return item by negative index", () => {
      for (let i = -1; -i < mockUntypedList.length; i--) {
        expect(list.get(i)).toBe(mockUntypedList.at(i));
      }
    });
  });

  describe("Add operation", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should return list for chaining", () => {
      expect(list.add(0, "Hello world!")).toBe(list);
      expect(list.add(-1, "Hello world!")).toBe(list);
      expect(list.add(999, "Hello world!")).toBe(list);
    });

    test("Should increase length", () => {
      const lengthBefore = list.length;
      list.add(0, "Hello world!");
      expect(list.length).toBe(lengthBefore + 1);
    });

    test("Should ignore index out of range", () => {
      const lengthBefore = list.length;
      list.add(999, "Hello world!");
      expect(list.length).toBe(lengthBefore);
    });

    test("Should add item by index", () => {
      list.clear();
      mockUntypedList.forEach((item, index) => {
        expect(list.add(index, item).get(index)).toBe(item);
      });

      mockUntypedList.forEach((item) => {
        const position = Math.floor(Math.random() * list.length);
        list.add(position, item);
        expect(list.get(position)).toBe(item);
      });
    });

    test("Should push item on length add", () => {
      list.add(list.length, "HI THERE!");
      expect(list.lastNode?.value).toBe("HI THERE!");
    });

    test("Should unshift item on 0", () => {
      list.add(0, "HI THERE!");
      expect(list.firstNode?.value).toBe("HI THERE!");
    });

    test("Should add item by negative index", () => {
      list.add(-list.length, "HI there!");
      expect(list.get(0)).toBe("HI there!");

      list.add(-1, "HI there!");
      expect(list.get(-1)).toBe("HI there!");

      list.add(-2, "HI there!");
      expect(list.get(-3)).toBe("HI there!");
    });

    test("Should keep previous value after insert", () => {
      const valueBefore = list.get(3);
      list.add(3, "HI there!");
      expect(list.get(4)).toBe(valueBefore);
    });
  });

  describe("Delete operation", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should delete item by index", () => {
      mockUntypedList.forEach(() => {
        const position = Math.floor(Math.random() * list.length);
        const value = list.delete(position);
        expect(list.get(position)).not.toBe(value);
        expect(list).not.toContainEqual(value);
      });
    });

    test("Should change length on delete", () => {
      const lengthBefore = list.length;
      list.delete(0);
      expect(list.length).toBe(lengthBefore - 1);
    });

    test("Should return deleted item", () => {
      mockUntypedList.forEach(() => {
        const position = Math.floor(Math.random() * list.length);
        const itemToDelete = list.get(position);

        expect(list.delete(position)).toBe(itemToDelete);
      });
    });

    test("Should return undefined for out-of-range delete", () => {
      expect(list.delete(999)).toBeUndefined();
    });
  });

  describe("Push operation", () => {
    test("Should change length", () => {
      const lengthBefore = list.length;
      list.push("Hello world!");
      expect(list.length).toBe(lengthBefore + 1);
    });

    test("Should push item back", () => {
      list.push("Hello world!");
      expect(list.lastNode?.value).toBe("Hello world!");
    });

    test("Should return list for chaining", () => {
      expect(list.push("Hello world!")).toBe(list);
    });
  });

  describe("Pop operation", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should decrease length", () => {
      const lengthBefore = list.length;
      list.pop();
      expect(list.length).toBe(lengthBefore - 1);
    });

    test("Should delete last item", () => {
      const nodeToDelete = list.lastNode;
      list.pop();
      expect(list.lastNode).toBe(nodeToDelete?.prev);
    });

    test("Should return deleted item", () => {
      const itemToDelete = list.lastNode?.value;
      expect(list.pop()).toBe(itemToDelete);
    });

    test("Should be able to delete all items", () => {
      mockUntypedList.forEach(() => list.pop());
      expect(list.length).toBe(0);
      expect(list.firstNode).toBeNull();
      expect(list.lastNode).toBeNull();
    });
  });

  describe("Unshift operation", () => {
    test("Should change length", () => {
      const lengthBefore = list.length;
      list.unshift("Hello world!");
      expect(list.length).toBe(lengthBefore + 1);
    });

    test("Should return list for chaining", () => {
      expect(list.unshift("Hello world!")).toBe(list);
    });

    test("Should add item at start", () => {
      list.unshift("world!");
      list.unshift("Hello ");
      expect(list.firstNode?.value).toBe("Hello ");
    });
  });

  describe("Shift operation", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should decrease length", () => {
      const lengthBefore = list.length;
      list.shift();
      expect(list.length).toBe(lengthBefore - 1);
    });

    test("Should delete first item", () => {
      const nodeToDelete = list.firstNode;
      list.shift();
      expect(list.firstNode).toBe(nodeToDelete?.next);
    });

    test("Should return deleted item", () => {
      const itemToDelete = list.firstNode?.value;
      expect(list.shift()).toBe(itemToDelete);
    });

    test("Should be able to delete all items", () => {
      mockUntypedList.forEach(() => list.shift());
      expect(list.length).toBe(0);
      expect(list.firstNode).toBeNull();
      expect(list.lastNode).toBeNull();
    });
  });

  describe("Clear operation", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should change length to 0", () => {
      list.clear();
      expect(list.length).toBe(0);
    });

    test("Should clear list", () => {
      list.clear();
      expect(list.firstNode).toBeNull();
      expect(list.lastNode).toBeNull();
      expect([...list]).toEqual([]);
    });
  });

  describe("Iterator", () => {
    beforeEach(() => {
      mockUntypedList.forEach((item) => list.push(item));
    });

    test("Should iterate in direct order", () => {
      expect([...list]).toEqual(mockUntypedList);
    });

    test("Should support for...of loop", () => {
      const items: unknown[] = [];
      for (const item of list) {
        items.push(item);
      }

      expect(items).toEqual(mockUntypedList);
    });
  });
});
