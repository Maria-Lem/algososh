import React, { ChangeEvent, useEffect, useState } from "react";

import styles from './queue-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementStates } from "../../types/element-states";
import { IQueueElement } from "../../types/queue";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { delay } from "../../utils/utils";
import { Queue } from "./queue-class";
import { IIsLoader } from "../../types/main";

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<IQueueElement>(7));
  const [input, setInput] = useState('');
  const [queueArray, setQueueArray] = useState<IQueueElement[]>([]);
  const [isLoader, setIsLoader] = useState<IIsLoader>({ 
    isAdding: false, 
    isDeleting: false,
    isClearing: false,
  });

  useEffect(() => {
    setQueueArray([...queue.getElements()]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const addToQueue = async () => {
    setIsLoader((prevState) => ({ ...prevState, isAdding: true}));
    queue.enqueue({ item: input, state: ElementStates.Changing });
    setInput('');
    setQueueArray([...queue.getElements()]);

    await delay(SHORT_DELAY_IN_MS);
    queue.getElements()[queue.getTail() - 1].state = ElementStates.Default;
    setQueueArray([...queue.getElements()]);
    setIsLoader((prevState) => ({ ...prevState, isAdding: false}));
  };

  const deleteFromQueue = async () => {
    setIsLoader((prevState) => ({ ...prevState, isDeleting: true, }));
    queue.getElements()[queue.getHead()].state = ElementStates.Changing;
    setQueueArray([...queue.getElements()]);
    await delay(SHORT_DELAY_IN_MS);

    queue.dequeue();
    setQueueArray([...queue.getElements()]);
    setIsLoader((prevState) => ({ ...prevState, isDeleting: false}));
  };

  const clearQueue = () => {
    setIsLoader((prevState) => ({ ...prevState, isClearing: true}));
    queue.clear();
    setQueueArray([...queue.getElements()]);
    setIsLoader((prevState) => ({ ...prevState, isClearing: false}));
  };

  const queueElement = queueArray.map((item, i) => (
    <Circle 
      key={i}
      letter={item.item}
      index={i}
      head={i === queue.getHead() && !queue.isEmpty() ? 'head' : null}
      tail={i === queue.getTail() - 1 && !queue.isEmpty() ? 'tail' : null}
      state={item.state === ElementStates.Default ? ElementStates.Default : item.state === ElementStates.Changing ? ElementStates.Changing : ElementStates.Modified}
      extraClass={styles.queueElement}
    />
  ));

  return (
    <SolutionLayout title="Очередь">
      <form className={styles.formContainer}>
        <Input 
          isLimitText={true}
          maxLength={4}
          value={input}
          onChange={handleChange}
        />
        <Button 
          text="Добавить"
          onClick={addToQueue}
          disabled={input.length === 0}
          isLoader={isLoader.isAdding}
          extraClass={styles.addBtn}
        />
        <Button 
          text="Удалить"
          onClick={deleteFromQueue}
          disabled={queue.isEmpty()}
          isLoader={isLoader.isDeleting}
          extraClass={styles.deleteBtn}
        />
        <Button 
          text="Очистить"
          onClick={clearQueue}
          isLoader={isLoader.isClearing}
        />
      </form>

      <div className={styles.queueContainer}>
        { queueElement }
      </div>
    </SolutionLayout>
  );
};
