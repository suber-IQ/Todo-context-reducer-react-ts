import React, { createContext} from 'react';
import { Todo } from './types';
import { todoReducer } from './TodoReducer';
import { useLocalStorage } from '../hooks/useLocalstorage';


// Define the initial state
const initialState: Todo[] = [];

// Define The actions
export enum ActionType{
    ADD_TODO = 'ADD_TODO',
    DELETE_TODO = 'DELETE_TODO',
    UPDATE_TODO = 'UPDATE_TODO',
}

interface AddTodoAction{
    type: ActionType.ADD_TODO;
    payload: Todo;
}

interface DeleteTodoAction {
    type: ActionType.DELETE_TODO;
    payload: string; // ID of the todo
}

interface UpdateTodoAction {
    type: ActionType.UPDATE_TODO
    payload: Todo;
}


export type TodoAction = AddTodoAction | DeleteTodoAction | UpdateTodoAction


// create the context

const TodoContext = createContext<{
    todos: Todo[];
    dispatch: React.Dispatch<TodoAction>;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  }>({ todos: initialState, dispatch: () => {} });

 export type TodoProviderProps = {
    children: React.ReactNode;
  };
  
// create the provider component
const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
    // const [todos, dispatch] = useReducer(todoReducer, initialState);
    const [todos, dispatch] = useLocalStorage('todos',initialState,todoReducer);
    return (
        <TodoContext.Provider value={{ todos, dispatch}}>
            {children}
        </TodoContext.Provider>
    )
}



export { TodoContext, TodoProvider };