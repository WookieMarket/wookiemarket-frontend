import client, {
  removeAuthorizationHeader,
  setAuthorizationHeader,
} from '../api/client';
import storage from '../utils/storage';

export const signup = userData => {
  return client.post('/api/auth/signup', userData).then(({ jwt }) => {
    setAuthorizationHeader(jwt);
    storage.set('auth', jwt);
  });
};

export const login = credentials => {
  return client.post('/api/auth/login', credentials).then(({ jwt }) => {
    setAuthorizationHeader(jwt);
    if (credentials.rememberMe) {
      storage.set('auth', jwt);
    }
    console.log('jwt,', jwt);
    return jwt;
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};

export const emailPassword = email => {
  return client.post('api/users/email-password', { to: email });
};

export const resetPassword = (email, newPassword, token) => {
  return client.post('api/users/recover-password', {
    email,
    newPassword,
    token,
  });
};

export const deleteUser = email => {
  return client.post('api/users/deleted-user', { email: email });
};
