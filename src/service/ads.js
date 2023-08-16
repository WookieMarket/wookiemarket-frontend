import client from '../api/client';

const advUrl = '/adverts';

export const getLastAdv = () => {
    const url = `${advUrl}`;
    return client.get(url);
};

/*Incremenetar los likes: https://www.youtube.com/watch?v=I7jaHPqef10&ab_channel=JAB 26:49*/