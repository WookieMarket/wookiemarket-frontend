//import React from 'react';
import { useSelector } from 'react-redux';
import storage from './storage';
import jwt_decode from 'jwt-decode';
import { getIsLogged, getJwt } from '../store/selectors';

function IsDisable(advert) {
  const jwt = useSelector(getJwt);
  const userJwt = jwt || storage.get('auth');
  const isLogged = useSelector(getIsLogged);

  let isAdvertOwner;
  let userId;
  if (userJwt) {
    try {
      userId = jwt_decode(userJwt)._id;
    } catch (error) {
      console.error('Error decoding token: ', error);
    }
    isAdvertOwner = advert && isLogged && advert.userId === userId;
  } else {
    isAdvertOwner = false;
  }

  const isDisabled = !isAdvertOwner;
  return isDisabled;
}

export default IsDisable;
