import React from 'react';

import './RecommendationPage.css';
import CarCard from '../card/CarCard';
import FilterPanel from './filter/FilterPanel';

const RecommendationPage: React.FC = () => {
  return (
    <div className="page">
      <FilterPanel/>

      <section className="recommendations">
        <div className="recommendations-header">Рекомендації</div>

        <div className="cards">
          <CarCard />
          <CarCard />
          <CarCard />
          <CarCard />
        </div>
      </section>
    </div>
  );
};

export default RecommendationPage;
