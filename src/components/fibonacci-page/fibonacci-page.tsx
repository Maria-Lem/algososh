import React, { useState } from "react";

import styles from './fibonacci-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { useForm } from "../../utils/hooks/useForm";

export const FibonacciPage: React.FC = () => {
  const { form, handleChange, setForm } = useForm({ input: '' });
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
          setForm({ ...form, input: '' });
          setIsLoader(false);
        }
      }, i * SHORT_DELAY_IN_MS);
    }
    return arr;
  };

  const handleClick = () => {
    let currentNumber = 0;
    setIsLoader(true);

    setTimeout(() => {
      while (currentNumber <= Number(form.input)) {
        fibonacciSequence(Number(form.input));
        currentNumber++;
      }
    }, SHORT_DELAY_IN_MS);
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
        <Input 
          type="number" 
          isLimitText={true} 
          max={19} 
          onChange={handleChange} 
          name="input"
          value={form.input}
        />
        <Button 
          text="Рассчитать" 
          onClick={handleClick} 
          disabled={Number(form.input) === 0 || Number(form.input) > 19 || form.input.length === 0 ? true : false}
          isLoader={isLoader}
        />
      </form>
      <div className={styles.sequence}>
        { sequenceElement }
      </div>
    </SolutionLayout>
  );
};
