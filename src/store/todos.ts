import { createSlice, CreateSliceOptions } from '@reduxjs/toolkit'

const initialState = {
  todos: [{
    id: Number(new Date()),
    text: 'Todo 1',
    isSelected: false
  }],
}

export const todosSlice = createSlice({
  name: 'todo',
  initialState,
    reducers: {
      addTodo: (state, action: { payload: string }) => ({
      ...state,
        todos: [...state.todos, { text: action.payload, isSelected: false, id: Number(new Date()) }]
      }),

      delTodo: (state, action: { payload: number }) => ({
      ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
      }),

      selectTodo: (state, action: { payload: number }) => ({
        todos: state.todos.map(todo => todo.id === action.payload
          ? { ...todo, isSelected: !todo.isSelected }
          : todo
        )
      })
    }
  }
)

export const { addTodo, selectTodo, delTodo } = todosSlice.actions

export default todosSlice.reducer