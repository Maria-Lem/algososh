import { useState } from "react";

interface IIsLoader {
  [name: string]: boolean;
}

export function useIsLoader(loaderBtns: IIsLoader = {}) {
  const [isLoader, setIsLoader] = useState<IIsLoader>(loaderBtns);

  const handleIsLoader = (name: string, value: boolean) => {

    setIsLoader(prevState => ({ ...prevState, [name]: value }));
  };

  return { isLoader, handleIsLoader, setIsLoader };
}