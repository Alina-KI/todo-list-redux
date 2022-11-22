import React from 'react'
import s from './todo.module.scss'
import { delTodoItem, selectTodoItem } from '../../store/todos'
import { TodoItem } from '../../types/todo-item'
import { useAppDispatch } from '../../store'

type Props = {
  todo: TodoItem
}

export const Todo = ({ todo }: Props) => {
  const dispatch = useAppDispatch()

  return (
    <div className={`${s.todo} ${todo.isSelected && `${s.chooseTodo}`}`} key={todo.id}>
      <div className={s.top}>
        <input type="checkbox" className={s.checkBox}
               onClick={() => dispatch(
                 selectTodoItem(
                   { id: todo.id, is_selected: !todo.isSelected }
                 )
               )}
        />
        <span>{todo.text}</span>
      </div>
      <button className={s.button} onClick={() => dispatch(delTodoItem(todo.id))}>Deleted Todo</button>
    </div>
  )
}