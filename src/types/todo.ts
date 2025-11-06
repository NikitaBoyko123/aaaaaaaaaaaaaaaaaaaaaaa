export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface LocalTodo extends Todo {
  text: string; 
  _original?: Todo;
}

export interface CreateTodoRequest {
  title: string;
  completed: boolean;
  userId: number;
}

export interface UpdateTodoRequest extends Partial<CreateTodoRequest> {
  id: number;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

export interface TaskItemProps {
  task: LocalTodo;
  isDone: boolean;
}

export interface TaskListProps {
  tasks: LocalTodo[];
  title: string;
  isDone?: boolean;
}