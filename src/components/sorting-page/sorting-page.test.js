import { Direction } from "../../types/direction";
import { bubbleSort, selectionSort } from "./utils";

describe('Sorting algorithm tests', () => {
  it('Should correctly sort empty array with sort selection algorithm in ascending order', () => {
    expect(selectionSort([], Direction.Ascending)).toEqual([]);
  });

  it('Should correctly sort empty array with sort selection algorithm in descending order', () => {
    expect(selectionSort([], Direction.Descending)).toEqual([]);
  });

  it('Should correctly sort array with one element using sort selection in ascending order', () => {
    expect(selectionSort([3], Direction.Ascending)).toEqual([3]);
  });

  it('Should correctly sort array with one element using sort selection in descending order', () => {
    expect(selectionSort([3], Direction.Descending)).toEqual([3]);
  });

  it('Should correctly sort array with sort selection algorithm in ascending order', () => {
    expect(selectionSort([3, 13, 9, 7, 5], Direction.Ascending)).toEqual([3, 5, 7, 9, 13]);
  });

  it('Should correctly sort array with sort selection algorithm in descending order', () => {
    expect(selectionSort([3, 13, 9, 7, 5], Direction.Descending)).toEqual([13, 9, 7, 5, 3]);
  });


  it('Should correctly sort empty array with bubble sort algorithm in ascending order', () => {
    expect(bubbleSort([], Direction.Ascending)).toEqual([]);
  });

  it('Should correctly sort empty array with bubble sort algorithm in descending order', () => {
    expect(bubbleSort([], Direction.Descending)).toEqual([]);
  });

  it('Should correctly sort array with one element using bubble sort in ascending order', () => {
    expect(bubbleSort([3], Direction.Ascending)).toEqual([3]);
  });

  it('Should correctly sort array with one element using bubble sort in descending order', () => {
    expect(bubbleSort([3], Direction.Descending)).toEqual([3]);
  });

  it('Should correctly sort array using bubble sort algorithm in ascending order', () => {
    expect(bubbleSort([3, 13, 9, 7, 5], Direction.Ascending)).toEqual([3, 5, 7, 9, 13]);
  });

  it('Should correctly sort array using bubble sort algorithm in descending order', () => {
    expect(bubbleSort([3, 13, 9, 7, 5], Direction.Descending)).toEqual([13, 9, 7, 5, 3]);  
  });
});