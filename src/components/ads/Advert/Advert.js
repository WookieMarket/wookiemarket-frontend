import React from 'react';
import './advert.css';
import defaultImage from '../../../assets/no_image.jpg';
import { useTranslation } from 'react-i18next';
import FavoriteAds from '../../shared/FavoriteAds/FavoriteAds';
import { Link } from 'react-router-dom';

function Advert(advert) {
  const { t } = useTranslation();
  //const advDate = new Date(advert.createdAt);
  //const defaultImage = process.env.DEFAULT_NO_IMAGE_URL;
  const handleImageError = event => {
    event.target.src = defaultImage;
  };
  const adId = advert._id;
  console.log('id del anuncio', advert._id);
  console.log('id del anuncio2', adId);
  // const images = image => {
  //   if (image) {
  //     return image;
  //   } else {
  //     return defaultImage;
  //   }
  // };
  //Cleaning & making friendly URL
  const cleanUpForURL = text => {
    return text
      .toLowerCase()
      .replace(/ /g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]/g, ''); // Remove special characters
  };

  // Generates the URL using the _id of the advert and the name field
  const generateAdvertURL = advert => {
    const cleanName = cleanUpForURL(advert.name);
    return `/adverts/${advert._id}/${cleanName}`;
  };

  return (
    <>
      <div className="productInfo hologram-text tv-text" id="advertOnly">
        <div id="advert-name" className="advert-name">
          <h2>{advert.name}</h2>
          <FavoriteAds id={adId} />
        </div>
      </div>
      <div className="productData ">
        <div className="product-img">
          <Link to={generateAdvertURL(advert)}>
            {
              <img
                className="img"
                src={advert.image}
                onError={handleImageError}
                alt={t('Product image')}
              ></img>
            }
          </Link>
        </div>

        <div className="productInfo">
          <p className="description">{t('Description')}:</p>

          <span className="description "> {advert.description}</span>

          <p className="hologram-text tv-text bottomSpace">
            {t('Is&')}
            {advert.onSale === true ? (
              <span id="isSale"> {t('for sale')} </span>
            ) : (
              <span id="isSale"> {t('purchased')} </span>
            )}
            {t('this product by')}:
          </p>
          <div className="price .tv-text bottomSpace">
            <p>
              {advert.price} <span id="price_coin"> {advert.coin}</span>
            </p>
          </div>
          <div className="advert_label hologram-text tv-text">
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
          <p className="advert_label hologram-text tv-text">
            {t('Username')}:{' '}
            <span className="advert-text">{advert.username}</span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Advert;
