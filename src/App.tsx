import React, { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todos } from './model'
import TodoList from './components/TodoList'



const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todos[]>([])
  //const [completedTodos, setCompletedTodos] = useState<Todos[]>([])
  
  
  const handleAdd = (e: React.FormEvent) => { // contextual typing
    e.preventDefault()

    if(todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]) // todo is actually --> todo: todo 
      setTodo("")
    }
  }

  console.log(todos)

  return  ( // prop drilling is used to pass todo, setTodo and handleAdd to InputField component
    <div className="App">
      <span className="heading">Taskydo</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} /> 
      <TodoList todos={todos} setTodos={setTodos} />

    </div>
  )
}

export default App;
