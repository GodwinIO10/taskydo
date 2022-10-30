import React from 'react'
import "./styles.css"
import { Todos } from '../model'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd'

interface TodosProps {
    todos: Todos[]
    setTodos: React.Dispatch<React.SetStateAction<Todos[]>> 
    completedTodos: Todos[]
    setCompletedTodos: React.Dispatch<React.SetStateAction<Todos[]>>
}

const TodoList: React.FC<TodosProps> = ({ todos, setTodos, completedTodos, setCompletedTodos }) => {
    return (
        <div className="container">
            <Droppable droppableId="TodosList">
                {
                    (provided) => (
                        <div className="todos" ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos_heading">
                                Active Tasks
                            </span>
                            {
                                todos.map((todo, index) => (
                                    <SingleTodo
                                        index={index}  
                                        todo={todo} 
                                        key={todo.id}
                                        todos={todos}
                                        setTodos={setTodos}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
               
            </Droppable>
            <Droppable droppableId='TodosRemove'>
                {
                    (provided) => (
                        <div className="todos remove" ref={provided.innerRef} {...provided.droppableProps}>
                            <span className="todos_heading">
                            Completed Tasks
                            </span>
                            {
                                completedTodos.map((todo, index) => (
                                    <SingleTodo
                                        index={index}  
                                        todo={todo} 
                                        key={todo.id}
                                        todos={completedTodos}
                                        setTodos={setCompletedTodos}
                                    />
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )
                }
            </Droppable>
            
        </div>
    )
}

export default TodoList
