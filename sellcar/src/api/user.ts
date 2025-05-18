import axios from 'axios';
import { LoginPost, ReagistrationPost } from '../typse/user';

const api = 'http://localhost:8000'

export const postRegistration = async ({ email, password, name }: ReagistrationPost) => {
  const data = { email, password, name };
  const response = await axios.post(`${api}/register`, data, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  return response.data;
};

export const postLogin = async ({ name, password }: LoginPost) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', name);
  params.append('password', password);

  const response = await axios.post(`${api}/login`, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await axios.get(`${api}/${id}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get(`${api}/users/`);
  return response.data;
};
