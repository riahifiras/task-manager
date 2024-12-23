import axios from 'axios';
import { Task } from '../types/task';
import { mockTasks } from '../mockData/tasks';

const API_URL = 'http://localhost:3000/api'; // Update this with your NestJS backend URL when it's ready

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  login: async (email: string, password: string): Promise<string> => {
    // For now, we'll just return a mock token
    const mockToken = 'mock_jwt_token';
    localStorage.setItem('token', mockToken);
    return mockToken;
  },

  signup: async (email: string, password: string): Promise<string> => {
    // For now, we'll just return a mock token as if the signup was successful
    const mockToken = 'mock_jwt_token_after_signup';
    localStorage.setItem('token', mockToken);
    return mockToken;
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getTasks: async (): Promise<Task[]> => {
    // When backend is ready, use this:
    // const response = await axiosInstance.get('/tasks');
    // return response.data;
    
    // For now, return mock data
    return Promise.resolve(mockTasks);
  },

  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    // When backend is ready, use this:
    // const response = await axiosInstance.post('/tasks', task);
    // return response.data;
    
    // For now, create a new task with a mock ID
    const newTask: Task = {
      ...task,
      id: Math.max(...mockTasks.map(t => t.id)) + 1
    };
    mockTasks.push(newTask);
    return Promise.resolve(newTask);
  },

  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    // When backend is ready, use this:
    // const response = await axiosInstance.patch(`/tasks/${id}`, task);
    // return response.data;
    
    // For now, update the task in mock data
    const index = mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTasks[index] = { ...mockTasks[index], ...task };
      return Promise.resolve(mockTasks[index]);
    }
    return Promise.reject(new Error('Task not found'));
  },

  deleteTask: async (id: number): Promise<void> => {
    // When backend is ready, use this:
    // await axiosInstance.delete(`/tasks/${id}`);
    
    // For now, remove the task from mock data
    const index = mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTasks.splice(index, 1);
      return Promise.resolve();
    }
    return Promise.reject(new Error('Task not found'));
  },
};

