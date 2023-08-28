import client from '../api/client';

export const getUserInfo = id => {
  return client.get('api/users/id/' + id);
};
