import axios from "axios";

const api = 'http://localhost:8000';


export const getCategorie = async () => {
  const response = await axios.get(`${api}/categories`);
  console.log(response.data);
  
  return response.data;
};

export const postAddCategories = async (id: number, categorie: string, token: string) => {
  const data = {
    id_auction: id,
    categorie: categorie
  }
  
  console.log(token);
  console.log(data);

  const response = await axios.post(`${api}/add_categorie`, data, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};
