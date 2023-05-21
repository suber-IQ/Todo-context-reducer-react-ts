import React, { useReducer } from "react";

// Custom hook for local storage
export const useLocalStorage = <T>(
  key: string,
  defaultValue: T,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  reducer: (state: T, action: any) => T
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): [T, React.Dispatch<any>] => {
  const [state, dispatch] = useReducer(reducer, defaultValue, (initialValue) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  React.useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, dispatch];
};
