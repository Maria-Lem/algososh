import { ElementStates } from "./element-states";

export interface IIsLoader {
  [name: string]: boolean
}

export interface IResultArray {
  value: string;
  state: ElementStates;
}

export interface IRandomArray {
  value: number;
  state: ElementStates;
}