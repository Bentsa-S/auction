import Navigation from "./components/navigation/Navigation"
import MainPage from "./components/pages/main/MainPage"
import { Route, Routes } from "react-router-dom"
import RecommendationPage from "./components/pages/recommendation/RecommendationPage"
import CarDetails from "./components/pages/details/CarDetails"
import AddAuctionForm from "./components/pages/add/AddAuctionForm"

import './App.css'
import CabinetPage from "./components/pages/cabinet/CabinetPage"
function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/recomendation" element={<RecommendationPage/>} />
        <Route path="/cars" element={<AddAuctionForm/>} />
        <Route path="/computers" element={<CabinetPage/>} />
        <Route path="/fashion" element={<div>Сторінка моди</div>} />
        <Route path="/home" element={<div>Сторінка дому</div>} />
        <Route path="*" element={<MainPage/>} />
        <Route path="/car/:id" element={<CarDetails />} />
      </Routes>
    </>
  )
}

export default App
