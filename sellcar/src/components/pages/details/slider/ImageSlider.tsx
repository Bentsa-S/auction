import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './ImegeSlider.css';

const ImegeSlider: React.FC<{ images: string[] }> = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  return (
    <div className="car-slider-wrapper">
      {/* Головний слайдер */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        spaceBetween={10}
        slidesPerView={1}
        className="car-swiper"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`car-${i}`} className="car-slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Слайдер мініатюр */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="car-swiper-thumbs"
      >
        {images.map((img, i) => (
          <SwiperSlide key={i}>
            <img src={img} alt={`thumb-${i}`} className="car-thumb-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImegeSlider;
