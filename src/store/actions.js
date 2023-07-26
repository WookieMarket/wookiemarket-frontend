import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { areAdvertsLoaded } from './selectors';

export const uiResetError = createAction('ui/resetError');

//Adverts Loading

export const advertsList = createAsyncThunk(
    'adverts/list',
    async ({_,
            extra: {
            service: { advs },
        },
        rejectWithValue
    }) => {
        console.log('Antes del try');
        try {
            console.log('Despachando la acción advertsList');
            const adverts =  await advs.getLastAdv();
            console.log('Anuncios obtenidos:', adverts);
            return adverts;
        } catch (error) {
            return rejectWithValue(error);
        }
    },
    {
        condition:(_, { getState }) => !areAdvertsLoaded(getState(),)
    
    },
);

/*export const advertsLoaded =
    () =>
    async (dispatch, getState, { service: { advs } }) => {
        if (areAdvertsLoaded(getState())) {
            return;
        }
        dispatch(advertsLoadedRequest());
        try {
            const adverts = await advs.getLastAdv();
            dispatch(advertsLoadedSuccess(adverts));
        } catch (error) {
            dispatch(advertsLoadedFailure(error));
            throw error;
        }
    };*/

export const advertsLoadedRequest = createAction('adverts/loaded/request');

export const advertsLoadedSuccess = createAction('adverts/loaded/success'); //PONER adverts como argumento donde se use para que le meta el payload adverts

export const advertsLoadedFailure = createAction(
    'adverts/loaded/failure',
    (error) => ({
        payload: error,
        error: true,
    })
); //PONER error como argumento donde se use para que le meta el payload error

/*export const advertsLoadedSuccess = (adverts) => ({
    type: ADVERTS_LOADED_SUCCESS,
    payload: adverts,
});

export const advertsLoadedFailure = (error) => ({
    type: ADVERTS_LOADED_FAILURE,
    error: true,
    payload: error,
});*/

/*
//TAGS:
export const getTagsListed =
    () =>
    async (dispatch, getState, { service: { advs } }) => {
        if (areTagsLoaded(getState())) {
            return;
        }
        dispatch(tagListRequest());
        try {
            const tags = await advs.getTagList();
            dispatch(tagListSuccess(tags));
        } catch (error) {
            dispatch(tagListFailure(error));
            throw error;
        }
    };

export const tagListRequest = createAction('ADD_TAGS_REQUEST');

export const tagListSuccess = createAction('ADD_TAGS_SUCCESS'); //PONER tags como argumento donde se use para que le meta el payload tags

export const tagListFailure = createAction('ADD_TAGS_FAILURE', (error) => ({
    payload: error,
    error: true,
})); //PONER error como argumento donde se use para que le meta el payload error
*/

//Filters

export const adFilterName = createAction('adv_filter_name', (value) => ({
    payload: value,
}));
