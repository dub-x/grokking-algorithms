import { describe, expect, test, beforeEach } from "vitest";
import { Stack } from "./Stack.js";

describe("Stack", () => {
  let stack: Stack<any>;

  beforeEach(() => {
    stack = new Stack();
  });

  describe("Empty stack", () => {
    test("Should have zero length", () => {
      expect(stack.length).toBe(0);
    });

    test("Should not allow length change", () => {
      //@ts-ignore
      const mockFn = () => (stack.length = 100);
      expect(mockFn).toThrowError();
    });

    test("Should return undefined on peak", () => {
      expect(stack.peek()).toBeUndefined();
    });

    test("Should return undefined on pop", () => {
      expect(stack.pop()).toBeUndefined();
    });

    test("Should be empty", () => {
      expect(stack.isEmpty()).toBe(true);
    });

    test("Should iterate over empty stack", () => {
      expect([...stack]).toEqual([]);
    });
  });

  describe("Push operation", () => {
    test("Should push value on top", () => {
      stack.push("hello");
      expect(stack.peek()).toBe("hello");
    });

    test("Should increase length", () => {
      stack.push("world");
      expect(stack.length).toBe(1);
    });

    test("Should return stack for chaining", () => {
      expect(stack.push("!")).toBe(stack);
    });
  });

  describe("Pop operation", () => {
    test("Should remove and return top element", () => {
      stack.push("Brave").push("New").push("World");
      expect(stack.pop()).toBe("World");
      expect(stack.peek()).toBe("New");
    });

    test("Should decrease length", () => {
      stack.push("item");
      stack.pop();
      expect(stack.length).toBe(0);
    });
  });

  describe("Clear operation", () => {
    test("Should clear stack", () => {
      stack.push("Aldous").push("Huxley");
      stack.clear();
      expect(stack.length).toBe(0);
    });

    test("Should peek result to be undefined", () => {
      stack.push("Aldous").push("Huxley");
      stack.clear();
      expect(stack.peek()).toBeUndefined();
    });

    test("Should handle multiple clear calls", () => {
      stack.push("test");
      stack.clear();
      stack.clear();
      expect(stack.length).toBe(0);
    });
  });

  describe("LIFO principle", () => {
    test("Should pop in reverse order of push", () => {
      stack.push("You are").push("wizard").push(",").push("Harry");
      expect(stack.pop()).toBe("Harry");
      expect(stack.pop()).toBe(",");
      expect(stack.pop()).toBe("wizard");
      expect(stack.pop()).toBe("You are");
    });
  });

  describe("Iterator", () => {
    beforeEach(() => {
      stack.push("It is").push("Yoda's").push("style");
    });

    test("Should iterate in LIFO order", () => {
      expect([...stack]).toEqual(["style", "Yoda's", "It is"]);
    });

    test("Should support for...of loop", () => {
      const items: string[] = [];
      for (const item of stack) {
        items.push(item);
      }

      expect(items).toEqual(["style", "Yoda's", "It is"]);
    });
  });

  describe("To Array coercion", () => {
    test("Should return array in reverse order of push on toArray", () => {
      stack.push("It is").push("Yoda's").push("style");
      expect(stack.toArray()).toEqual(["style", "Yoda's", "It is"]);
    });
  });

  describe("Edge cases", () => {
    test("Should handle many elements push", () => {
      const count = 10000;

      Array.apply(null, { length: count } as never).forEach((_, idx) =>
        stack.push(idx)
      );

      expect(stack.length).toBe(count);
      expect(stack.pop()).toBe(count - 1);
    });

    test("Should handle many elements pop", () => {
      const count = 10000;

      Array.apply(null, { length: count } as never).forEach((_, idx) =>
        stack.push(idx)
      );

      Array.apply(null, { length: count } as never).forEach(
        stack.pop.bind(stack)
      );

      expect(stack.length).toBe(0);
    });

    test("Should handle alternating push/pop", () => {
      stack.push(1);
      expect(stack.pop()).toBe(1);

      stack.push(2).push(3);
      expect(stack.pop()).toBe(3);
    });
  });
});
