import { IRandomArray, IResultArray } from "../types/main";

export const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const swap = (inputArray: IResultArray[] | IRandomArray[] | string[], firstIndex: number, secondIndex: number) => {
  let temp = inputArray[firstIndex];
  inputArray[firstIndex] = inputArray[secondIndex];
  inputArray[secondIndex] = temp;
};

export const randomNumberBetweenRange = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min)) + min;
};