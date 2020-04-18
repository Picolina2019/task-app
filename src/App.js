import React, {useState,useEffect} from 'react';
import Todos from './Todos';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const LS_KEY = 'todos';
function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  useEffect(() => {
    const newTodos = JSON.parse(localStorage.getItem(LS_KEY));
    if (newTodos) setTodos(newTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos));
  }, [todos]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!input) return;
    addTodo(input);
    setInput('');
  };

  const addTodo = (text) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { id: uuidv4(), text: text, isCompleted: false }];
    });
  };

  const toggleTodo = (id) => {
    const newTodo = [...todos];
    const todo = newTodo.find((todo) => todo.id === id);
    todo.isCompleted = !todo.isCompleted;
    setTodos(newTodo);
  };
  const deleteTodo = () => {
    const newTodos = todos.filter((todo) => !todo.isCompleted);
    setTodos(newTodos);
  };

  return (
    <div className='App'>
      <form onSubmit={submitHandler}>
        <h1>Task Manager</h1>
        <input
          className='input'
          type='text'
          placeholder='Enter tasks...'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className='addButton' type='submit'>Add </button>
      </form>
     
      {!todos.length ? (
        <p className='noTodos'>No tasks...add some</p>
      ) : (
        <>
          <Todos toggleTodo={toggleTodo} todos={todos} />
          <div className='left'>
           - {todos.filter((todo) => !todo.isCompleted).length} tasks left -
          </div>
          <div>
          <button className='delete' onClick={deleteTodo}>Delete completed</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
