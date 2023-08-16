import React from 'react';
import Fields from '../layout/Fields';
import defaultImage from '../../assets/no_image.jpg';
import '../../css/advert.css';

function Advert({ advert, onImageError }) {
  console.log('Rendering Advert component');
  //const advDate = new Date(advert.createdAt);
  if (!advert) {
    console.error('No advertisement with the specified ID found');
    return <p>The specified advertisement could not be found.</p>;
  }

  return (
    <>
      <div className='productInfo' id='advertOnly'>
        <div className='advert-name'>
          <h2>
            <Fields value={advert.name} />
          </h2>
        </div>
      </div>
      <br />
      <div className='productData'>
        <div className='product-img'>
          <img
            className='productPhoto'
            src={advert.image || defaultImage}
            onError={onImageError}
            alt='imagen del producto en venta'
          ></img>
        </div>
        <br />
        <div className='product_Info'>
          <p className='advert_label'>Description: </p>
          <Fields value={advert.description} />
          {/*<span className='description'> {advert.description}</span>*/}
          <br />
          <br />
          <p>
            Is
            {advert.onSale ? (
              <span id='isSale'> for sale </span>
            ) : (
              <span id='isSale'> purchased </span>
            )}
            this product by:
          </p>
          <div className='price'>
            <p>
              <Fields value={advert.price} />
              {/*{advert.price}*/}{' '}
              <span id='price_coin'>
                {' '}
                <Fields value={advert.coin} />
              </span>
            </p>
          </div>
          <div className='advert_label'>
            <p>Category: </p>
            <p>Category: </p>
            <span className='advert_text'>
              {advert.category &&
                advert.category.map((cat) => (
                  <Fields key={cat} value={cat.toLocaleUpperCase()} />
                ))}
            </span>
            {/*</span><span className='advert_text'>
                {advert.category === undefined
                  ? ''
                  : advert.category.join(', ').toLocaleUpperCase()}
              </span>
            */}
          </div>
        </div>
        <div>
          <p className='advert_label'>
            Username: <Fields value={advert.username} />
            {/*<span className='advert-text'>{advert.username}</span>*/}
          </p>
          <small className='advert_label'>
            Created at:{' '}
            {
              //<span className='advert_text'>{`${advDate.toUTCString()}`}</span>
            }
          </small>
        </div>
      </div>
    </>
  );
}

export default Advert;
