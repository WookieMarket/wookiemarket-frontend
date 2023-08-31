import client from '../api/client';

export const getUserInfo = id => {
  return client.get('api/users/id/' + id);
};

export const editUserData = data => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return client.post('api/users/user-info', data, config);
};
