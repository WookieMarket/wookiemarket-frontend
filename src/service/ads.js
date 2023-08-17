import client from "../api/client";

const adUrl = "/api/ads/adverts";

export const getAd = adId => {
  const url = `${adUrl}/${adId}`;
  return client.get(url);
};

export const createAd = ad => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const url = `${adUrl}/create`;
  return client.post(url, ad, config);
};

// export const getLastAdv = () => {
//   const url = `${adUrl}`;
//   return client.get(url);
// };

export const getRecentAds = () => {
  const url = `${adUrl}`;
  return client.get(url);
};
