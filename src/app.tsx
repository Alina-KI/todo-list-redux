import React, { useEffect } from 'react'
import s from './app.module.scss'
import { useAppDispatch, useAppSelector } from './store'
import { Todo } from './components/todo/todo'
import { addTodoItem, fetchTodoItems } from './store/todos'

export const App = () => {
  const dispatch = useAppDispatch()
  const todos = useAppSelector((state) => state.todos)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      if (inputRef.current!.value !== ''){
        dispatch(addTodoItem(inputRef.current!.value))
      }
      inputRef.current!.value = ''
    }
  }

  useEffect(() => {
    dispatch(fetchTodoItems())
  }, [])

  return (
    <div className={s.app}>
      <div className={s.form}>
        <input className={s.input} type="text" ref={inputRef} onKeyDown={handleKeyDown}/>
        <button className={s.button} onClick={() => {
          if (inputRef.current!.value !== ''){
            dispatch(addTodoItem(inputRef.current!.value))
          }
          inputRef.current!.value = ''
        }}>Add Todo</button>
      </div>
      {todos.map(todo => <Todo todo={todo} key={todo.id}/>
      )}
    </div>
  )
}