
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { advertsLoadedRequest, advertsLoadedFailure, advertsList } from '../actions';
import { defaultState } from '../reducers';
import { adverts } from '../slices/adverts';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//Actions
describe('advertsLoadedRequest action', () => {
  it('should dispatch the advertsLoadedRequest action', () => {
    const store = mockStore({});

    // Simulate dispatching the advertsLoadedRequest action
    store.dispatch(advertsLoadedRequest());

    // Verify that the advertsLoadedRequest action was dispatched
    const actions = store.getActions();
    expect(actions[0]).toEqual(advertsLoadedRequest());
  });
});

describe('advertsLoadedFailure action', () => {
  test('returns the expected action object', () => {
    const error = new Error('Test error');
    const expectedAction = {
      type: 'adverts/loaded/failure',
      payload: error,
      error: true,
    };
    expect(advertsLoadedFailure(error)).toEqual(expectedAction);
  });
});

//Reducers

describe('adverts reducer', () => {
  test('handles advertsList.fulfilled action', () => {
    const initialState = defaultState.adverts;
    const payload = [{ id: 1, name: 'Test advert' }];
    const action = advertsList.fulfilled(payload);
    const expectedState = {
      areLoaded: true,
      data: payload,
    };
    expect(adverts(initialState, action)).toEqual(expectedState);
  });
});

//Selectors
