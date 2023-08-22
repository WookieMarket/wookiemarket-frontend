import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById } from '../../../store/slices/ads';
import Advert from '../Advert/Advert';
import { Footer } from '../../layout/Footer';
import Header from '../../layout/Header';
import { useParams } from 'react-router-dom';
import './advertPage.css';
import { getAdvertById } from '../../../store/selectors';

const AdvertPage = () => {
  const { t } = useTranslation();

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAdById(id));
  }, [dispatch, id]);

  const advert = useSelector((state) => getAdvertById(state, id));
console.log('esto es advert: ' + advert)

  return (
    <>
      <Header />
      <div className={'content'}>
        <div className='holobackground'></div>
        <h1>
          <span className='StarWarsObject fontInverted'>*</span>
          {t('ADVERT DETAIL')}
          <span className='StarWarsObject'>*</span>
          </h1>
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
