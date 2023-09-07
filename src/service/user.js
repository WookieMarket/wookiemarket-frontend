import client from '../api/client';
const usersUrl = '/api/users';

/**
 * This call fetch user informatiion
 * @param {*} id
 * @returns User information
 */
export const getUserInfo = id => {
  const url = `${usersUrl}/id/${id}`;
  return client.get(url);
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
  const url = `${usersUrl}/user-info`;
  return client.post(url, data, config);
};

/**
 * This fetch ads for the given user
 * @param {*} username
 * @returns list of ads
 */
export const getUserAds = username => {
  const url = `${usersUrl}/${username}/ads`;
  return client.get(url);
};

export const getFavoriteAds = () => {
  const url = `${usersUrl}/favorite-adverts`;
  return client.get(url);
};
