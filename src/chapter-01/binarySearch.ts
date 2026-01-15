export function binarySearch<T extends string | number>(arr: T[], item: T) {
  let low = 0;
  let mid = 0;
  let high = arr.length - 1;

  while (low <= high) {
    mid = low + Math.floor((high - low) / 2);

    if (arr[mid] === item) {
      return mid;
    }

    if (arr[mid] < item) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  return null;
}
