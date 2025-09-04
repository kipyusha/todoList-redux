import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { addTodo, toggleTodo, deleteTodo,type Todo } from './todosSlice'; 


export function TodoList() {
  // Получаем массив задач из состояния Redux
  const todos = useAppSelector((state) => state.todos.todos);
  const dispatch = useAppDispatch();

  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    if (newTodoText.trim()) {
      dispatch(addTodo(newTodoText.trim())); // Отправляем только текст, prepare-функция сделает остальное
      setNewTodoText(''); // Очищаем поле ввода
    }
  };

  const handleToggleTodo = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <h2>Todo List</h2>
      <div>
        <input
          type="text"
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map((todo: Todo) => (
          <li key={todo.id} style={{ display: 'flex', alignItems: 'center', margin: '8px 0' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
              style={{ marginRight: '10px' }}
            />
            <span
              style={{
                textDecoration: todo.completed ? 'line-through' : 'none',
                flexGrow: 1,
              }}
            >
              {todo.text}
            </span>
            <button onClick={() => handleDeleteTodo(todo.id)} style={{ marginLeft: '10px' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}