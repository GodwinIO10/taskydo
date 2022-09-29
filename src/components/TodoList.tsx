import React from 'react'
import "./styles.css"
import { Todos } from '../model'
import SingleTodo from './SingleTodo'

interface TodosProps {
    todos: Todos[]
    setTodos: React.Dispatch<React.SetStateAction<Todos[]>> 
}

const TodoList: React.FC<TodosProps> = ({ todos, setTodos }: TodosProps) => {
    return (
        <div className="container">
            <div className="todos">
                <span className="todos_heading">
                    Active Tasks
                </span>
                {
                    todos.map((todo) => (
                        <SingleTodo  
                        todo={todo} 
                        key={todo.id}
                        todos={todos}
                        setTodos={setTodos}
                    />
                    ))
                }
            </div>
            <div className="todos remove">
            <span className="todos_heading">
                    Completed Tasks
                </span>
                {
                    todos.map((todo) => (
                        <SingleTodo  
                        todo={todo} 
                        key={todo.id}
                        todos={todos}
                        setTodos={setTodos}
                    />
                    ))
                }
            </div>
        </div>
    )
}

export default TodoList
