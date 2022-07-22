import * as React from 'react';

type ReducersGeneric<State> = {
  [name: string]: (state: State, payload?: any) => State;
};

type Actions<Reducers> = {
  [Name in keyof Reducers]: Action<Reducers[Name]>;
};

type Action<Reducer> = Reducer extends (state: any) => any
  ? () => void
  : Reducer extends (state: any, payload: infer Payload) => void
  ? (payload: Payload) => void
  : unknown;

export function useReducerActions<
  State,
  Reducers extends ReducersGeneric<State>
>({ initialState, reducers }: { initialState: State; reducers: Reducers }) {
  const [state, dispatch] = React.useReducer(
    (state: State, [reducer, payload]: any) => reducer(state, payload),
    initialState
  );

  const actions = React.useMemo(() => {
    return Object.entries(reducers).reduce((a, [name, reducer]) => {
      a[name] = (payload: any) => {
        dispatch([reducer, payload]);
      };
      return a;
    }, {} as any);
  }, []);

  return [state, actions] as [State, Actions<Reducers>];
}
