import React from 'react';
import './advert.css';
import defaultImage from '../../../assets/no_image.jpg';
import { useTranslation } from 'react-i18next';

function Advert(advert) {
  const { t } = useTranslation();
  //const advDate = new Date(advert.createdAt);
  //const defaultImage = process.env.DEFAULT_NO_IMAGE_URL;
  const handleImageError = event => {
    event.target.src = defaultImage;
  };

  // const images = image => {
  //   if (image) {
  //     return image;
  //   } else {
  //     return defaultImage;
  //   }
  // };
  return (
    <>
      <div className="productInfo" id="advertOnly">
        <div className="advert-name">
          <h2>{advert.name}</h2>
        </div>
      </div>
      <br />
      <div className="productData ">
        <div className="product-img">
          {
            <img
              className="img"
              src={advert.image}
              onError={handleImageError}
              alt={t('Product image')}
            ></img>
          }
        </div>
        <br />
        <div className="productInfo">
          <p className="advert_label">{t('Description')}</p>

          <span className="description"> {advert.description}</span>

          <p>
            {t('Is&')}
            {advert.onSale === true ? (
              <span id="isSale"> {t('for sale')} </span>
            ) : (
              <span id="isSale"> {t('purchased')} </span>
            )}
            {t('this product by')}:
          </p>
          <div className="price">
            <p>
              {advert.price} <span id="price_coin"> {advert.coin}</span>
            </p>
          </div>
          <div className="advert_label">
            <p>
              {t('Category')}:{' '}
              <span className="advert-text">
                {advert.category === undefined
                  ? ''
                  : advert.category.join(', ').toLocaleUpperCase()}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="advert_label">
            {t('Username')}:{' '}
            <span className="advert-text">{advert.username}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Advert;
