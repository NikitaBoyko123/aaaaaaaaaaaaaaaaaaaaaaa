import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_BASE_URL

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
})

export const todosApi = {

  getAllTodos() {
    return api.get('/todos')
  },

  getTodoById(id) {
    return api.get(`/todos/${id}`)
  },

  createTodo(todo) {
    return api.post('/todos', todo)
  },

  updateTodo(id, todo) {
    return api.put(`/todos/${id}`, todo)
  },
  deleteTodo(id) {
    return api.delete(`/todos/${id}`)
  }
}