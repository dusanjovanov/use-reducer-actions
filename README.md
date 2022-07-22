# use-reducer-actions

Hook which simplifies `useReducer`

<br />

[![npm](https://img.shields.io/npm/v/@dusanjovanov/use-reducer-actions?color=%231E90FF&label=npm&style=for-the-badge)](https://www.npmjs.com/package/@dusanjovanov/use-reducer-actions)

```bash
npm i @dusanjovanov/use-reducer-actions
```

```bash
yarn add @dusanjovanov/use-reducer-actions
```

## Features

- Tiny `312B`
- Full Typescript support

## Usage

```tsx
import { useReducerActions } from '@dusanjovanov/use-reducer-actions';

const Counter = () => {
  const [state, actions] = useReducerActions({
    initialState: {
      count: 0,
    },
    reducers: {
      increment: state => {
        return {
          ...state,
          count: state.count + 1,
        };
      },
      setCount: (state, payload: number) => {
        return {
          ...state,
          count: payload,
        };
      },
    },
  });

  return (
    <div>
      <div>Count: {state.count}</div>
      <button onClick={actions.increment}>Increment</button>
      <button onClick={() => actions.setCount(3)}>Set count to 3</button>
    </div>
  );
};
```
