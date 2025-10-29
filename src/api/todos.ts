
import axios, { AxiosResponse } from 'axios';
import { Todo, CreateTodoRequest, UpdateTodoRequest, ApiResponse } from '@/types/todo';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
});

export const todosApi = {

  getAllTodos(): Promise<AxiosResponse<Todo[]>> {
    return api.get<Todo[]>('/todos');
  },
  
  getTodoById(id: number): Promise<AxiosResponse<Todo>> {
    return api.get<Todo>(`/todos/${id}`);
  },
  
  createTodo(todo: CreateTodoRequest): Promise<AxiosResponse<Todo>> {
    return api.post<Todo>('/todos', todo);
  },
  
  updateTodo(id: number, todo: UpdateTodoRequest): Promise<AxiosResponse<Todo>> {
    return api.put<Todo>(`/todos/${id}`, todo);
  },
  
  deleteTodo(id: number): Promise<AxiosResponse<void>> {
    return api.delete(`/todos/${id}`);
  }
};

