export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface LocalTodo extends Todo {
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