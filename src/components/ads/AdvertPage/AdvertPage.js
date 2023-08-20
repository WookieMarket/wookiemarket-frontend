import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAdvertById } from '../../../store/selectors';
import Advert from '../Advert/Advert';
import { Footer } from '../../layout/Footer';
import Header from '../../layout/Header';
import { useParams } from 'react-router-dom';

const AdvertPage = () => {
  const advDate = new Date();
  const { t } = useTranslation();

  const { id } = useParams();
  console.log('Este es el Id que le está pasando a useSelectot' + id)
  const advert = useSelector((state) => getAdvertById(state, id));
  return (
    <>
      <Header />
      <h1>ADVERT DETAIL</h1>
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
