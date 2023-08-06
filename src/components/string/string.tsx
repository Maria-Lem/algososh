import React, { useState } from "react";

import styles from './string.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { IResultArray } from "../../types/main";
import { DELAY_IN_MS } from "../../constants/delays";

import { useForm } from "../../utils/hooks/useForm";
import { swap } from "../../utils/utils";

export const StringComponent: React.FC = () => {
  const { form, handleChange, setForm } = useForm({ input: '' });
  const [stringToReverse, setStringToReverse] = useState<IResultArray[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const inputArray = form.input.split('');
  const resultArray: IResultArray[] = [];

  inputArray.forEach(elem => {
      const letter = {
        value: elem,
        state: ElementStates.Default,
      };

      resultArray.push(letter);
  });

  const reverseString = (inputArray: IResultArray[], start: number, end: number, time: number) => {

    setTimeout(() => {
      inputArray[start].state = ElementStates.Changing;
      inputArray[end].state = ElementStates.Changing;

      setStringToReverse([...inputArray]);
    }, time);

    setTimeout(() => {
      swap(inputArray, start, end);

      inputArray[start].state = ElementStates.Modified;
      inputArray[end].state = ElementStates.Modified;

      setStringToReverse([...inputArray]);

      if (start + 1 === end || start >= end) {
        setForm({ ...form, input: '' });
        setIsLoader(false);
      }
    }, time + 1000);

  };

  const handleClick = () => {
    setIsLoader(true);

    let start = 0;
    let end = inputArray.length - 1;
    let time = DELAY_IN_MS;

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
      letter={letter.value} 
      state={letter.state === ElementStates.Default ? ElementStates.Default : letter.state === ElementStates.Changing ? ElementStates.Changing : ElementStates.Modified}
    ></Circle>
  ));

  return (
    <SolutionLayout title="Строка">
      <form className={styles.inputContainer}>
        <Input 
          isLimitText={true} 
          maxLength={11} 
          name="input"
          value={form.input} 
          onChange={handleChange} 
        />
        <Button text="Развернуть" onClick={handleClick} disabled={form.input.length === 0 ? true : false} isLoader={isLoader} />
      </form>
      <div className={styles.letters}>
        { letterElement }
      </div>
    </SolutionLayout>
  );
};