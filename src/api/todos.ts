import axios from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest } from '@/types/todo';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const todosApi = {
  getAllTodos() {
    return api.get<Todo[]>('/todos');
  },
  
  getTodoById(id: number) {
    return api.get<Todo>(`/todos/${id}`);
  },
  
  createTodo(todo: CreateTodoRequest) {
    return api.post<Todo>('/todos', todo);
  },
  
  updateTodo(id: number, todo: UpdateTodoRequest) {
    return api.put<Todo>(`/todos/${id}`, todo);
  },
  
  deleteTodo(id: number) {
    return api.delete(`/todos/${id}`);
  }
};