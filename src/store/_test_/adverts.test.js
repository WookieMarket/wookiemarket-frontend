
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { advertsLoadedRequest } from '../actions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
