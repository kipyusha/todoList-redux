import { createSlice,type PayloadAction } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoState {
    todos: Todo[];
}

const initialState: TodoState = {
    todos: []
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: {
            reducer: (state, action: PayloadAction<Todo>) => {
                state.todos.push(action.payload)
            },
            prepare: (text: string) => {
                const id = nanoid()
                return {
                    payload: {
                        id,
                        text,
                        completed: false,
                    }
                }
            }
        },

        toggleTodo: (state, action: PayloadAction<string>) => {
            const todo = state.todos.find((todo: Todo) => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        },
        deleteTodo: (state, action: PayloadAction<string>) => {
            state.todos = state.todos.filter((todo: Todo) => todo.id !== action.payload)
        }
    }
})

export const {addTodo, toggleTodo, deleteTodo} = todosSlice.actions
export default todosSlice.reducer