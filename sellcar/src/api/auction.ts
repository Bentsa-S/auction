import axios from "axios";

interface AuctionPost {
    title: string;
    token: string  | null;
    description: string;
    srart_price: number;
    curr_price: number;
    id_user: number;
    finish_at: string;
}


export const postAddAuction = async ({token, title, description, srart_price, curr_price, finish_at }: AuctionPost) => {
    const finish = finish_at + ':00.00';
    const data = {
        title,
        description,
        srart_price,
        curr_price,
        id_user: 13,
        finish_at: finish
    };    

    console.log(data);
    
    const response = await axios.post(
        'https://api-auction-cursova-production.up.railway.app/add_auction',
        data,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
    )      
    return response.data;
};

export const getAddAuction = async () => {    
    const response = await axios.get(`https://api-auction-cursova-production.up.railway.app/get_auction`);
    
    return response.data;
};

export const getPhoto = async (id: number) => {
    return axios.get('https://api-auction-cursova-production.up.railway.app/get_photo', {
      params: { id_auction: id },
    }).then(res => res.data);
  };
  

  export const uploadImages = async (images: File[], id_auction: number): Promise<void> => {
    for (const image of images) {
      console.log("Відправляється файл:", image);
  
      const formData = new FormData();
      formData.append("file", image);
  
      try {
        const response = await axios.post(
          `https://api-auction-cursova-production.up.railway.app/upload-to-bucket/`, // Уточнений URL
          formData,
          {
            params: { id_auction }, // <-- Правильне передавання параметра
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Завантаження успішне:", response.data);
      } catch (error) {
        console.error("Помилка завантаження:", error);
      }
    }
  };
  