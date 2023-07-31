import client from '../api/client';

const advUrl = '/adverts';

export const getLastAdv = () => {
    const url = `${advUrl}`;
    return client.get(url);
};