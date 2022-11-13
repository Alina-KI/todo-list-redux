import { TodoItem } from '../types/todo-item'

const defaultValue = {
  todos: [{
    id: Number(new Date()),
    text: 'Todo 1',
    isSelected: false
  }],
}

export const todosReducer = (state: { todos: TodoItem[] } = defaultValue, action: { type: string, payload: TodoItem }) => {
  switch (action.type) {
  case 'ADD_TODO':
    return {
      ...state,
      todos: [...state.todos, { text: action.payload.text, isSelected: false, id: Number(new Date()) }]
    }

  case 'DEL_TODO':
    return {
      ...state,
      todos: state.todos.filter(todo => todo.id !== action.payload.id)
    }

  case 'CHOOSE_TODO':
    return {
      todos: state.todos.map(todo => todo.id === action.payload.id
        ? { ...todo, isSelected: !todo.isSelected }
        : todo
      )
    }

  default:
    return state
  }

}