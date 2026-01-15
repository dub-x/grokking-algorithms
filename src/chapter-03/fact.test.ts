import { describe, expect, test } from "vitest";
import { fact } from "./fact.js";

describe("Factorial", () => {
  test("Should calculate 5! correctly", () => {
    expect(fact(5)).toBe(120);
  });

  test("Should return 1 for 0!", () => {
    expect(fact(0)).toBe(1);
  });

  test("Should throw error for negative numbers", () => {
    expect(() => fact(-1)).toThrowError();
  });

  test("Should throw error for non-integers", () => {
    expect(() => fact(5.3)).toThrowError();
  });

  test("Should handle maximum safe value", () => {
    expect(Number.isFinite(fact(170))).toBe(true);
  });

  test("Should throw error for too deep recursion", () => {
    expect(() => fact(171)).toThrowError();
  });
});
