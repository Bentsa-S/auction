import axios from 'axios';
import { LoginPost, ReagistrationPost } from '../typse/user';

export const postRegistration = async ({ email, password, name }: ReagistrationPost) => {
    const data = {
        email,
        password,
        name
    };
    const response = await axios.post(`https://api-auction-cursova-production.up.railway.app/register`, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
};

export const postLogin = async ({ username, password }: LoginPost) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('username', username);
  params.append('password', password);
    console.log(params);
    
  const response = await axios.post(
    'https://api-auction-cursova-production.up.railway.app/login',
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    }
  );
  console.log(response.status);
  
  return response.data;
};

export const getUser = async (id:string) => {
    const response = await axios.get(`${process.env.AUCTION_API}/${id}`)
    return response.data
}

export const getUsers = async () => {
    const response = await axios.get(`https://api-auction-cursova-production.up.railway.app/users/`)
    return response.data
}
