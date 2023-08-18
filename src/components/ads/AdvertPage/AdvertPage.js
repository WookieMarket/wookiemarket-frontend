import React from 'react';
import { useTranslation } from 'react-i18next';

const AdvertPage = ({ name, image, description, onSale, price, username }) => {
  const advDate = new Date();
  const { t } = useTranslation();
  return (
    <>
      <div>
        <h2>{t('name')}</h2>
        <br />

        <img src={image} alt={name} />
        <br />

        <p className='advert-label'>Description:</p>
        <span className='description'> {t('description')}</span>
        <br />
        <br />
        <p>
          {t('Is')}
          {onSale ? (
            <span id='isSale'> {t('for sale')} </span>
          ) : (
            <span id='isSale'> {t('purchased')} </span>
          )}
          {t('this product by')}:
        </p>
        <br />
        <div className='price_number'>
          <p>{t('price')}</p>
        </div>
        <div className='price_coin'>
          <p>€</p>
        </div>
      </div>
      <div>
        <span className='tweet-username'>{t('username')}</span>
        <small>
          {t('Created at')}: {`${advDate.toUTCString()}`}
        </small>
      </div>
    </>
  );
};

export default AdvertPage;
