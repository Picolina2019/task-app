import React from 'react';
import './App.css';

function Todo({todo, toggleTodo}) {
  
    return (
        <div className='todo'>
            <label className='todoInput'>
            <input type='checkbox'  checked={todo.isCompleted} onChange={()=>toggleTodo(todo.id)}/>
            <span className='span'></span> 
            <span>{todo.text}</span>
            </label>
        </div>
    )
}

export default Todo
