import AdvertPage from '../AdvertPage';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { createStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import ads from '../../../../store/slices/ads';
import auth from '../../../../store/slices/auth';
import ui from '../../../../store/slices/ui';

jest.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: {
      changeLanguage: jest.fn(),
    },
  }),
}));

const rootReducer = combineReducers({
  ads: ads,
  auth: auth,
  ui: ui,
});

describe('AdvertPage', () => {
  const initialState = {
    ads: {
      areLoaded: true,
      data: [
        {
          id: '1',
          name: 'Advert 1',
          description: 'Advert 1 description',
          price: 100,
        },
        {
          id: '2',
          name: 'Advert 2',
          description: 'Advert 2 description',
          price: 200,
        },
      ],
    },
    ui: {
      isLoading: false,
      showModal: false,
      error: null,
    },
    auth: true,
  };
  const renderComponent = (advertId) => {
    const store = {
      getState: () => {
        return { ...initialState };
      },
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`/adverts/${advertId}`]}>
          <Routes>
            <Route path='/adverts/:advertId' element={<AdvertPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  };
  const renderAdvertPage = (initialEntries) => {
    const store = createStore(rootReducer, initialState);
    return render(
      <Provider store={store}>
        <MemoryRouter initialEntries={initialEntries}>
          <AdvertPage />
        </MemoryRouter>
      </Provider>
    );
  };

  test('Should handle navigation and useParams', () => {
    const advertId = '1';
    const advert = initialState.ads.data.find(
      (advert) => advert.id === advertId
    );

    renderComponent(advertId);

    expect(screen.getByText(advert.name)).toBeInTheDocument();
  });

  test('Should show advert data', () => {
    renderAdvertPage(['/adverts/1']);

    expect(screen.getByText('Advert 1')).toBeInTheDocument();
    expect(screen.getByText('Advert 1 description')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  test('Should render correctly and show expected content', () => {
    renderAdvertPage(['/adverts/1']);

    expect(screen.getByText('ADVERT DETAIL')).toBeInTheDocument();
    expect(screen.getByText('Advert 1')).toBeInTheDocument();
    expect(screen.getByText('Advert 1 description')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });
  test('Should match snapshot', () => {
    const { asFragment } = renderAdvertPage(['/adverts/1']);
    expect(asFragment()).toMatchSnapshot();
  });

  //Errors testing
  /*test('Should show error message when advert id does not exist', () => {
    const advertId = '999';
    renderComponent(advertId);

    expect(screen.getByText('Sorry, the requested ad is not available')).toBeInTheDocument();
  });*/
});
