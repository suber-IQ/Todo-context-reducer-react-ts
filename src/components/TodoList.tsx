import React, { useContext, useState } from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import {  MdEditAttributes } from 'react-icons/md';
import {  GiCancel } from 'react-icons/gi';
import { ActionType, TodoContext } from '../context/TodoContext';

const TodoList: React.FC = () => {
  const { todos, dispatch } = useContext(TodoContext);
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
  const [updatedTodoTitle, setUpdatedTodoTitle] = useState('');

  const handleDelete = (id: string) => {
    dispatch({ type: ActionType.DELETE_TODO, payload: id });
  };

  const handleEdit = (id: string) => {
    setEditingTodoId(id);
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
      setUpdatedTodoTitle(todo.title);
    }
  };

  const handleUpdate = (id: string) => {
    if (updatedTodoTitle.trim() === '') {
      return;
    }

    dispatch({
      type: ActionType.UPDATE_TODO,
      payload: { id, title: updatedTodoTitle, completed: false }
    });

    setEditingTodoId(null);
    setUpdatedTodoTitle('');
  };

  const handleCancel = () => {
    setEditingTodoId(null);
    setUpdatedTodoTitle('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdatedTodoTitle(e.target.value);
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} className="flex justify-between shadow w-2/6 p-2 mt-5">
          {editingTodoId === todo.id ? (
            <input
              type="text"
              value={updatedTodoTitle}
              onChange={handleTitleChange}
              className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
            />
          ) : (
            <span className='overflow-auto'>{todo.title}</span>
          )}
          <div>
            {editingTodoId === todo.id ? (
              <>
                <MdEditAttributes
                size="33"
                 className="ml-2 mb-2"
                  onClick={() => handleUpdate(todo.id)}
                  
                />
                
                <GiCancel
                size="33"

                   className="ml-2 mt-2"
                  onClick={handleCancel}
                />
              </>
            ) : (
              <div className='flex'>
                <AiOutlineEdit
                  onClick={() => handleEdit(todo.id)}
                  color="blue"
                  size="20"
                  className="mr-2 cursor-pointer"
                />
                <AiOutlineDelete
                  onClick={() => handleDelete(todo.id)}
                  color="red"
                  size="20"
                  className="cursor-pointer"
                />
              </div>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
