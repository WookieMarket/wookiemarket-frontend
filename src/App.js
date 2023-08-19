import './App.css';
import './css/Variables.css';
import './css/Reset.css';
import LoginPage from './components/auth/login/LoginPage';
import RequireAuth from './components/auth/RequireAuth';

import { Route, Routes, Navigate } from 'react-router-dom';
import ResetPasswordPage from './components/auth/resetPassword/ResetPasswordPage';
import AdNew from './components/ads/adsNew/AdNew';
import { useTranslation } from 'react-i18next';
import AdvertsListPage from './components/ads/AdvertsListPage/AdvertsListPage';

function App() {
  const { t } = useTranslation();
  return (
    <div className='App'>
      <div className='background'></div>
      <div className='content'>
        {t('welcomeMessage')}
        <Routes>
          <Route path='/home' element={<AdvertsListPage />} />
          <Route
            path='/create-ad'
            element={
              <RequireAuth>
                <AdNew />
              </RequireAuth>
            }
          />
          <Route
            path='/ads'
            element={
              <RequireAuth>
                <AdvertsListPage />
              </RequireAuth>
            }
          />
          <Route path='/reset-password' element={<ResetPasswordPage />} />

          <Route path='/login' element={<LoginPage />} />

          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/404' element={<div>404 | Not found</div>} />
          <Route path='*' element={<Navigate to='/404' />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
