import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';

import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';

const router =
    createBrowserRouter([
        {
            path: '*',
            element: <App />,
        }
    ]);
  
const store = configureStore({ router });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <Root store={store} router={router} />
  </React.StrictMode>
);

reportWebVitals();