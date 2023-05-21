import { TodoAction, ActionType } from './TodoContext';
import { Todo } from './types';

export const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
  switch (action.type) {
    case ActionType.ADD_TODO:
      return [...state, action.payload];
    case ActionType.DELETE_TODO:
      return state.filter(todo => todo.id !== action.payload);
    case ActionType.UPDATE_TODO:
      return state.map(todo =>
        todo.id === action.payload.id ? action.payload : todo
      );
    default:
      return state;
  }
};
