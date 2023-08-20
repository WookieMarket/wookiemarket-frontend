import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getAdvertById } from '../../../store/selectors';
import Advert from '../Advert/Advert';
import { Footer } from '../../layout/Footer';
import Header from '../../layout/Header';
import { useParams } from 'react-router-dom';
import './advertPage.css';

const AdvertPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();

  const advert = useSelector((state) => getAdvertById(state, id));
  return (
    <>
      <Header />
      <div className={'content'}>
        <div className='holobackground'></div>
        <h1>{t('ADVERT DETAIL')}</h1>
        {advert ? (
          <Advert {...advert} />
        ) : (
          <p>{t('Sorry, the requested ad is not available')}</p>
        )}
        <div
          className={`no-advert_content ${!advert ? 'no-advert' : ''}`}
        ></div>
      </div>
      <div className={`holoBase ${!advert ? 'holoBaseNoAdvert' : ''}`}>
        Hola
      </div>
      <Footer />
    </>
  );
};

export default AdvertPage;
