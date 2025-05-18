import React, { useState } from 'react';
import styles from './FilterPanel.module.css';
import CategorySearch from './CategorySearch';

const allCategories = ['Ноутбук', 'Автомобіль', 'Телефон', 'Мода', 'Дім', 'Камера', 'Навушники'];

interface FilterData {
  categorie?: string;
  to?: string;
}

interface FilterPanelProps {
  onFilter: (filter: FilterData) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ onFilter }) => {
  const [category, setCategory] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      categorie: category || undefined,
      to: endDate || undefined,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>Фільтр</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <CategorySearch
          value={category}
          onChange={setCategory}
          allCategories={allCategories}
        />
        <div className={styles.field}>
          <label>Закінчення аукціона</label>
          <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" />
        </div>

        <button type="submit" className={styles.searchBtn}>Пошук</button>
      </form>
    </div>
  );
};

export default FilterPanel;
