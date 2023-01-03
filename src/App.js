import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const firstRender = useRef(true);
  const initialValue = [
    { id: uuidv4(), text: " --- Select a State ---" }];
  const [ inputValue, setInputValue ] = useState('');
  const [todos, setTodos ] = useState([ ]);

  


  const addTodo = (e) => {
    e.preventDefault();
    console.log("test")

    console.log(todos)
    if(inputValue !== "" && todos != undefined){
      setTodos([...todos, {
        text: inputValue,
        id:uuidv4()
      }
    ])
    }
  setInputValue('');
  }

  const removeTodo = (id) =>{
      setTodos(todos.filter(todo=> todo.id !== id))
  }

  useEffect(()=>{
    if(firstRender.current){
      
      firstRender.current = false;
    }
    else{
      
      localStorage.setItem("todo",JSON.stringify([...todos]));
    }
  },[todos]);

  useEffect(()=>{
    if(localStorage.getItem("todo") != null){
     const newTodos = localStorage.getItem("todo");
      console.log("newTodos : ", newTodos)
      setTodos(JSON.parse([...todos, newTodos]));
    }
    
  }, []);

  return (
    <div className="App">
      <div className="container">
        <form onSubmit={addTodo}>
          <input type="text"
          autoFocus
            placeholder="Add a Title" value={inputValue}
           onChange ={(e)=> setInputValue(e.target.value)}
          />

          <button type="submit">Add</button>
        </form>
        {todos.map((todo)=>(
          <div key= {todo.id} className ="todo">
            <p>{todo.text} 
            </p>
            <i onClick={()=>removeTodo(todo.id)} className="fa fa-calendar" aria-hidden="true"></i>
            </div>
        ))}
      </div>
    </div>
  );
}

export default App;
