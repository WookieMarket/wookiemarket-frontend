import "./App.css";
import "./css/Variables.css";
import "./css/Reset.css";
import LoginPage from "./components/auth/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";

import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/ads/HomePage";
import AdvertsListPage from './components/adverts/AdvertsListPage';
import { Navigate, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Layout>
      <div className='App'>Hola Mandalorians!</div>
      <Routes>
        <Route path='/home' element={<AdvertsListPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/404" element={<div>404 | Not found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </Layout>
  );
}

export default App;
