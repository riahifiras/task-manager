import axios from 'axios';
import { Task } from '../types/task';
import { log } from 'console';

const API_URL = 'http://localhost:3000'; 

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Attach JWT token to every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export const taskService = {
  login: async (username: string, password: string): Promise<string> => {
    const response = await axiosInstance.post('/auth/login', { username, password });
    const { access_token } = response.data;
    if (access_token) {
      localStorage.setItem('token', access_token); // Store access_token in localStorage
      return access_token;
    } else {
      console.error('No access token received');
      return '';
    }
  },
  

  signup: async (username: string, password: string): Promise<string> => {
    const response = await axiosInstance.post('/auth/signup', { username, password });  
    const { access_token } = response.data;
    if (access_token) {
      localStorage.setItem('token', access_token); // Store access_token in localStorage
      return access_token;
    } else {
      console.error('No access token received');
      return '';
    }
  },

  logout: () => {
    localStorage.removeItem('token');
  },

  getTasks: async (): Promise<Task[]> => {
    const response = await axiosInstance.get('/tasks');
    return response.data;
  },

  createTask: async (task: Omit<Task, 'id'>): Promise<Task> => {
    const response = await axiosInstance.post('/tasks', task);
    return response.data;
  },

  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await axiosInstance.patch(`/tasks/${id}`, task);
    return response.data;
  },

  deleteTask: async (id: number): Promise<void> => {
    await axiosInstance.delete(`/tasks/${id}`);
  },
};
