import "./App.css";
import "./css/Variables.css";
import "./css/Reset.css";
import LoginPage from "./components/auth/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";

import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/ads/HomePage";
import AdvertsListPage from "./components/ads/AdvertsListPage";

function App() {
  return (
    <div className="App">
      Hola Mandalorians!
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route
          path="/ads"
          element={
            <RequireAuth>
              <AdvertsListPage />
            </RequireAuth>
          }
        />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/404" element={<div>404 | Not found</div>} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
