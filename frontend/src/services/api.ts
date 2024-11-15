import axios, { AxiosResponse } from 'axios';
import React from 'react';

export {}; // This makes the file a module
const api = axios.create({
  baseURL: 'http://127.0.0.1:8000', // FastAPI backend URL
});

interface UserCreate {
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}

interface UserLogin {
  email: string;
  password: string;
}

interface AuthResponse {
  access_token: string;
  token_type: string;
}

// Register user
export const registerUser = async (userData: UserCreate): Promise<any> => {
  try {
    const response: AxiosResponse<any> = await api.post('/users/register', userData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};

// Login user
export const loginUser = async (loginData: UserLogin): Promise<AuthResponse> => {
  try {
    const response: AxiosResponse<AuthResponse> = await api.post('/login', loginData);
    return response.data;
  } catch (error: any) {
    throw error.response.data;
  }
};
