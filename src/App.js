import { Route, Routes, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LoginPage from './components/auth/login/LoginPage';
import RequireAuth from './components/auth/RequireAuth';
import SignupPage from './components/auth/signup/SignupPage';
import ResetPasswordPage from './components/auth/resetPassword/ResetPasswordPage';
import AdNew from './components/ads/adsNew/AdNew';
import AdvertsListPage from './components/ads/AdvertsListPage/AdvertsListPage';
import DeleteUserPage from './components/auth/deleteUser/DeleteUserPage';
import ModifyAd from './components/ads/ModifyAd/ModifyAd';
import AdvertPage from './components/ads/AdvertPage/AdvertPage';

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      <div className="background"></div>
      <div className="content">
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
            path="/ads"
            element={
              <RequireAuth>
                <AdvertsListPage />
              </RequireAuth>
            }
          />

          <Route
            path="/modify"
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
