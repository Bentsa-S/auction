import React, { useState } from 'react';
import styles from './FilterPanel.module.css';

interface Category {
  categorie: string;
  id: number;
  id_auction: number;
}

interface Props {
  value: string;
  onChange: (value: string) => void;
  allCategories?: Category[];
  showLabel?: boolean;
}

const CategorySearch: React.FC<Props> = ({
  value,
  onChange,
  allCategories = [],
  showLabel = true,
}) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    onChange(input);
  
    if (input.length > 0) {
      const filtered = allCategories
        .map(item => item.categorie) // витягуємо рядки
        .filter(item =>
          item.toLowerCase().includes(input.toLowerCase())
        );
  
        console.log(allCategories);
        
      setSuggestions(filtered);
      setShowSuggestions(true);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      setActiveIndex(prev => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      setActiveIndex(prev => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      onChange(suggestions[activeIndex]);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleClick = (suggestion: string) => {
    onChange(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div className={styles.field} style={{ position: 'relative' }}>
      {showLabel && <label>Категорії</label>}
      <input
        type="text"
        placeholder="Пошук"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className={styles.suggestionsList}>
          {suggestions.map((s, i) => (
            <li
              key={i}
              className={i === activeIndex ? styles.active : ''}
              onMouseDown={() => handleClick(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategorySearch;
