import React, {ChangeEvent, useState} from "react";

import styles from './fibonacci-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [sequence, setSequence] = useState<number[]>([]);

  const fibonacciSequence = (n: number): number[] => {
    let arr: number[] = [1, 1];

    // let i = 0;

    // setTimeout(() => {
    //   while (i < 2) {
    //     console.log('first i: ', i);
    //     arr.push(1);
    //     setSequence([...arr]);
    //     i++;
    //   } 

    //   return arr;
    // }, i * 500);

    for (let i = 2; i < n + 1; i++) {
      setTimeout(() => {
        arr.push(arr[i - 1] + arr[i - 2]);
        setSequence([...arr]);
      }, i * 500);
    }
    return arr;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    let currentNumber = 0;
    
    setTimeout(() => {
      while (currentNumber <= Number(input)) {
        fibonacciSequence(Number(input));
        currentNumber++;
      }

    }, 500);
  };

  const sequenceElement = sequence.map((num, i) => (
    <Circle 
      key={i}
      letter={String(num)}
      index={i}
    ></Circle>
  ))

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.formContainer}>
        <Input type="number" isLimitText={true} max={19} onChange={handleChange} />
        <Button 
          text="Рассчитать" 
          onClick={handleClick} 
          disabled={Number(input) === 0 || Number(input) > 19 || input.length === 0 ? true : false} 
        />
      </form>
      <div className={styles.sequence}>
        { sequenceElement }
      </div>
    </SolutionLayout>
  );
};
