import { Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './components/auth/login/LoginPage';
import UserInfo from './components/auth/userInfo/UserInfo';
import RequireAuth from './components/auth/RequireAuth';
import SignupPage from './components/auth/signup/SignupPage';
import ResetPasswordPage from './components/auth/resetPassword/ResetPasswordPage';
import AdNew from './components/ads/adsNew/AdNew';
import AdvertsListPage from './components/ads/AdvertsListPage/AdvertsListPage';
import UserAdsListPage from './components/ads/AdvertsListPage/UserAdsListPage';
import DeleteUserPage from './components/auth/deleteUser/DeleteUserPage';
import ModifyAd from './components/ads/ModifyAd/ModifyAd';
import AdvertPage from './components/ads/AdvertPage/AdvertPage';
import FavoriteAdsList from './components/ads/AdvertsListPage/FavoriteAdsList';
import io from 'socket.io-client';
import UserProfilePage from './components/user/UserProfilePage';

import './App.css';
import './css/Variables.css';
import './css/Reset.css';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const socket = io('http://localhost:3001');
    console.log('Conexión establecida con el servidor de Socket.io');
    // Escucha el evento 'precioActualizado' del servidor
    // Unirse a la sala 'anuncios'
    socket.emit('joinRoom', 'anuncios'); // Envía una solicitud al servidor
    socket.on('priceActualizado', ({ advertId, nuevoPrecio }) => {
      console.log(
        'Evento precioActualizado recibido. advertId:',
        advertId,
        'nuevoPrecio:',
        nuevoPrecio,
      );
    });
  }, []);

  return (
    <div className="app">
      <div className="background"></div>
      <div className="content">
        <Routes>
          <Route path="/home" element={<AdvertsListPage />} />

          <Route
            path="/create-ad"
            element={
              <RequireAuth>
                <AdNew />
              </RequireAuth>
            }
          />

          {/* <Route
            path="/ads"
            element={
              <RequireAuth>
                <AdvertsListPage />
              </RequireAuth>
            }
          /> */}

          <Route
            path="/modify/:adId"
            element={
              <RequireAuth>
                <ModifyAd />
              </RequireAuth>
            }
          />

          <Route
            path="/delete-account"
            element={
              <RequireAuth>
                <DeleteUserPage />
              </RequireAuth>
            }
          />

          <Route
            path="/user-info"
            element={
              <RequireAuth>
                <UserInfo />
              </RequireAuth>
            }
          />
          {/* Display ads for current user - private area */}
          <Route
            path="/adverts/:username"
            element={
              <RequireAuth>
                <UserAdsListPage />
              </RequireAuth>
            }
          />
          {/* Display ads of a user - public area */}
          <Route path="/:username/ads" element={<UserAdsListPage />} />
          {/* Redirects to user profile - public area */}
          <Route path="/:username/profile" element={<UserProfilePage />} />

          <Route
            path="/favorite"
            element={
              <RequireAuth>
                <FavoriteAdsList />
              </RequireAuth>
            }
          />

          <Route path="/adverts/:id/:name" element={<AdvertPage />} />

          <Route path="/reset-password" element={<ResetPasswordPage />} />

          <Route path="/signup" element={<SignupPage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/404" element={<div>404 | Not found</div>} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
