import client from '../api/client';

/**
 * This call fetch user informatiion
 * @param {*} id
 * @returns User information
 */
export const getUserInfo = id => {
  return client.get('api/users/id/' + id);
};

/**
 * This updates user information
 * @param {*} data
 * @returns
 */
export const editUserData = data => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  return client.post('api/users/user-info', data, config);
};

/**
 * This fetch ads for the given user
 * @param {*} username
 * @returns list of ads
 */
export const getUserAds = username => {
  return client.get(`api/users/${username}/ads`);
};
