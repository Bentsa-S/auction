import React, { useEffect, useState } from 'react';
import styles from './FilterPanel.module.css';
import CategorySearch from './CategorySearch';
import { getCategorie } from '../../../../api/categorie';
import { useLanguage } from '../../../../LanguageContext';
import { translations } from '../../../../i18n';


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
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const { lang } = useLanguage();
  const t = translations[lang];

  useEffect(() => {
    const fetchCategories = async () => {
      const categorie = await getCategorie();
      setAllCategories(categorie);
    };
    fetchCategories();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter({
      categorie: category || undefined,
      to: endDate || undefined,
    });
  };

  return (
    <div className={styles.filterContainer}>
      <h2 className={styles.title}>{t.filter}</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        <CategorySearch
          value={category}
          onChange={setCategory}
          allCategories={allCategories}
        />
        <div className={styles.field}>
          <label>{t.auctionEnd}</label>
          <input value={endDate} onChange={e => setEndDate(e.target.value)} type="date" />
        </div>
        <button type="submit" className={styles.searchBtn}>{t.search}</button>
      </form>
    </div>
  );
};

export default FilterPanel;
