import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
//import io from 'socket.io-client';

// import i18n (needs to be bundled ;))
//import "./i18n";
import storage from './utils/storage';
import { setAuthorizationHeader } from './api/client';

import configureStore from './store';

import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';

const accessToken = storage.get('auth');

if (accessToken) {
  setAuthorizationHeader(accessToken);
}

const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
  },
]);

const store = configureStore(
  {
    auth: {
      auth: !!accessToken,
      jwt: '',
    },
  },
  { router },
);

const root = ReactDOM.createRoot(document.getElementById('root'));

// Configura la conexión del socket en index.js
//const socket = io('http://localhost:3001');

root.render(
  <React.StrictMode>
    <Root store={store} router={router} />
  </React.StrictMode>,
);
