import { describe, expect, test } from "vitest";

import { binarySearch } from "./binarySearch.js";
import {
  mockSingleNumber,
  mockSortedNames,
  mockSortedNumbers,
} from "./mocks.js";

describe("Binary search", () => {
  describe("Numbers", () => {
    test("Should find existing element by exact index", () => {
      expect(binarySearch(mockSortedNumbers, 7)).toBe(6);
      expect(binarySearch(mockSortedNumbers, 2)).toBe(1);
    });

    test("Should return null for missing element", () => {
      expect(binarySearch(mockSortedNumbers, 40)).toBeNull();
    });

    test("Should handle empty array", () => {
      expect(binarySearch([], 0)).toBeNull();
    });

    test("Should handle array with single item", () => {
      expect(binarySearch(mockSingleNumber, 1)).toBe(0);
      expect(binarySearch(mockSingleNumber, 7)).toBeNull();
    });
  });

  describe("Strings", () => {
    test("Should find existing element by exact index", () => {
      expect(binarySearch(mockSortedNames, "aria")).toBe(14);
      expect(binarySearch(mockSortedNames, "zoe")).toBe(105);
    });

    test("Should return null for missing strings", () => {
      expect(binarySearch(mockSortedNames, "zebra")).toBeNull();
    });
  });

  describe("Edge cases", () => {
    test("Should handle first element", () => {
      expect(binarySearch(mockSortedNumbers, 1)).toBe(0);
    });

    test("Should handle last element", () => {
      expect(binarySearch(mockSortedNumbers, 10)).toBe(9);
    });
  });
});
