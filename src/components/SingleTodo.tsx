import React, { useEffect, useState, useRef } from 'react'
import { Todos } from '../model'
import "./styles.css"
import { AiOutlineCheck, AiOutlineDelete, AiOutlineEdit,  } from 'react-icons/ai'
import { Draggable } from 'react-beautiful-dnd'
// import TodoList from './TodoList'
// import { MdDone } from 'react-icons/md'  // another option for AiOutlineCheck


// Using type. An interface can be also be used.
type Props = {
    index: number
    todo: Todos
    todos: Todos[]
    setTodos: React.Dispatch<React.SetStateAction<Todos[]>>
}

const SingleTodo = ({ index, todo, todos, setTodos }: Props) => {

    const [edit, setEdit] = useState<boolean>(false)
    const [editTodo, setEditTodo] = useState<string>(todo.todo)
    const inputRef = useRef<HTMLInputElement>(null) // not there

    const handleDone = (id: number) => {
        setTodos(
            todos.map(
                (todo) => todo.id === id ? {...todo, isDone: !todo.isDone } : todo
            )
        )    
    }

    const handleDelete = (id: number) => {
        setTodos(
            todos.filter(
                (todo) => todo.id !== id
            )
        )
    }


    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault()

        setTodos(todos.map((todo) => (
            todo.id === id ? {...todo, todo: editTodo} : todo
        )))
        setEdit(false)                                      
    }

    useEffect(() => {
        inputRef.current?.focus()
    }, [edit])

    return (
        <Draggable draggableId= {todo.id.toString()} index={index}>

            {
                (provided) => (
                        <form 
                            className="todos_single" 
                            onSubmit={(e) => handleEdit(e, todo.id)}
                            {...provided.draggableProps} 
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                        >
                            {
                                edit ? (
                                    <input 
                                        ref={inputRef}
                                        value={editTodo} 
                                        onChange={(e) => setEditTodo(e.target.value)} 
                                        className="todos_single_text" 
                                    />
                                ) : ( todo.isDone ? (
                                        <s style={{color:"red"}} className="todos_single_text">{todo.todo}</s>
                                    ) : (
                                        <span className="todos_single_text">{todo.todo}</span>
                                    )
                                )
                            
                            }

                    
                            <div>
                                <span className="icon" onClick= {() => {
                                    if(!edit && !todo.isDone) { // !edit ie edit mode is not active (edit image is hidden)
                                        setEdit(!edit)
                                    }
                                }}>
                                    <AiOutlineEdit />
                                </span>
                                <span className="icon" onClick={() => handleDelete(todo.id)}>
                                    <AiOutlineDelete />
                                </span>
                                <span className="icon" onClick={() => handleDone(todo.id)}>
                                    <AiOutlineCheck />
                                </span>
                            </div>
                        </form>
                )
            }
            
        </Draggable>
        
    )
}

export default SingleTodo
