import React from 'react';
import './AuthPanel.css';
import { useAuthForm } from '../../hock/useAuthForm';
import { postLogin, postRegistration } from '../../api/user';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const AuthPanel: React.FC<Props> = ({ isOpen, onClose }) => {
  const {
    isLogin,
    toggleMode,
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    validateForm
  } = useAuthForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Будь ласка, заповніть усі поля правильно');
      return;
    }
  
    try {
      let userData;
      if (isLogin) {
        userData = await postLogin({ username: name, password });
      } else {
        userData = await postRegistration({ email, password, name });
      }
  
      if (userData) {
        localStorage.setItem('auction_token', userData);
        alert('Успішно!');
        onClose();
      }
    } catch (error) {
      console.error('Помилка автентифікації:', error);
      alert('Щось пішло не так');
    }
  };
  
  return (
    <div className={`auth-overlay ${isOpen ? 'show' : ''}`}>
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{isLogin ? 'Вхід' : 'Реєстрація'}</h2>

        <form onSubmit={handleSubmit}>
          {!isLogin && (  
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}
          <input
            type="text"
            placeholder="Ім’я"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {!isLogin && (
            <input
              type="password"
              placeholder="Повторіть пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          )}
          <button type="submit">{isLogin ? 'Увійти' : 'Зареєструватися'}</button>
        </form>

        <div className="toggle-text">
          {isLogin ? (
            <>
              Немає акаунту? <button onClick={toggleMode}>Зареєструйтесь</button>
            </>
          ) : (
            <>
              Вже є акаунт? <button onClick={toggleMode}>Увійдіть</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPanel;
