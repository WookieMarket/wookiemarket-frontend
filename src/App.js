import "./App.css";
import "./css/Variables.css";
import "./css/Reset.css";
import Layout from "./components/layout/Layout";
import LoginPage from "./components/auth/LoginPage";

import { Route, Routes, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/home"
        element={
          <Layout>
            <div className="App">Hola Mandalorians!</div>
          </Layout>
        }
      />
      <Route path="/login" element={<LoginPage />} />

      <Route path="/404" element={<div>404 | Not found</div>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
