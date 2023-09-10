import client from '../api/client';

const adUrl = '/api/ads/adverts';

export const getAd = adId => {
  const url = `${adUrl}/${adId}`;
  return client.get(url);
};

export const createAd = ad => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const url = `${adUrl}/create`;
  return client.post(url, ad, config);
};

export const modifyAd = (adId, ad) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const url = `${adUrl}/update/${adId}`;
  return client.put(url, ad, config);
};

export const deleteAdvert = (advertId) => {
  const url = `${adUrl}/${advertId}`;
  return client.delete(url);
};

export const getCategories = () => {
  const url = `${adUrl}/categories?categories=true`;
  return client.get(url);
};

export const getRecentAds = (skip, limit) => {
  const url = `${adUrl}/filter?skip=${skip}&limit=${limit}`;
  return client.get(url);
};
