import React, { useEffect, useState } from "react";

import styles from './queue-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";

import { ElementStates } from "../../types/element-states";
import { IQueueElement } from "../../types/queue";
import { IIsLoader } from "../../types/main";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

import { Queue } from "./queue-class";

import { delay } from "../../utils/utils";
import { useForm } from "../../utils/hooks/useForm";
// import { useIsLoader } from "../../utils/hooks/useIsLoader";

export const QueuePage: React.FC = () => {
  const [queue] = useState(new Queue<IQueueElement>(7));
  const { form, handleChange, setForm } = useForm({ input: '' });
  // const { isLoader, handleIsLoader, setIsLoader } = useIsLoader({
  //   isAdding: false, 
  //   isDeleting: false,
  //   isClearing: false,
  // });
  // console.log('isLoader: ', isLoader);
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

  const addToQueue = async () => {
    setIsLoader({ ...isLoader, isAdding: true});
    queue.enqueue({ item: form.input, state: ElementStates.Changing });
    setForm({ ...form, input: '' });
    setQueueArray([...queue.getElements()]);

    await delay(SHORT_DELAY_IN_MS);
    queue.getElements()[queue.getTail() - 1].state = ElementStates.Default;
    setQueueArray([...queue.getElements()]);
    setIsLoader({ ...isLoader, isAdding: false});
  };

  const deleteFromQueue = async () => {
    setIsLoader({ ...isLoader, isDeleting: true, });
    queue.getElements()[queue.getHead()].state = ElementStates.Changing;
    setQueueArray([...queue.getElements()]);

    await delay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setQueueArray([...queue.getElements()]);
    setIsLoader({ ...isLoader, isDeleting: false});
  };

  const clearQueue = () => {
    setIsLoader({ ...isLoader, isClearing: true});
    queue.clear();
    setQueueArray([...queue.getElements()]);
    setIsLoader({ ...isLoader, isClearing: false});
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
          onClick={addToQueue}
          disabled={queue.getTail() === queue.getSize() || form.input.length === 0}
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
      </div>

      <div className={styles.queueContainer}>
        { queueElement }
      </div>
    </SolutionLayout>
  );
};
