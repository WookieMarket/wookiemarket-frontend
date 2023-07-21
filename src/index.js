import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import configureStore from './store';
import { createRoot } from 'react-dom/client';
import Root from './Root';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '*',
        element: <App />,
    },
]);

const store = configureStore({}, { router });

const root = createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Root store={store} router={router} />
    </React.StrictMode>
);

reportWebVitals();
