import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../models/Todo';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import './styles.css';

interface Props {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    todos: Todo[];
}


function SingleTodo({todo, todos, setTodos}: Props) {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);


    const handleDone = (id: number) => {
        setTodos(todos.map( (todo) => {
            if (todo.id === id){
                return {
                    ...todo,
                    isDone: !todo.isDone
                }
            }
            return todo;
        }))

    }

    const handleDelete = (id: number) => {
        setTodos(todos.filter( (todo) => todo.id !== id));
    }

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();

        setTodos(todos.map( (todo) => {
            if (todo.id === id) {
                return {...todo, todo: editTodo};
            } else {
                return todo;
            }
        }));
        setEdit(false);
    }
    



  return (
    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)}>
        {
            edit ? (
                <input ref={inputRef}  value={editTodo} onChange={(e) => { setEditTodo(e.target.value)}} className='todos__single--text'/>
            ) : (
                todo.isDone ? (
                <s className="todos__single--text">{todo.todo}</s>
            ) : (
                <span className="todos__single--text">{todo.todo}</span>)
            )
        }
        

        <div>
            <span className="icon" onClick={ () => {
                 if (!edit && !todo.isDone){
                    setEdit(true);
                } else if (edit && !todo.isDone){
                    setEdit(false);
                }

            }
            }>
                <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
                <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
                <MdDone />
            </span>
        </div>


    </form>
  )
}

export default SingleTodo