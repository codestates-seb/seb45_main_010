import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import React from 'react';
import { abcd, selectCount } from 'redux/slice/CounterSlice';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div>
        <button aria-label="Increment value" onClick={() => dispatch(abcd.increment())}>
          Increment
        </button>
        <button onClick={() => dispatch(abcd.incrementByAmount(10))}>incrementByAmount</button>
        <span>{count.value}</span>
        <button aria-label="Decrement value" onClick={() => dispatch(abcd.decrement())}>
          Decrement
        </button>
      </div>
    </div>
  );
}
