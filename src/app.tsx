import React from 'react'
import s from './app.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { TodoItem } from './types/todo-item'

export const App = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: { todos: TodoItem[] }) => state.todos)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const addTodo = (text: string) => {
    dispatch({ type: 'ADD_TODO', payload: { text: text } })
  }
  const delTodo = (id: number) => {
    dispatch({ type: 'DEL_TODO', payload: { id: id } })
  }
  const chooseTodo = (id: number) => {
    dispatch({ type: 'CHOOSE_TODO', payload: { id: id } })
  }

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (inputRef.current!.value !== ''){
        addTodo(inputRef.current!.value)
      }
      inputRef.current!.value = ''
    }
  }

  return (
    <div className={s.app}>
      <div className={s.form}>
        <input className={s.input} type="text" ref={inputRef} onKeyDown={handleKeyDown}/>
        <button className={s.button} onClick={() => {
          if (inputRef.current!.value !== ''){
            addTodo(inputRef.current!.value)
          }
          inputRef.current!.value = ''
        }}>Add Todo</button>
      </div>
      {todos.map(todo =>
        <div className={`${ s.todo } ${todo.isSelected && `${s.chooseTodo}`}`} key={todo.id}>
         <div className={s.top}>
           <input type="checkbox" className={s.checkBox} onClick={() => chooseTodo(todo.id)}/>
           <span>{todo.text}</span>
         </div>
          <button className={s.button} onClick={() => delTodo(todo.id)}>Deleted Todo</button>
        </div>
      )}
    </div>
  )
}