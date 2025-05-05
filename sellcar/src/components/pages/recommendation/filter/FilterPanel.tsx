import React, { useState } from 'react';
import styles from './FilterPanel.module.css';
import CategorySearch from './CategorySearch';

const allCategories = ['Ноутбук', 'Автомобіль', 'Телефон', 'Мода', 'Дім', 'Камера', 'Навушники'];

const FilterPanel: React.FC = () => {
  const [category, setCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priceFrom, setPriceFrom] = useState('');
  const [priceTo, setPriceTo] = useState('');

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Фільтр</h2>
      <form className={styles.form}>
        <CategorySearch
          value={category}
          onChange={setCategory}
          allCategories={allCategories}
        />

        <div className={styles.field}>
          <label>Початок аукціону</label>
          <input value={startDate} onChange={e => setStartDate(e.target.value)} type="date" />
        </div>
        <div className={styles.field}>
          <label>Закінчення аукціона</label>
          <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" />
        </div>
        <div className={styles.field}>
          <label>Ціна від</label>
          <input value={priceFrom} onChange={e => setPriceFrom(e.target.value)} type="number" />
        </div>
        <div className={styles.field}>
          <label>Ціна до</label>
          <input value={priceTo} onChange={e => setPriceTo(e.target.value)} type="number" />
        </div>

        <button type="submit" className={styles.searchBtn}>Пошук</button>

      </form>

    </div>
  );
};

export default FilterPanel;
