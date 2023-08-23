import { Direction } from "../../types/direction";
import { swap } from "../../utils/utils";

export const selectionSort = (inputArray: number[], order: Direction): number[] => {
  const { length } = inputArray;

  for (let i = 0; i < length; i++) {
    let index = i;

    for (let j = i + 1; j < length; j++) {
      const orderSelection = order === Direction.Ascending ? inputArray[j] < inputArray[index] : inputArray[j] > inputArray[index];

      if (orderSelection) {
        index = j;
      }
    }

    if (index !== i) {
      swap(inputArray, i, index);
    }
  }

  return inputArray;
};

export const bubbleSort = (inputArray: number[], order: Direction): number[] => {
  const { length } = inputArray;

  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i -1; j++) {
      const orderSelection = order === Direction.Ascending ? inputArray[j] > inputArray[j + 1] : inputArray[j] < inputArray[j + 1];

      if (orderSelection) {
        swap(inputArray, j, j + 1);
      }
    }
  }

  return inputArray;
};