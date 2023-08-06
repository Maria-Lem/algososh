import { ChangeEvent, useState } from "react";

interface IFormProps {
  [name: string]: string;
}

export function useForm(inputValues: IFormProps) {
  const [form, setForm] = useState<IFormProps>(inputValues);
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prevForm => {
      return {
        ...prevForm,
        [name]: value,
      }
    });
  };

  return { form, handleChange, setForm };
}