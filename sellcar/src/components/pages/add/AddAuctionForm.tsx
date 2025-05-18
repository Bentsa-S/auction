import React, { useEffect, useState } from 'react';
import './AddAuctionForm.css';
import { postAddAuction, uploadImages } from '../../../api/auction';
import PhotoUploader from './sortablePhoto/PhotoUploader';
import DemonstrationSlider from './demostration/slider/DemonstrationSlider';
import DemonstrationBet from './demostration/bet/DemonstrationBet';
import DemonstrationDescription from './demostration/description/DemonstrationDescription';

const AddAuctionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [srart_price, setStartPrice] = useState<number>(0);
  const [curr_price, setCurrPrice] = useState<number>(0);
  const [id_user, setIdUser] = useState<number>(0);
  const [finish_at, setFinishAt] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [activePhoto, setActivePhoto] = useState<File | null>(null);

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    srart_price: false,
    curr_price: false,
    id_user: false,
    finish_at: false,
    photos: false,
  });

  useEffect(() => {
    console.log(photos);
  }, [photos]);
    const token = localStorage.getItem('auction_token');

  const handleSubmit = async () => {
    const newErrors = {
      title: title.trim() === '',
      description: description.trim() === '',
      srart_price: srart_price <= 0,
      curr_price: curr_price < 0,
      id_user: id_user <= 0,
      finish_at: finish_at === '',
      photos: photos.length === 0,
    };
    console.log(photos);
    
    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
    if (hasErrors) return;

    try {
      const result = await postAddAuction({
        title,
        token,
        description,
        srart_price,
        curr_price,
        id_user,
        finish_at,
      });

      console.log('Аукціон успішно додано:', result);
      const id_auction = result.id;
      console.log(photos);
      
      const result2 =await uploadImages(photos, id_auction)
      console.log(result2);
      
      console.log('Фотографії завантажено успішно');
    } catch (error) {
      console.error('Помилка при додаванні аукціону або фото:', error);
    }
  };

  return (
    <div className="wrapper">
      <h2 className="title">Створення аукціону</h2>

      <label className="label">Назва</label>
      <input
        className={`input ${errors.title ? 'error' : ''}`}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: false }));
        }}
      />

      <label className="label">Опис</label>
      <textarea
        className={`textarea ${errors.description ? 'error' : ''}`}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (e.target.value.trim()) setErrors((prev) => ({ ...prev, description: false }));
        }}
      />

      <label className="label">Стартова ціна</label>
      <input
        type="number"
        className={`input ${errors.srart_price ? 'error' : ''}`}
        value={srart_price}
        onChange={(e) => {
          const val = Number(e.target.value);
          setStartPrice(val);
          if (val > 0) setErrors((prev) => ({ ...prev, srart_price: false }));
        }}
      />

      <label className="label">Поточна ціна</label>
      <input
        type="number"
        className={`input ${errors.curr_price ? 'error' : ''}`}
        value={curr_price}
        onChange={(e) => {
          const val = Number(e.target.value);
          setCurrPrice(val);
          if (val >= 0) setErrors((prev) => ({ ...prev, curr_price: false }));
        }}
      />

      <label className="label">ID користувача</label>
      <input
        type="number"
        className={`input ${errors.id_user ? 'error' : ''}`}
        value={id_user}
        onChange={(e) => {
          const val = Number(e.target.value);
          setIdUser(val);
          if (val > 0) setErrors((prev) => ({ ...prev, id_user: false }));
        }}
      />

      <label className="label">Дата завершення</label>
      <input
        type="datetime-local"
        className={`input ${errors.finish_at ? 'error' : ''}`}
        value={finish_at}
        onChange={(e) => {
          setFinishAt(e.target.value);
          if (e.target.value) setErrors((prev) => ({ ...prev, finish_at: false }));
        }}
      />

      <PhotoUploader
        photos={photos}
        setPhotos={setPhotos}
        activePhoto={activePhoto}
        setActivePhoto={setActivePhoto}
      />
      {errors.photos && <div className="error-message">Додайте хоча б одне фото</div>}

      <div className="car-details">
        <div className="left-section">
          <DemonstrationSlider
            images={photos.map((photo) => URL.createObjectURL(photo))}
          />
        </div>

        <div className="right-section">
          <DemonstrationBet
            bid={srart_price}
            startTime={new Date().toISOString()}
            durationMinutes={10}
            minBid={10}
            currentUserBid={0}
            totalPrice={srart_price + 200}
          />
        </div>

        <div className="right-section">
          <DemonstrationDescription description={description} />
        </div>
      </div>

      <button className="submit-button" onClick={handleSubmit}>
        Надіслати
      </button>
    </div>
  );
};

export default AddAuctionForm;
