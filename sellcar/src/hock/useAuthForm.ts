import { useState } from 'react';

export const useAuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleMode = () => setIsLogin(!isLogin);

  const validateForm = (): boolean => {
    console.log(email, password, confirmPassword);
    
    if (!name || !password) return false;
    if (!isLogin) {
      if (!name || password !== confirmPassword) return false;
    }
    return true;
  };

  return {
    isLogin,
    toggleMode,
    name, setName,
    email, setEmail,
    password, setPassword,
    confirmPassword, setConfirmPassword,
    validateForm
  };
};
