import Navigation from "./components/navigation/Navigation"
import MainPage from "./components/pages/main/MainPage"
import { Route, Routes } from "react-router-dom"
import RecommendationPage from "./components/pages/recommendation/RecommendationPage"
import CarDetails from "./components/pages/details/CarDetails"
import AddAuctionForm from "./components/pages/add/AddAuctionForm"
import { useEffect } from 'react';
import { readableColor } from 'polished';
import { LanguageProvider } from "./LanguageContext";

import './App.css'
import CabinetPage from "./components/pages/cabinet/CabinetPage"
import Statistick from "./components/pages/statistick/Statistick"
import FollowPage from "./components/pages/follow/FollowPage"

function App() {
  useEffect(() => {
    // Встановити main color з localStorage або дефолтний
    const mainColor = localStorage.getItem('mainColor') || '#f0cb3a';
    document.documentElement.style.setProperty('--main-color', mainColor);
    // Визначити контрастний текстовий колір
    const textColor = readableColor(mainColor, '#111', '#fff');
    document.documentElement.style.setProperty('--text-color', textColor);
  }, []);

  return (
    <LanguageProvider>
      <Navigation />
      <Routes>
        <Route path="/recomendation" element={<RecommendationPage/>} />
        <Route path="/cars" element={<AddAuctionForm/>} />
        <Route path="/profile" element={<CabinetPage/>} />
        <Route path="/statistick/:id" element={<Statistick/>} />
        <Route path="/add" element={<AddAuctionForm/>} />
        <Route path="/follow" element={<FollowPage/>} />
        <Route path="*" element={<MainPage/>} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
    </LanguageProvider>
  )
}

export default App
