import React from 'react'
import s from './app.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store'
import { addTodo, delTodo, selectTodo } from './store/todos'

export const App = () => {
  const dispatch = useDispatch()
  const todos = useSelector((state: RootState) => state.todos)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (inputRef.current!.value !== ''){
        dispatch(addTodo(inputRef.current!.value))
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
            dispatch(addTodo(inputRef.current!.value))
          }
          inputRef.current!.value = ''
        }}>Add Todo</button>
      </div>
      {todos.map(todo =>
        <div className={`${ s.todo } ${todo.isSelected && `${s.chooseTodo}`}`} key={todo.id}>
         <div className={s.top}>
           <input type="checkbox" className={s.checkBox} onClick={() => dispatch(selectTodo(todo.id))}/>
           <span>{todo.text}</span>
         </div>
          <button className={s.button} onClick={() => dispatch(delTodo(todo.id))}>Deleted Todo</button>
        </div>
      )}
    </div>
  )
}