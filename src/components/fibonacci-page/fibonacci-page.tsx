import React, {ChangeEvent, useState} from "react";

import styles from './fibonacci-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

export const FibonacciPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [sequence, setSequence] = useState<number[]>([]);
  const [isLoader, setIsLoader] = useState(false);

  const fibonacciSequence = (n: number): number[] => {
    let arr: number[] = [];

    for (let i = 0; i < n + 1; i++) {
      setTimeout(() => {
        if (i === 0) {
          arr.push(1);
          setSequence([...arr]);
        } else if (i === 1) {
          arr.push(1);
          setSequence([...arr]);
        } else {
          arr.push(arr[i - 1] + arr[i - 2]);
          setSequence([...arr]);
        }

        if (i === n) {
          setIsLoader(false);
        }
      }, i * 500);
    }
    return arr;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    let currentNumber = 0;
    setIsLoader(true);

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
          isLoader={isLoader}
        />
      </form>
      <div className={styles.sequence}>
        { sequenceElement }
      </div>
    </SolutionLayout>
  );
};
