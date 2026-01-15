import { List } from "./LinkedList.js";

export function selectionSort<T>(array: T[]): T[] {
  const result = [...array];

  for (let i = 0; i < result.length - 1; i++) {
    let minIndex = i;

    for (let j = i + 1; j < result.length; j++) {
      if (result[minIndex] > result[j]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      [result[i], result[minIndex]] = [result[minIndex], result[i]];
    }
  }

  return result;
}

export function selectionLinkedListSort<T>(list: List<T>): List<T> {
  if (list.length === 0) {
    return list;
  }

  const result = new List<T>();
  [...list].forEach(result.push.bind(result));

  for (let current = result.firstNode; current; current = current.next) {
    let minimum = current;

    for (let candidate = current.next; candidate; candidate = candidate.next) {
      if (minimum.value > candidate.value) {
        minimum = candidate;
      }
    }

    if (minimum !== current) {
      [current.value, minimum.value] = [minimum.value, current.value];
    }
  }

  return result;
}
