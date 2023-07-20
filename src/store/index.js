import { configureStore as rtkconfigureStore } from '@reduxjs/toolkit';

import * as reducers from './reducers';
import * as service from '../service';
import * as actionCreators from './actions';
import { timeStamp } from 'console';

const failureRedirects = (router, redirectsMap) => () => (next) => (action) => {
    const result = next(action);

    if (action.error) {
        const redirect = redirectsMap[action.payload.status];
        if (redirect) {
            router.navigate(redirect);
        }
    }
    return result;
};

export default function configureStore(preloadedState, { router }) {
    const extraMiddleware = [
        timeStamp,
        failureRedirects(router, { 401: '/login, 404: ' / 404 }),
    ];
    const store = rtkconfigureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: { extraArgument: { service, router } },
                serializableCheck: true,
            }).concat(extraMiddleware),
        preloadedState,
        devTools: {
            actionCreators,
        },
    });
    return store;
}
