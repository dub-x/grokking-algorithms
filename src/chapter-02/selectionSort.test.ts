import { beforeEach, describe, expect, test } from "vitest";
import { selectionLinkedListSort, selectionSort } from "./selectionSort.js";
import { List } from "./LinkedList.js";
import {
  mockEmptyNumbersArray,
  mockEmptyStringsArray,
  mockSingleString,
  mockSingleNumber,
  mockSortedStringsSmall,
  mockUnsortedStringsSmall,
  mockUnsortedNumbersSmall,
  mockReverseSortedStrings,
  mockReverseSortedNumbers,
  mockIdenticalStrings,
  mockIdenticalNumbers,
  mockSortedNumbersSmall,
  mockStringsWithDuplicatesSorted,
  mockNumbersWithDuplicatesSorted,
} from "./mocks.js";

describe("Linked List Selection Sort", () => {
  test("Empty list", () => {
    const list = new List();
    const sortedList = selectionLinkedListSort(list);

    expect(sortedList).toEqual(new List());
    expect([...sortedList]).toEqual([]);
    expect(sortedList.length).toBe(0);
  });

  describe("Strings", () => {
    let list: List<string>;
    beforeEach(() => {
      list = new List<string>();
    });

    test("Should not mutate original list", () => {
      mockUnsortedStringsSmall.forEach((value) => list.push(value));
      const snapshot = [...list];
      const sorted = selectionLinkedListSort(list);

      expect([...list]).toEqual(snapshot);
      expect([...sorted]).toEqual(mockSortedStringsSmall);
      expect(sorted).not.toBe(list);
    });

    test("Should handle list with single item", () => {
      mockSingleString.forEach((value) => list.push(value));
      expect(selectionLinkedListSort(list)).toEqual(list);
    });

    test("Should return sorted list", () => {
      mockUnsortedStringsSmall.forEach((value) => list.push(value));
      expect([...selectionLinkedListSort(list)]).toEqual(
        mockSortedStringsSmall
      );
    });

    describe("Edge cases", () => {
      test("Should handle sorted in reverse list", () => {
        mockReverseSortedStrings.forEach((value) => list.push(value));
        expect([...selectionLinkedListSort(list)]).toEqual(
          mockReverseSortedStrings.toReversed()
        );
      });

      test("Should handle sorted list", () => {
        mockSortedStringsSmall.forEach((value) => list.push(value));
        expect([...selectionLinkedListSort(list)]).toEqual(
          mockSortedStringsSmall
        );
      });

      test("Should handle sorted list with duplicates", () => {
        mockStringsWithDuplicatesSorted.forEach((value) => list.push(value));
        expect([...list]).toEqual(mockStringsWithDuplicatesSorted);
      });

      test("Should handle list with identical items", () => {
        mockIdenticalStrings.forEach((value) => list.push(value));
        expect([...selectionLinkedListSort(list)]).toEqual(
          mockIdenticalStrings
        );
      });
    });
  });

  describe("Numbers", () => {
    let list: List<number>;
    beforeEach(() => {
      list = new List<number>();
    });

    test("Should not mutate original list", () => {
      mockUnsortedNumbersSmall.forEach((value) => list.push(value));
      const snapshot = [...list];
      const sorted = selectionLinkedListSort(list);

      expect([...list]).toEqual(snapshot);
      expect([...sorted]).toEqual(mockSortedNumbersSmall);
      expect(sorted).not.toBe(list);
    });

    test("Should handle list with single item", () => {
      mockSingleNumber.forEach((value) => list.push(value));
      expect(selectionLinkedListSort(list)).toEqual(list);
    });

    test("Should return sorted list", () => {
      mockUnsortedNumbersSmall.forEach((value) => list.push(value));
      expect([...selectionLinkedListSort(list)]).toEqual(
        mockSortedNumbersSmall
      );
    });

    describe("Edge cases", () => {
      test("Should handle sorted in reverse list", () => {
        mockReverseSortedNumbers.forEach((value) => list.push(value));
        expect([...selectionLinkedListSort(list)]).toEqual(
          mockReverseSortedNumbers.toReversed()
        );
      });

      test("Should handle sorted list", () => {
        mockSortedNumbersSmall.forEach((value) => list.push(value));
        expect([...selectionLinkedListSort(list)]).toEqual(
          mockSortedNumbersSmall
        );
      });

      test("Should handle sorted list with duplicates", () => {
        mockNumbersWithDuplicatesSorted.forEach((value) => list.push(value));
        expect([...list]).toEqual(mockNumbersWithDuplicatesSorted);
      });

      test("Should handle list with identical items", () => {
        mockIdenticalNumbers.forEach(list.push.bind(list));
        expect([...selectionLinkedListSort(list)]).toEqual(
          mockIdenticalNumbers
        );
      });
    });
  });
});

