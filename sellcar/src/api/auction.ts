import axios from "axios";

const api = 'http://localhost:8000';

interface AuctionPost {
  title: string;
  token: string | null;
  description: string;
  srart_price: number;
  curr_price: number;
  id_user: number;
  finish_at: string;
}

export const postAddAuction = async ({
  token,
  title,
  description,
  srart_price,
  curr_price,
  finish_at,
  id_user
}: AuctionPost) => {
  const finish = finish_at + ':00.00';
  const data = {
    title,
    description,
    srart_price,
    curr_price,
    id_user,
    finish_at: finish,
  };

  console.log(data);
  console.log(token);
  
  const response = await axios.post(`${api}/add_auction`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response.data;
};

export const getAuction = async () => {
  const response = await axios.get(`${api}/get_auction`);
  return response.data;
};

export const getPhoto = async (id: number) => {
  const response = await axios.get(`${api}/get_photo`, {
    params: { id_auction: id },
  });
  return response.data;
};

export const uploadImages = async (
  images: File[],
  id_auction: number
): Promise<void> => {
  for (const image of images) {
    console.log('Відправляється файл:', image);

    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post(`http://localhost:8001/upload`, formData, {
        params: { id_auction },
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Завантаження успішне:', response.data);
    } catch (error) {
      console.error('Помилка завантаження:', error);
    }
  }
};

export const followAuction = async (id: number, token:string) => {
  const response = await axios.post(`${api}/follow_auction`, null, {
    params: { id },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 🔑 додаємо токен
    },
  });
  return response.data;
};

export const unfollowAuction = async (id: number, token:string) => {
  const response = await axios.delete(`${api}/unfollow_auction`, {
    params: { id },
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`, // 🔑 додаємо токен
    },
  });
  return response.data;
};


export const getFollow = async (id: number) => {
  const response = await axios.get(`${api}/get_history`, {
    params: { id_auction: id },
  });
  return response.data;
};
