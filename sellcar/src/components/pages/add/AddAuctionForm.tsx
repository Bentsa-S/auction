import React, { useState } from 'react';
import './AddAuctionForm.css';
import PhotoUploader from './sortablePhoto/PhotoUploader';
import DemonstrationSlider from './demostration/slider/DemonstrationSlider';
import DemonstrationBet from './demostration/bet/DemonstrationBet';
import DemonstrationDescription from './demostration/description/DemonstrationDescription';

const AddAuctionForm: React.FC = () => {
  const [photos, setPhotos] = useState<File[]>([]);
  const [activePhoto, setActivePhoto] = useState<File | null>(null);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [startPrice, setStartPrice] = useState<number>(0);
  const [startDate, setStartDate] = useState('');
  const [minBid, setMinBid] = useState<number>(0);
  const [currentBid, setCurrentBid] = useState<number>(0);

  return (
    <div className="wrapper">
      <h2 className="title">Створення аукціон карточки</h2>

      <label className="label">Ім'я товару</label>
      <input
        type="text"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="label">Опис</label>
      <textarea
        className="textarea"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label className="label">Стартова ціна</label>
      <input
        type="number"
        className="input"
        value={startPrice}
        onChange={(e) => setStartPrice(Number(e.target.value))}
      />

      <label className="label">Мінімальна ставка</label>
      <input
        type="number"
        className="input"
        value={minBid}
        onChange={(e) => setMinBid(Number(e.target.value))}
      />

      <label className="label">Ваша ставка</label>
      <input
        type="number"
        className="input"
        value={currentBid}
        onChange={(e) => setCurrentBid(Number(e.target.value))}
      />

      <label className="label">Дата продажів</label>
      <input
        type="datetime-local"
        className="input"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />

      <PhotoUploader
        photos={photos}
        setPhotos={setPhotos}
        activePhoto={activePhoto}
        setActivePhoto={setActivePhoto}
      />

      <div className="car-details">
        <div className="left-section">
            <DemonstrationSlider
                images={
                    photos.map((photo) => URL.createObjectURL(photo))
                }
            />
        </div>
        <div className='right-section' >
            <DemonstrationBet
                bid={startPrice}
                startTime={startDate}
                durationMinutes={10}
                minBid={minBid}
                currentUserBid={currentBid}
                totalPrice={startPrice + 200}
            />
        </div>
        <div className='right-section' >
            <DemonstrationDescription
                description={description}
            />
        </div>
      </div>

      <button
        className="submit-button"
        onClick={() => {
            console.log('Аукціон створено:', {
            name,
            description,
            startPrice,
            minBid,
            currentBid,
            startDate,
            photos
            });
        }}
        >
        Викласти
      </button>

    </div>
  );
};

export default AddAuctionForm;
