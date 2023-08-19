import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAdvertById } from '../../../store/selectors';
import Advert from '../Advert/Advert';

const AdvertPage = ({ advertId }) => {
  const advDate = new Date();
  const { t } = useTranslation();

  const advert = useSelector((state) => getAdvertById(state, advertId));
  return (
    <>
      <div className='content'>
        <Advert {...advert} />
      </div>
    </>
  );
};

export default AdvertPage;
