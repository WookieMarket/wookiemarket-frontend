import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAdvertById } from '../../../store/selectors';
import Advert from '../Advert/Advert';
import { Footer } from '../../layout/Footer';
import Header from '../../layout/Header';

const AdvertPage = ({ advertId }) => {
  const advDate = new Date();
  const { t } = useTranslation();

  const advert = useSelector((state) => getAdvertById(state, advertId));
  return (
    <>
        <Header />
      <div className='holo'></div>
      <div className='content'>
        <Advert {...advert} />
        <div className='holoBase'></div>
      </div>
        <Footer />
    </>
  );
};

export default AdvertPage;
