import React, { useState } from "react";

import styles from './stack-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { IIsLoader } from "../../types/main";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Stack } from "./stack-class";

import { delay } from "../../utils/utils";
import { useForm } from "../../utils/hooks/useForm";

interface IStackElement {
  item: string;
  state: ElementStates;
}

export const StackPage: React.FC = () => {
  const [stack] = useState(new Stack<IStackElement>());
  const { form, handleChange, setForm } = useForm({ input: '' });
  const [stackArray, setStackArray] = useState<IStackElement[]>([]);
  const [isLoader, setIsLoader] = useState<IIsLoader>({ 
    isAdding: false, 
    isDeleting: false,
    isClearing: false,
  });

  const addToStack = async () => {
    setIsLoader((prevState) => ({ ...prevState, isAdding: true}));
    stack.push({ item: form.input, state: ElementStates.Changing });
    setForm({ ...form, input: '' });
    setStackArray([...stack.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    stack.peek()!.state = ElementStates.Default;
    setStackArray([...stack.getElements()]);
    setIsLoader((prevState) => ({ ...prevState, isAdding: false}));
  };

  const deleteFromStack = async () => {
    setIsLoader((prevState) => ({ ...prevState, isDeleting: true, }));
    stack.peek()!.state = ElementStates.Changing;
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
      <div className={styles.formContainer}>
        <Input 
          isLimitText={true}
          maxLength={4}
          name="input"
          value={form.input}
          onChange={handleChange}
        />
        <Button 
          text="Добавить"
          onClick={addToStack}
          disabled={form.input.length === 0}
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
      </div>

      <div className={styles.stackContainer}>
        { stackElement }
      </div>
    </SolutionLayout>
  );
};
