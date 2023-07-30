import React, { ChangeEvent, useState } from "react";

import styles from './queue-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const QueuePage: React.FC = () => {
  const [input, setInput] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.formContainer}>
        <Input 
          isLimitText={true}
          maxLength={4}
          onChange={handleChange}
        />
        <Button 
          text="Добавить"
          // onClick={addToStack}
          // disabled={}
          // isLoader={isLoader}
          extraClass={styles.addBtn}
        />
        <Button 
          text="Удалить"
          // onClick={deleteFromStack}
          // disabled={}
          // isLoader={isLoader}
          extraClass={styles.deleteBtn}
        />
        <Button 
          text="Очистить"
          // onClick={clearStack}
          // disabled={}
          // isLoader={isLoader}
          // extraClass={styles.}
        />
      </form>
    </SolutionLayout>
  );
};
