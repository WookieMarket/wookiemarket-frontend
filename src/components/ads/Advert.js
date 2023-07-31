import React from 'react';
import defaultImage from '../../assets/no_image.jpg';
import '../../css/advert.css';

function Advert({
  _id,
  name,
  description,
  createdAt,
  onSale,
  price,
  image,
  category,
  username,
}) {
  console.log('Rendering Advert component');
  const advDate = new Date(createdAt);
  const images = (image) => {
    if (image) {
      return image;
    } else {
      return defaultImage;
    }
  };
  console.log('_id: ' + _id)
  return (
    <>
      <div className='productInfo' id='advertOnly'>
        <div className='advert-name'>
          <h2>{name}</h2>
        </div>
      </div>
      <br />
      <div className='productData'>
        <div className='product-img'>
          <img
            className='productPhoto'
            src={images(image)}
            alt='imagen del producto en venta'
          ></img>
        </div>
        <br />
        <div className='product_Info'>
          <p className='advert_label'>Description: </p>
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
          <div className='price'>
              <p>{price} <span id='price_coin'> €</span></p>
          </div>
          <div className='advert_label'>
            <p>
              Category:{' '}
              <span className='advert_text'>
              {category === undefined
                ? ''
                : category.join(', ').toLocaleUpperCase()}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className='advert_label'> 
            Username: <span className='advert-text'>{username}</span>
            </p>
          <small className='advert_label'>Created at: <span className='advert_text'>
            {`${advDate.toUTCString()}`}
            </span>
            </small>
        </div>
      </div>
    </>
  );
}

export default Advert;
