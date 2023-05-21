import React, { useContext, useState } from 'react'
import { ActionType, TodoContext } from '../context/TodoContext';
import { Todo } from '../context/types';



const AddTodo: React.FC = () => {
    const [title, setTitle] = useState<string>(' ');
    const { dispatch } = useContext(TodoContext);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newTodo: Todo = {
            id: Date.now().toString(),
            title,
            completed: false
        }
        dispatch({ type: ActionType.ADD_TODO, payload: newTodo});
        setTitle(' ');
    }

  return (
   <form onSubmit={handleSubmit}>
      <input type="text" value={title}
       onChange={(e) => setTitle(e.target.value)} placeholder='Enter a new Todo..'
       className='border text-black border-cyan-400 mr-2 p-2 rounded outline-none'
       />
      
     {
        title  === " " ? " " : 
        <button
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
         type='submit'>
          Add
           </button> 
     }
   </form>
  )
}

export default AddTodo