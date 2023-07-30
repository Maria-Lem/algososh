import React, { ChangeEvent, useEffect, useState } from "react";

import styles from './sorting-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";

import { Direction } from "../../types/direction";
import { Algorithm } from "../../types/algorithm";
import { ElementStates } from "../../types/element-states";
import { delay } from "../../utils/utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

interface IRandomArray {
  num: number;
  sorting: string;
}

export const SortingPage: React.FC = () => {
  const [algorithm, setAlgorithm] = useState<string>(Algorithm.SelectionSort);
  const [randomArray, setRandomArray] = useState<IRandomArray[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [direction, setDirection] = useState<Direction>(Direction.Ascending);

  useEffect(() => {
    createNewRandomArray();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let resultArray: IRandomArray[] = []

  const randomNumberBetweenRange = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  const createNewRandomArray = () => {
    const length = randomNumberBetweenRange(3, 17);
    let arr = [];

    for (let i = 0; i < length; i++) {
      arr.push(randomNumberBetweenRange(1, 100));
    }

    arr.forEach(num => {
      const obj = {
        num: num,
        sorting: ElementStates.Default,
      };

      resultArray.push(obj);
    })

    setRandomArray([...resultArray]);
    
    return arr;
  };

  const swap = (arr: IRandomArray[], firstIndex: number, secondIndex: number) => {
    let temp = arr[firstIndex];
    arr[firstIndex] = arr[secondIndex];
    arr[secondIndex] = temp;
  };

  const selectionSort = async (arr: IRandomArray[], minSort = false, maxSort = false) => {
    const { length } = arr;
    
    for (let i = 0; i < length; i++) {
      let index = i;
      arr[index].sorting = ElementStates.Changing;

      for (let j = i + 1; j < length; j++) {
        arr[j].sorting = ElementStates.Changing;
        setRandomArray([...arr]);

        await delay(SHORT_DELAY_IN_MS);

        if (minSort) {
          if (arr[j].num > arr[index].num) {
            index = j;
            arr[j].sorting = ElementStates.Changing;
            arr[index].sorting = i === index ? ElementStates.Changing : ElementStates.Default;
          }
        } else if (maxSort) {
          if (arr[j].num < arr[index].num) {
            index = j;
            arr[j].sorting = ElementStates.Changing;
            arr[index].sorting = i === index ? ElementStates.Changing : ElementStates.Default;
          }
        }
        if (j !== index) {
          arr[j].sorting = ElementStates.Default;
        }
        setRandomArray([...arr])
      }
      if (index !== i) {
        swap(arr, i, index);
      } 
      arr[i].sorting = ElementStates.Modified;
      arr[index].sorting = ElementStates.Modified;
      setRandomArray([...arr]);
    }

    return arr;
  };

  const bubbleSort = async (arr: IRandomArray[], minSort = false, maxSort = false) => {
    const { length } = arr;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].sorting = ElementStates.Changing;
        arr[j + 1].sorting = ElementStates.Changing;
        setRandomArray([...arr]);

        await delay(500);

        if (minSort) {
          if (arr[j].num > arr[j + 1].num) {
            swap(arr, j, j + 1);
            setRandomArray([...arr]);
          }
        } else if (maxSort) {
          if (arr[j].num < arr[j + 1].num) {
            swap(arr, j, j + 1);
            setRandomArray([...arr]);
          }
        }
        arr[j].sorting = ElementStates.Default;
        arr[j + 1].sorting = ElementStates.Default;
        setRandomArray([...arr]);
      }
      arr[length - i - 1].sorting = ElementStates.Modified;
      setRandomArray([...arr]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAlgorithm(e.target.value);
  };

  const handleClickAscending = async () => {
    setIsLoader(true);
    setDirection(Direction.Ascending);

    if (algorithm === Algorithm.SelectionSort) {
      await selectionSort(randomArray, false, true);
    } else {
      await bubbleSort(randomArray, false, true);
    }
    setIsLoader(false);
  };

  const handleClickDescending = async () => {
    setIsLoader(true);
    setDirection(Direction.Descending);

    if (algorithm === Algorithm.SelectionSort) {
      await selectionSort(randomArray, true, false);
    } else {
      await bubbleSort(randomArray, true, false);
    }
    setIsLoader(false);
  };

  const columnElement = randomArray.map((num, i) => (
    <Column 
      key={i}
      index={num.num}
      extraClass={styles.column}
      state={num.sorting === ElementStates.Default ? ElementStates.Default : num.sorting === ElementStates.Changing ? ElementStates.Changing : ElementStates.Modified}
    />
  ));

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.container}>
        <RadioInput 
          label="Выбор" 
          extraClass={styles.selectionRadio} 
          onChange={handleChange}
          name="algorithm"
          value={Algorithm.SelectionSort}
          checked={algorithm === Algorithm.SelectionSort}
        />
        <RadioInput 
          label="Пузырёк" 
          extraClass={styles.bubbleRadio} 
          onChange={handleChange}
          name="algorithm"
          value={Algorithm.BubbleSort}
          checked={algorithm === Algorithm.BubbleSort}
        />
        <Button 
          text="По возрастанию"
          onClick={handleClickAscending}
          disabled={isLoader && direction === Direction.Descending}
          isLoader={isLoader && direction === Direction.Ascending}
          sorting={Direction.Ascending}
          extraClass={styles.ascendingBtn}
        />
        <Button 
          text="По убыванию"
          onClick={handleClickDescending}
          disabled={isLoader && direction === Direction.Ascending}
          isLoader={isLoader && direction === Direction.Descending}
          sorting={Direction.Descending}
          extraClass={styles.descendingBtn}
        />
        <Button 
          text="Новый массив"
          onClick={createNewRandomArray}
          disabled={isLoader}
          extraClass={styles.newArr}
        />
      </div>
      <div className={styles.chart}>
        { columnElement }
      </div>
    </SolutionLayout>
  );
};
