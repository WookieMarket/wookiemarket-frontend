import React from 'react';
import '../../css/advert.css';

const AdvertPage = ({ name, image, description, onSale, price, username }) => {
  const advDate = new Date();
  return (
    <>
      <div>
        <h2>{name}</h2>
        <br />

        <img src={image} alt={name} />
        <br />

        <p className='advert-label'>Description:</p>
        <span className='description'> {description}</span>
        <br />
        <br />
        <p>
          Is
          {onSale ? (
            <span id='isSale'> for sale </span>
          ) : (
            <span id='isSale'> purchased </span>
          )}
          this product by:
        </p>
        <br/>
        <div className='price_number'>
          <p>{price}</p>
        </div>
        <div className='price_coin'>
          <p>€</p>
        </div>
      </div>
      <div>
        <span className='tweet-username'>{username}</span>
        <small>Created at: {`${advDate.toUTCString()}`}</small>
      </div>
    </>
  );
};

export default AdvertPage;
