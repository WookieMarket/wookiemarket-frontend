import client from '../../api/client';

const advUrl = '/api/v1/adverts';

export const getLastAdv = () => {
    const url = `${advUrl}`;
    return client.get(url);
};
