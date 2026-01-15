// =============================================================================
// UNTYPED / MIXED
// =============================================================================
export const mockUntypedList = ["Hello world!", 1, true, 0, false, "", {}];

// =============================================================================
// STRINGS
// =============================================================================
export const mockEmptyStringsArray: string[] = [];

// Small arrays
export const mockSingleString = ["alone"];
export const mockSortedStringsSmall = ["alice", "bob", "charlie"];
export const mockUnsortedStringsSmall = ["charlie", "alice", "bob"];

// Large patterns
export const mockReverseSortedStrings = [
  "zoe",
  "victoria",
  "thomas",
  "sophia",
  "rebecca",
];

// Duplicates
export const mockStringsWithDuplicates = [
  "apple",
  "banana",
  "apple",
  "cherry",
  "banana",
];
export const mockStringsWithDuplicatesSorted = [
  "apple",
  "apple",
  "banana",
  "banana",
  "cherry",
];

// Identical values
export const mockIdenticalStrings = [
  "identical",
  "identical",
  "identical",
  "identical",
];

// =============================================================================
// NUMBERS
// =============================================================================
export const mockEmptyNumbersArray: number[] = [];

// Small arrays
export const mockSingleNumber = [7];
export const mockSortedNumbersSmall = [1, 2, 3];
export const mockUnsortedNumbersSmall = [3, 1, 2];

// Large patterns
export const mockReverseSortedNumbers = [9, 7, 5, 3, 1];

// Duplicates
export const mockNumbersWithDuplicates = [1, 2, 1, 3, 2, 1];
export const mockNumbersWithDuplicatesSorted = [1, 1, 1, 2, 2, 3];

// Identical values
export const mockIdenticalNumbers = [1, 1, 1, 1];
