import './App.css';
import './css/Variables.css';
import './css/Reset.css';
import LoginPage from './components/auth/login/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import SignupPage from './components/auth/signup/SignupPage';

import { Route, Routes, Navigate } from 'react-router-dom';

import ResetPasswordPage from './components/auth/resetPassword/ResetPasswordPage';
import AdNew from './components/ads/adsNew/AdNew';
import { useTranslation } from 'react-i18next';
import AdvertsListPage from './components/ads/AdvertsListPage/AdvertsListPage';
import DeleteUserPage from './components/auth/deleteUser/DeleteUserPage';

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      {t('welcomeMessage')}
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
        <Route
          path="/delete-account"
          element={
            <RequireAuth>
              <DeleteUserPage />
            </RequireAuth>
          }
        />

        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/404" element={<div>404 | Not found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
