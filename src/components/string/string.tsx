import React, { ChangeEvent, useState } from "react";

import styles from './string.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";

interface IResultArray {
  letter: string;
  sorting: string;
}

export const StringComponent: React.FC = () => {
  const [input, setInput] = useState('');
  const [stringToReverse, setStringToReverse] = useState<IResultArray[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const inputArray = input.split('');
  const resultArray: IResultArray[] = [];

  inputArray.forEach(elem => {
      const letter = {
        letter: elem,
        sorting: ElementStates.Default,
      };

      resultArray.push(letter);
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    // setStringToReverse([...resultArray]);
  };

  const swap = (inputArray: IResultArray[], firstIndex: number, secondIndex: number) => {
    let temp = inputArray[firstIndex];
    inputArray[firstIndex] = inputArray[secondIndex];
    inputArray[secondIndex] = temp;
  };

  const reverseString = (inputArray: IResultArray[], start: number, end: number, time: number) => {

    setTimeout(() => {
      inputArray[start].sorting = ElementStates.Changing;
      inputArray[end].sorting = ElementStates.Changing;

      setStringToReverse([...inputArray]);
    }, time);

    setTimeout(() => {
      swap(inputArray, start, end);

      inputArray[start].sorting = ElementStates.Modified;
      inputArray[end].sorting = ElementStates.Modified;

      setStringToReverse([...inputArray]);

      if (start + 1 === end || start >= end) {
        setIsLoader(false);
      }
    }, time + 1000);

  }

  const handleClick = () => {
    setIsLoader(true);

    let start = 0;
    let end = inputArray.length - 1;
    let time = 1000;

    setTimeout(() => {
      while(start <= end) {
        reverseString(resultArray, start, end, time);
        start++;
        end--;
        time += 1000;
      }
    }, 100);
  };

  const letterElement = stringToReverse.map((letter, i) => (
    <Circle 
      key={i} 
      letter={letter.letter} 
      state={letter.sorting === ElementStates.Default ? ElementStates.Default : letter.sorting === ElementStates.Changing ? ElementStates.Changing : ElementStates.Modified}
    ></Circle>
  ));

  return (
    <SolutionLayout title="Строка">
      <form className={styles.inputContainer}>
        <Input isLimitText={true} maxLength={11} onChange={handleChange} />
        <Button text="Развернуть" onClick={handleClick} disabled={input.length === 0 ? true : false} isLoader={isLoader} />
      </form>
      <div className={styles.letters}>
        { letterElement }
      </div>
    </SolutionLayout>
  );
};