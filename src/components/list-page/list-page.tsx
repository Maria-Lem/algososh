import React, { useEffect, useState } from "react";

import styles from './list-page.module.css';

import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ArrowIcon } from "../ui/icons/arrow-icon";

import { LinkedList } from "./list-class";

import { ElementStates } from "../../types/element-states";
import { IIsLoader } from "../../types/main";
import { ILinkedListElement } from "../../types/list";
import { DELAY_IN_MS, SHORT_DELAY_IN_MS } from "../../constants/delays";

import { useForm } from "../../utils/hooks/useForm";
import { delay, randomNumberBetweenRange } from "../../utils/utils";

export const ListPage: React.FC = () => {
  const { form, handleChange, setForm } = useForm({
    inputValue: '',
    inputIndex: '',
  });

  const [linkedListArray, setLinkedListArray] = useState<ILinkedListElement[]>([]);
  const [smallCircle, setSmallCircle] = useState<string>('');
  const [isSmallCircleTop, setIsSmallCircleTop] = useState<boolean>(false);
  const [isSmallCircleBottom, setIsSmallCircleBottom] = useState<boolean>(false);
  const [valueNotValid, setValueNotValid] = useState<boolean>(false);
  const [indexNotValid, setIndexNotValid] = useState<boolean>(false);
  const [isAddingToEmpty, setIsAddingToEmpty] = useState<boolean>(false);
  const [isLoader, setIsLoader] = useState<IIsLoader>({ 
    inputs: false,
    disableAll: false,
    isAddingToHead: false, 
    isAddingToTail: false, 
    isRemovingFromHead: false,
    isRemovingFromTail: false,
    isInsertingByIndex: false,
    isRemovingByIndex: false,
  });

  //Creating initial array
  const createInitialArray = () => {
    let arr = [];

    for (let i = 0; i < 4; i++) {
      arr.push({
        value: String(randomNumberBetweenRange(1, 99)),
        state: ElementStates.Default,
        isSmallCircleTop: false,
        isSmallCircleBottom: false,
      });
    }

    return arr;
  };

  // New linked list class
  const [list] = useState(new LinkedList<ILinkedListElement>(createInitialArray()));
  console.log('list: ', list);

  // Setting initial array on first render
  useEffect(() => {
    setLinkedListArray(list.printArrayFromLinkedList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Inputs validation
    useEffect(() => {
      setValueNotValid(form.inputValue.length === 0);

      let index = Number(form.inputIndex);

      if (form.inputIndex.length === 0 || index < 0 || index > list.getSize() - 1) {
        setIndexNotValid(true);
      } else {
        setIndexNotValid(false);
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [form.inputIndex, form.inputValue]);

    // Setting if linked list is empty
    useEffect(() => {
      if (linkedListArray.length === 0) {
        setIsAddingToEmpty(true)
      } else {
        setIsAddingToEmpty(false)
      }
    }, [linkedListArray]);

  // Adding to the head
  const handleAddToHead = async () => {
    
    if (linkedListArray.length === 0) {
      setIsAddingToEmpty(true)
      list.addToHead({
        value: '',
        state: ElementStates.Changing,
        isSmallCircleTop: false,
        isSmallCircleBottom: false,
      });
    } 

    list.getHead()!.value.isSmallCircleTop = true;
    setSmallCircle(form.inputValue);
    setIsSmallCircleTop(true);
    setIsLoader({ ...isLoader, inputs: true, disableAll: true, isAddingToHead: true })
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(SHORT_DELAY_IN_MS);
    setSmallCircle('');
    setIsSmallCircleTop(false);

    if (!isAddingToEmpty) {
      list.addToHead({
        value: form.inputValue,
        state: ElementStates.Changing,
        isSmallCircleTop: false,
        isSmallCircleBottom: false,
      });
      list.printArrayFromLinkedList()[1].isSmallCircleTop = false;
    } else if (isAddingToEmpty) {
      list.printArrayFromLinkedList()[0].value = form.inputValue;
      setIsAddingToEmpty(false);
    }
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(SHORT_DELAY_IN_MS);
    setForm({ ...form, inputValue: ''});
    setIsLoader({ ...isLoader, inputs: false, disableAll: false, isAddingToHead: false })
    list.getHead()!.value.state = ElementStates.Default;
    setLinkedListArray([...list.printArrayFromLinkedList()]);
  };

  // Adding to the tail
  const handleAddToTail = async () => {
    if (linkedListArray.length === 0) {
      setIsAddingToEmpty(true)
      list.addToTail({
        value: '',
        state: ElementStates.Changing,
        isSmallCircleTop: false,
        isSmallCircleBottom: false,
      });
    } 

    list.getTail()!.value.isSmallCircleTop = true;
    setSmallCircle(form.inputValue);
    setIsSmallCircleTop(true);
    setIsLoader({ ...isLoader, inputs: true, disableAll: true, isAddingToTail: true })
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(SHORT_DELAY_IN_MS);
    setSmallCircle('');
    setIsSmallCircleTop(false);
    if (!isAddingToEmpty) {
      list.addToTail({ 
        value: form.inputValue, 
        state: ElementStates.Modified,
        isSmallCircleTop: false,
        isSmallCircleBottom: false,
      });
      
      list.printArrayFromLinkedList()[list.getSize() - 2].isSmallCircleTop = false;
    } else if (isAddingToEmpty) {
      list.printArrayFromLinkedList()[0].value = form.inputValue;
      setIsAddingToEmpty(false);
    }
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(SHORT_DELAY_IN_MS);
    setForm({ ...form, inputValue: ''});
    setIsLoader({ ...isLoader, inputs: false, disableAll: false, isAddingToTail: false })
    list.getTail()!.value.state = ElementStates.Default;
    setLinkedListArray([...list.printArrayFromLinkedList()]);
  };

  // Remove from the head
  const handleRemoveFromHead = async () => {
    list.getHead()!.value.isSmallCircleBottom = true;
    setSmallCircle(list.getHead()!.value.value);
    list.getHead()!.value.value = '';
    setIsLoader({ ...isLoader, inputs: true, disableAll: true, isRemovingFromHead: true })
    setIsSmallCircleBottom(true);
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(SHORT_DELAY_IN_MS);
    list.removeFromHead();
    setIsLoader({ ...isLoader, inputs: false, disableAll: false, isRemovingFromHead: false })
    setSmallCircle('');
    setIsSmallCircleBottom(false);
    setLinkedListArray([...list.printArrayFromLinkedList()]);
  };

  // Remove fom the tail
  const handleRemoveFromTail = async () => {
    list.getTail()!.value.isSmallCircleBottom = true;
    setSmallCircle(list.getTail()!.value.value);
    setIsLoader({ ...isLoader, inputs: true, disableAll: true, isRemovingFromTail: true })
    list.getTail()!.value.value = '';
    setIsSmallCircleBottom(true);
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(SHORT_DELAY_IN_MS);
    list.removeFromTail();
    setIsLoader({ ...isLoader, inputs: false, disableAll: false, isRemovingFromTail: false })
    setSmallCircle('');
    setIsSmallCircleBottom(false);
    setLinkedListArray([...list.printArrayFromLinkedList()]);
  };

  // Insert new element at an entered index
  const handleInsertAtIndex = async () => {
    const newElement = {
      value: form.inputValue,
      state: ElementStates.Modified,
      isSmallCircleTop: false,
      isSmallCircleBottom: false,
    };
    const index = Number(form.inputIndex);

    setSmallCircle(form.inputValue);
    setIsSmallCircleTop(true);
    setIsLoader({ ...isLoader, inputs: true, disableAll: true, isInsertingByIndex: true })
    
    for (let i = 0; i <= index; i++) {
      list.printArrayFromLinkedList()[i].isSmallCircleTop = true;
      setLinkedListArray([...list.printArrayFromLinkedList()]);
      await delay(DELAY_IN_MS);
      list.printArrayFromLinkedList()[i].isSmallCircleTop = false;
      if (i !== index) {
        list.printArrayFromLinkedList()[i].state = ElementStates.Changing;
      }
    }

    for (let i = 0; i < index; i++) {
      list.printArrayFromLinkedList()[i].state = ElementStates.Default;
    }
    list.insertAtIndex(newElement, Number(form.inputIndex));
    setSmallCircle('');
    setIsSmallCircleTop(false);
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(DELAY_IN_MS);
    list.printArrayFromLinkedList()[index].state = ElementStates.Default;
    setLinkedListArray([...list.printArrayFromLinkedList()]);
    setIsLoader({ ...isLoader, inputs: false, disableAll: false, isInsertingByIndex: false })
    setForm({ inputValue: '', inputIndex: ''});
  };

  // Removing element at an entered index
  const handleRemoveByIndex = async () => {
    const index = Number(form.inputIndex);
    const value = list.printArrayFromLinkedList()[index].value;
    setIsLoader({ ...isLoader, inputs: true, disableAll: true, isRemovingByIndex: true })

    for (let i = 0; i <= index; i++) {
      list.printArrayFromLinkedList()[i].state = ElementStates.Changing;
      setLinkedListArray([...list.printArrayFromLinkedList()]);
      
      await delay(DELAY_IN_MS);
    }

    list.printArrayFromLinkedList()[index].state = ElementStates.Default;
    list.printArrayFromLinkedList()[index].value = '';
    list.printArrayFromLinkedList()[index].isSmallCircleBottom = true;
    setSmallCircle(value);
    setIsSmallCircleBottom(true);
    setLinkedListArray([...list.printArrayFromLinkedList()]);

    await delay(DELAY_IN_MS);
    for (let i = 0; i < index; i++) {
      list.printArrayFromLinkedList()[i].state = ElementStates.Default;
    }
    list.removeByIndex(index);
    setSmallCircle('');
    setIsSmallCircleBottom(false);
    setLinkedListArray([...list.printArrayFromLinkedList()]);
    setForm({ inputValue: '', inputIndex: ''});
    setIsLoader({ ...isLoader, inputs: false, disableAll: false, isRemovingByIndex: false })
  };


  // Rendering linked list elements
  const linkedListElement = linkedListArray.map((listItem, i) => (
    <div key={i} className={styles.circleContainer}>
      {
        isSmallCircleTop && listItem.isSmallCircleTop &&
          <Circle 
            state={ElementStates.Changing} 
            letter={smallCircle}
            isSmall={true}
            extraClass={styles.circleTop}
          />
      }
      <Circle 
        index={i}
        letter={listItem.value}
        head={i === 0 ? 'head' : null}
        tail={i === (list.getSize() - 1) ? 'tail' : null}
        state={listItem.state === ElementStates.Default ? ElementStates.Default : listItem.state === ElementStates.Changing ? ElementStates.Changing : ElementStates.Modified}
      />
      {
        isSmallCircleBottom && listItem.isSmallCircleBottom &&
          <Circle 
            state={ElementStates.Changing} 
            letter={smallCircle}
            isSmall={true}
            extraClass={styles.circleBottom}
          />
      }
      {
        i !== (list.getSize() - 1) 
          ? <ArrowIcon extraClass={styles.arrowIcon} /> 
          : null
      }
    </div>
  ));
  
  return (
    <SolutionLayout title="Связный список">
      <div>
        <div className={styles.formContainer}>
          <Input 
            isLimitText={true}
            maxLength={4}
            name="inputValue"
            value={form.inputValue}
            onChange={handleChange}
            disabled={isLoader.inputs}
            placeholder="Введите значение"
          />
          <Button 
            text="Добавить в head"
            onClick={handleAddToHead}
            disabled={
              valueNotValid || 
              (!isLoader.isAddingToHead && isLoader.disableAll)
            }
            isLoader={isLoader.isAddingToHead}
            extraClass={`${styles.button} ${styles.valueBtn}`}
          />
          <Button 
            text="Добавить в tail"
            onClick={handleAddToTail}
            disabled={
              valueNotValid || 
              (!isLoader.isAddingToTail && isLoader.disableAll)
            }
            isLoader={isLoader.isAddingToTail}
            extraClass={`${styles.button} ${styles.valueBtn}`}
          />
          <Button 
            text="Удалить из head"
            onClick={handleRemoveFromHead}
            disabled={
              list.getSize() === 0 || 
              (!isLoader.isRemovingFromHead && isLoader.disableAll)
            }
            isLoader={isLoader.isRemovingFromHead}
            extraClass={`${styles.button} ${styles.valueBtn}`}
          />
          <Button 
            text="Удалить из tail"
            onClick={handleRemoveFromTail}
            disabled={
              list.getSize() === 0 || 
              (!isLoader.isRemovingFromTail && isLoader.disableAll)
            }
            isLoader={isLoader.isRemovingFromTail}
            extraClass={`${styles.button} ${styles.valueBtn}`}
          />
        </div>
        <div className={styles.formContainer}>
          <Input 
            type="number"
            name="inputIndex"
            value={form.inputIndex}
            onChange={handleChange}
            placeholder="Введите индекс"
          />
          <Button 
            text="Добавить по индексу"
            onClick={handleInsertAtIndex}
            disabled={
              (indexNotValid || valueNotValid) || 
              (!isLoader.isInsertingByIndex && isLoader.disableAll)
            }
            isLoader={isLoader.isInsertingByIndex}
            extraClass={`${styles.button} ${styles.indexBtn}`}
          />
          <Button 
            text="Удалить по индексу"
            onClick={handleRemoveByIndex}
            disabled={
              indexNotValid || list.getSize() === 0 || 
              (!isLoader.isRemovingByIndex && isLoader.disableAll)
            }
            isLoader={isLoader.isRemovingByIndex}
            extraClass={`${styles.button} ${styles.indexBtn}`}
          />
        </div>
      </div>

      <div className={styles.linkedListContainer}>
        { linkedListElement }
      </div>
    </SolutionLayout>
  );
};