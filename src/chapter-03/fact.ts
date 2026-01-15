export function fact(x: number): number {
  if (!Number.isInteger(x) || x < 0) {
    throw new Error("Input must be non-negative integer");
  }

  if (x > 170) {
    throw new Error("Max number exceeded");
  }

  if (x <= 1) {
    return 1;
  }

  return x * fact(x - 1);
}
