import React, { useState } from 'react'
import './App.css'
import InputField from './components/InputField'
import { Todos } from './model'
import TodoList from './components/TodoList'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'



const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Todos[]>([])
  const [completedTodos, setCompletedTodos] = useState<Todos[]>([])
  
  
  const handleAdd = (e: React.FormEvent) => { // contextual typing
    e.preventDefault()

    if(todo) {
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]) 
      setTodo("")
    }
  }

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
    return 

    let add, 
      active = todos,
      complete = completedTodos

      // For source
    if (source.droppableId === "TodosList") {
      add = active[source.index]
      active.splice(source.index, 1)
    } else {
      add = complete[source.index]
      complete.splice(source.index, 1)
    }

    // For destination
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add)
    } else {
      complete.splice(destination.index, 0, add)
    }

    setCompletedTodos(complete)
    setTodos(active)
  }

  return  ( 
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskydo</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} /> 
        <TodoList 
          todos={todos} 
          setTodos={setTodos} 
          completedTodos={completedTodos} 
          setCompletedTodos={setCompletedTodos} 
        />
      </div>
    </DragDropContext>
    
  )
}

export default App;
