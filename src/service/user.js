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

/**
 * returns ads marked as a user's favorites
 *
 * @returns returns ads marked as a user's favorites
 */
export const getFavoriteAds = () => {
  const url = `${usersUrl}/favorite-adverts`;
  return client.get(url);
};

/**
 * add the ad id to favorites
 * @param {*} id
 * @returns add the ad id to favorites
 */
export const includeFavoriteAds = id => {
  const url = `${usersUrl}/favorites/${id}`;
  return client.post(url);
};

/**
 * delete the id of an ad if it is in favorites
 *
 * @returns delete the id of an ad if it is in favorites
 */
export const removeFavorite = id => {
  const url = `${usersUrl}/delete-favorite/${id}`;
  return client.delete(url);
};

/**
 * Send email to the owner of the ad to buy it
 *
 * @returns Send email to the owner of the ad to buy it
 */
export const emailBuy = (adOwnerId, custom_message) => {
  const data = { adOwnerId, custom_message };
  const url = `${usersUrl}/email-buy`;
  return client.post(url, data);
};

/**
 * returns user notifications
 *
 * @returns returns user notifications
 */
export const notification = () => {
  const url = `${usersUrl}/notification`;
  return client.get(url);
};

/**
 * mark a notification as read
 *
 * @returns mark a notification as read
 */
export const isRead = notificationId => {
  const url = `${usersUrl}/isread`;
  return client.put(url, { notificationId });
};
