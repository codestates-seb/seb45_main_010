import { Button, DialogHeader } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

type props = {
  title: string;
  arr: string[];
  setItems: (selectItem: string[]) => void;
};

const ReqSelect = ({ title, arr, setItems }: props) => {
  const [isSelect, setIsSelect] = useState<boolean[]>([]);
  const [selectItem, setSelectItem] = useState<string[]>([]);

  const handleCategory = (item: string, index: number): void => {
    const newButtonStates: boolean[] = [...isSelect];
    const newItem: string[] = [...selectItem];
    newButtonStates[index] = !newButtonStates[index];
    newItem[index] = newButtonStates[index] ? item : '';

    setSelectItem(newItem);
    setIsSelect(newButtonStates);
  };
  useEffect(() => {
    setItems(selectItem);
  }, [selectItem]);

  return (
    <>
      <DialogHeader className="p-2 text-sm ">{title}</DialogHeader>
      <section className="flex items-center ">
        {arr?.map((item, index) => {
          return (
            <Button
              key={index}
              onClick={() => handleCategory(item, index)}
              className={`${
                isSelect[index] ? 'bg-gray-3' : 'bg-mint-300'
              } px-3 py-1 m-2 text-sm text-black rounded-2xl `}
              children={item}
            />
          );
        })}
      </section>
    </>
  );
};

export default ReqSelect;
