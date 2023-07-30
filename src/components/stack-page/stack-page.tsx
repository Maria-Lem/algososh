import React, { ChangeEvent, useState } from "react";

import styles from './stack-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Stack } from "./stack-class";
import { ElementStates } from "../../types/element-states";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Circle } from "../ui/circle/circle";

interface IStackElement {
  item: string;
  state: ElementStates | null;
}

interface IIsLoader {
  isAdding: boolean;
  isDeleting: boolean;
  isClearing: boolean;
}

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<IStackElement>());
  const [input, setInput] = useState<string>('');
  const [stackArray, setStackArray] = useState<IStackElement[]>([]);
  const [isLoader, setIsLoader] = useState<IIsLoader>({ 
    isAdding: false, 
    isDeleting: false,
    isClearing: false,
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addToStack = async () => {
    setIsLoader((prevState) => ({ ...prevState, isAdding: true}));
    stack.push({ item: input, state: ElementStates.Changing });
    setInput('');
    setStackArray([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    stack.peak()!.state = ElementStates.Default;
    setStackArray([...stack.getElements()]);
    setIsLoader((prevState) => ({ ...prevState, isAdding: false}));
  };

  const deleteFromStack = async () => {
    setIsLoader((prevState) => ({ ...prevState, isDeleting: true, }));
    stack.peak()!.state = ElementStates.Changing;
    setStackArray([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackArray([...stack.getElements()]);
    setIsLoader((prevState) => ({ ...prevState, isDeleting: false}));
  };

  const clearStack = () => {
    setIsLoader((prevState) => ({ ...prevState, isClearing: true}));
    stack.clear();
    setStackArray([...stack.getElements()]);
    setIsLoader((prevState) => ({ ...prevState, isClearing: false}));
  };

  const stackElement = stackArray.map((item, i) => (
    <Circle 
      key={i}
      letter={item.item}
      index={i}
      extraClass={styles.stackElement}
      head={i === stackArray.length - 1 ? 'top' : null}
      state={item.state === ElementStates.Default ? ElementStates.Default : item.state === ElementStates.Changing ? ElementStates.Changing : ElementStates.Modified}
    />
  ))

  return (
    <SolutionLayout title="Стек">
      <form className={styles.formContainer}>
        <Input 
          isLimitText={true}
          maxLength={4}
          value={input}
          onChange={handleChange}
        />
        <Button 
          text="Добавить"
          onClick={addToStack}
          disabled={input.length === 0}
          isLoader={isLoader.isAdding}
          extraClass={styles.addBtn}
        />
        <Button 
          text="Удалить"
          onClick={deleteFromStack}
          disabled={stackArray.length === 0}
          isLoader={isLoader.isDeleting}
          extraClass={styles.deleteBtn}
        />
        <Button 
          text="Очистить"
          onClick={clearStack}
          disabled={stackArray.length === 0}
          isLoader={isLoader.isClearing}
        />
      </form>

      <div className={styles.stackContainer}>
        { stackElement }
      </div>
    </SolutionLayout>
  );
};