describe("Array Selection Sort", () => {
  describe("Strings", () => {
    test("Empty array", () => {
      expect(selectionSort(mockEmptyStringsArray)).toEqual(
        mockEmptyStringsArray
      );
    });

    test("Should not mutate original list", () => {
      const snapshot = [...mockUnsortedStringsSmall];
      const sorted = selectionSort(mockUnsortedStringsSmall);

      expect(snapshot).toEqual(mockUnsortedStringsSmall);
      expect(sorted).toEqual(mockSortedStringsSmall);
      expect(sorted).not.toBe(mockUnsortedStringsSmall);
    });

    test("Should handle list with single item", () => {
      expect(selectionSort(mockSingleString)).toEqual(mockSingleString);
    });

    test("Should return sorted list", () => {
      expect(selectionSort(mockUnsortedStringsSmall)).toEqual(
        mockSortedStringsSmall
      );
    });

    describe("Edge cases", () => {
      test("Should handle sorted in reverse list", () => {
        expect(selectionSort(mockReverseSortedStrings)).toEqual(
          mockReverseSortedStrings.toReversed()
        );
      });

      test("Should handle sorted list", () => {
        expect(selectionSort(mockSortedStringsSmall)).toEqual(
          mockSortedStringsSmall
        );
      });

      test("Should handle sorted list with duplicates", () => {
        expect(selectionSort(mockStringsWithDuplicatesSorted)).toEqual(
          mockStringsWithDuplicatesSorted
        );
      });

      test("Should handle list with identical items", () => {
        expect(selectionSort(mockIdenticalStrings)).toEqual(
          mockIdenticalStrings
        );
      });
    });
  });

  describe("Numbers", () => {
    test("Empty array", () => {
      expect(selectionSort(mockEmptyNumbersArray)).toEqual(
        mockEmptyNumbersArray
      );
    });

    test("Should not mutate original list", () => {
      const snapshot = [...mockUnsortedNumbersSmall];
      const sorted = selectionSort(mockUnsortedNumbersSmall);

      expect(snapshot).toEqual(mockUnsortedNumbersSmall);
      expect(sorted).toEqual(mockSortedNumbersSmall);
      expect(sorted).not.toBe(mockUnsortedNumbersSmall);
    });

    test("Should handle list with single item", () => {
      expect(selectionSort(mockSingleNumber)).toEqual(mockSingleNumber);
    });

    test("Should return sorted list", () => {
      expect(selectionSort(mockUnsortedNumbersSmall)).toEqual(
        mockSortedNumbersSmall
      );
    });

    describe("Edge cases", () => {
      test("Should handle sorted in reverse list", () => {
        expect(selectionSort(mockReverseSortedNumbers)).toEqual(
          mockReverseSortedNumbers.toReversed()
        );
      });

      test("Should handle sorted list", () => {
        expect(selectionSort(mockSortedNumbersSmall)).toEqual(
          mockSortedNumbersSmall
        );
      });

      test("Should handle sorted list with duplicates", () => {
        expect(selectionSort(mockNumbersWithDuplicatesSorted)).toEqual(
          mockNumbersWithDuplicatesSorted
        );
      });

      test("Should handle list with identical items", () => {
        expect(selectionSort(mockIdenticalNumbers)).toEqual(
          mockIdenticalNumbers
        );
      });
    });
  });
});
