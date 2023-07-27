import "./App.css";
import "./css/Variables.css";
import "./css/Reset.css";
import LoginPage from "./components/auth/LoginPage";
import RequireAuth from "./components/auth/RequireAuth";

import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/ads/HomePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <RequireAuth>
              <HomePage />
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
