import { swap } from "../../utils/utils";

export const reverseString = (input: string): string[] => {
  let inputArray = input.split('');

  for (let start = 0, end = inputArray.length - 1; start <= end; start++, end--) {
    swap(inputArray, start, end);
  }

  return inputArray;
};