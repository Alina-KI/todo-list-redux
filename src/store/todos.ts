import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TodoItem } from '../types/todo-item'
import { api } from '../api/api'

export const addTodoItem = createAsyncThunk(
  'todos/addTodoItem',
  async (text: string, { dispatch }) => {
      const todo = await api.post<TodoItem>(`todos/`, { text }).then(res => res.data)
      dispatch(addTodo(todo))
    }
)

export const delTodoItem = createAsyncThunk(
  'todos/delTodoItem',
  async (id: number, {dispatch}) => {
    await api.delete(`todos/${id}/`)
    dispatch(delTodo(id))
  }
)

export const selectTodoItem = createAsyncThunk<Promise<void>, {is_selected: boolean, id: number}>(
  'todos/selectTodoItem',
  async ({ is_selected, id}, {dispatch}) => {
      await api.patch(`todos/${id}/`, { is_selected })
      dispatch(selectTodo(id))
    }
)

export const fetchTodoItems = createAsyncThunk(
  'todos/fetchTodoItems',
  async (_, {dispatch}) => {
      const todos = await api.get<TodoItem[]>(`todos/`).then(res => res.data)
      dispatch(setTodos(todos))
    }
)

const initialState = {
  todos: [] as TodoItem[],
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
      addTodo: (state, action: { payload: TodoItem }) => ({
        ...state,
        todos: [...state.todos, action.payload]
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
      }),

      setTodos: (state, action: { payload: TodoItem[] }) => ({
        ...state,
        todos: action.payload
      })
    }
  }
)

export const { addTodo, selectTodo, delTodo, setTodos } = todosSlice.actions

export default todosSlice.reducer