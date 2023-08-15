import "./App.css";
import "./css/Variables.css";
import "./css/Reset.css";
import LoginPage from "./components/auth/login/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";

import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/ads/HomePage";
import ResetPasswordPage from "./components/auth/resetPassword/ResetPasswordPage";
import AdNew from "./components/ads/adsNew/AdNew";
import { useTranslation } from "react-i18next";

function App() {
  const { t } = useTranslation();
  return (
    <div className="App">
      {t("welcomeMessage")}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/create-ad"
          element={
            <RequireAuth>
              <AdNew />
            </RequireAuth>
          }
        />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/404" element={<div>404 | Not found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
