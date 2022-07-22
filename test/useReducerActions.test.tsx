import { fireEvent, render, renderHook, screen } from '@testing-library/react';
import { useReducerActions } from '../src';
import React from 'react';
import '@testing-library/jest-dom';

test('returns state and actions', () => {
  const { result } = renderHook(() =>
    useReducerActions({
      initialState: { count: 0 },
      reducers: {
        setCount: (state, count: number) => {
          return {
            ...state,
            count,
          };
        },
      },
    })
  );
  const [state, actions] = result.current;

  expect(state).toStrictEqual({ count: 0 });
  expect(typeof actions.setCount).toBe('function');
});

const Count = () => {
  const [state, actions] = useReducerActions({
    initialState: { count: 0 },
    reducers: {
      setCount: (state, count: number) => {
        return {
          ...state,
          count,
        };
      },
    },
  });

  return (
    <div>
      <div data-testid="count">{state.count}</div>
      <button data-testid="button" onClick={() => actions.setCount(3)}></button>
    </div>
  );
};

test('action updates state properly', () => {
  render(<Count />);

  const count = screen.getByTestId('count');
  const button = screen.getByTestId('button');

  expect(count).toHaveTextContent('0');

  fireEvent.click(button);

  expect(count).toHaveTextContent('3');
});
