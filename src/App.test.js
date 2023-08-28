import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../src/store/slices/auth';
import uiReducer from '../src/store/slices/ui';
import adsReducer from '../src/store/slices/auth';

test('renders learn react link', () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      ads: adsReducer,
      ui: uiReducer, // Agrega el slice uiReducer al store
    },
    preloadedState: {
      auth: false,
      ui: { error: null }, // Establece el estado de error en el slice ui
    },
  });

  render(
    <Provider store={store}>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </Provider>,
  );
  const linkElement = screen.getByText(/welcomeMessage/);
  expect(linkElement).toBeInTheDocument();
});*/
