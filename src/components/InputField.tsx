import React, { useRef } from 'react'
import './styles.css'


interface Props {  
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
 }

function InputField({todo, setTodo, handleAdd} : Props) {

    const inputRef = useRef<HTMLInputElement>(null);


  return (
    <form className="input" onSubmit={(e) => {
        handleAdd(e)
        inputRef.current?.blur();
    }}>
        <input ref = {inputRef} type="input" value={todo} onChange={ (e) => setTodo(e.target.value)} placeholder="Enter task" className='input__box'/>
        <button type="submit" className="input_submit">Add</button>
    </form>
  )
}

export default InputField