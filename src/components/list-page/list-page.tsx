import React from "react";

import styles from './list-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";

export const ListPage: React.FC = () => {
  return (
    <SolutionLayout title="Связный список">
      <form className={styles.formContainer}>
        <Input 
          isLimitText={true}
          maxLength={4}
          // value={input}
          // onChange={handleChange}
        />
        <Button 
          text="Добавить в head"
          // onClick={addToQueue}
          // disabled={input.length === 0}
          // isLoader={isLoader.isAdding}
          extraClass={styles.addBtn}
        />
        <Button 
          text="Добавить в tail"
          // onClick={deleteFromQueue}
          // disabled={queue.isEmpty()}
          // isLoader={isLoader.isDeleting}
          extraClass={styles.deleteBtn}
        />
        <Button 
          text="Удалить из head"
          // onClick={clearQueue}
          // disabled={}
          // isLoader={isLoader.isClearing}
        />
        <Button 
          text="Удалить из tail"
          // onClick={clearQueue}
          // disabled={}
          // isLoader={isLoader.isClearing}
        />
      </form>
      <form className={styles.formContainer}>
        <Input 
          isLimitText={true}
          maxLength={4}
          // value={input}
          // onChange={handleChange}
        />
        <Button 
          text="Добавить по индексу"
          // onClick={addToQueue}
          // disabled={input.length === 0}
          // isLoader={isLoader.isAdding}
          extraClass={styles.addBtn}
        />
        <Button 
          text="Удалить по индексу"
          // onClick={deleteFromQueue}
          // disabled={queue.isEmpty()}
          // isLoader={isLoader.isDeleting}
          extraClass={styles.deleteBtn}
        />
      </form>
    </SolutionLayout>
  );
};
