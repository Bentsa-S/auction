import React, { useEffect, useState } from 'react';
import './AddAuctionForm.css';
import { postAddAuction, uploadImages } from '../../../api/auction';
import { getCategorie, postAddCategories } from '../../../api/categorie';
import PhotoUploader from './sortablePhoto/PhotoUploader';
import DemonstrationSlider from './demostration/slider/DemonstrationSlider';
import DemonstrationBet from './demostration/bet/DemonstrationBet';
import DemonstrationDescription from './demostration/description/DemonstrationDescription';
import CategorySearch from '../recommendation/filter/CategorySearch';
import { useCheckUser } from '../../../hock/useCheckUser';
import { useLanguage } from '../../../LanguageContext';
import { translations } from '../../../i18n';
import { useNavigate } from "react-router-dom";

const AddAuctionForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [srart_price, setStartPrice] = useState<number>(0);
  const [curr_price, setCurrPrice] = useState<number>(0);
  const [id_user, setIdUser] = useState<number>(0);
  const [finish_at, setFinishAt] = useState('');
  const [photos, setPhotos] = useState<File[]>([]);
  const [activePhoto, setActivePhoto] = useState<File | null>(null);
  const [category, setCategory] = useState('');
  const [allCategories, setAllCategories] = useState<string[]>([]);

  const [errors, setErrors] = useState({
    title: false,
    description: false,
    srart_price: false,
    curr_price: false,
    finish_at: false,
    photos: false,
  });

  const { lang } = useLanguage();
  const t = translations[lang];
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await getCategorie();
        setAllCategories(cats);
        console.log(cats);
        
      } catch (error) {
        console.error('Помилка при отриманні категорій:', error);
      }
    };

    fetchCategories();
  }, []);

  const user = useCheckUser(true)
  const handleSubmit = async () => {
    const newErrors = {
      title: title.trim() === '',
      description: description.trim() === '',
      srart_price: srart_price <= 0,
      curr_price: curr_price < 0,
      finish_at: finish_at === '',
      photos: photos.length === 0,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(Boolean);
        console.log(hasErrors);

    if (hasErrors) return;
    const token = user
    if (!token) return
    const base64Url = token.split('.')[1];
    const decodedData = JSON.parse(atob(base64Url));
    setIdUser(decodedData.user_id || decodedData.id);

    if(token)
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

      const id_auction = result.id;
      
      await uploadImages(photos, id_auction);

        const categoryExists = allCategories.includes(category.trim());
        console.log(categoryExists);
        
        if (!categoryExists) {
          console.log(12);
          if(user){
            await postAddCategories(13, category.trim(), user);
          }
          console.log('Категорія додана:', category);
        } else {
          console.log('Категорія вже існує:', category);
        }
      
      navigate("/recomendation");
    } catch (error) {
      console.error('Помилка при додаванні аукціону або фото:', error);
    }
  };

  return (
    <div className="wrapper">
      <h2 className="title">{t.createAuction}</h2>

      <label className="label">{t.nameLabel}</label>
      <input
        className={`input ${errors.title ? 'error' : ''}`}
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (e.target.value.trim()) setErrors((prev) => ({ ...prev, title: false }));
        }}
      />

      <label className="label">{t.descriptionLabel}</label>
      <textarea
        className={`textarea ${errors.description ? 'error' : ''}`}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          if (e.target.value.trim()) setErrors((prev) => ({ ...prev, description: false }));
        }}
      />

      <label className="label">{t.startPrice}</label>
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

      <label className="label">{t.currentPrice}</label>
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

      <label className="label">{t.endDate}</label>
      <input
        type="datetime-local"
        className={`input ${errors.finish_at ? 'error' : ''}`}
        value={finish_at}
        onChange={(e) => {
          setFinishAt(e.target.value);
          if (e.target.value) setErrors((prev) => ({ ...prev, finish_at: false }));
        }}
      />

      <label className="label">{t.category}</label>
      <CategorySearch
        value={category}
        onChange={setCategory}
        allCategories={allCategories}   
        showLabel = {false}   
      />

      <PhotoUploader
        photos={photos}
        setPhotos={setPhotos}
        activePhoto={activePhoto}
        setActivePhoto={setActivePhoto}
      />
      {errors.photos && <div className="error-message">{t.addPhotoError}</div>}

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
        {t.submit}
      </button>
    </div>
  );
};

export default AddAuctionForm;
