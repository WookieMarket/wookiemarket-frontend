import client from "../api/client";

const adUrl = "/api/ads/adverts";

export const getAd = adId => {
  const url = `${adUrl}/${adId}`;
  return client.get(url);
};

export const createAd = ad => {
  const url = `${adUrl}/create`;
  return client.post(url, ad, {});
};
