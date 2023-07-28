import React from 'react';
import defaultImage from '../../assets/no_image.jpg';

const Advert = ({ name, createdAt, sale, price, image, category }) => {
    console.log('Rendering Advert component')
  const advDate = new Date(createdAt);
  const images = (image) => {
    if (image) {
      return image;
    } else {
      return defaultImage;
    }
  };

  return (
    <>
      <div className="productInfo" id="advertOnly" tyle={{ border: '1px solid red' }}>
        <p>Debería haber un anuncio aquí</p>
        <div className="productName">
          <h1>{name}</h1>
          <small>Created at: {`${advDate.toUTCString()}`}</small>
        </div>

        <div className="productData">
          <p>
            {' '}
            Is
            {sale ? (
              <span id="isSale"> for sale </span>
            ) : (
              <span id="isSale"> purchased </span>
            )}
            this product by:
          </p>
          <h2>{price} €</h2>
        </div>

        <div className="product-img">
          <img
            className="productPhoto"
            src={images(image)}
            alt="imagen del producto en venta"
          ></img>
        </div>

        <div className="typeTag">
          <p>
            Category:{' '}
            {category === undefined
              ? ''
              : category.join(', ').toLocaleUpperCase()}
          </p>
        </div>
      </div>
    </>
  );
};

export default Advert;
