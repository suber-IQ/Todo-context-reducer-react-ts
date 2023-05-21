import React from 'react';
import './App.css';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import { TodoProvider } from './context/TodoContext';


const App: React.FC = () => {


  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">CRUD App</h1>
      <TodoProvider>
        <AddTodo />
        <TodoList />
      </TodoProvider>
    </div>
  );
};

export default App;
