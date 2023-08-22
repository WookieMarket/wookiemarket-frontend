import client from '../api/client';

const adUrl = '/api/ads/adverts';

export const getCategories = (adCategories) => {
  const url = `${adUrl}/categories`;
  return client.get(url);
};

export const getAd = (adId) => {
  const url = `${adUrl}/${adId}`;
  return client.get(url);
};

export const createAd = (ad) => {
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const url = `${adUrl}/create`;
  return client.post(url, ad, config);
};

export const getRecentAds = () => {
  const url = `${adUrl}`;
  return client.get(url);
};
