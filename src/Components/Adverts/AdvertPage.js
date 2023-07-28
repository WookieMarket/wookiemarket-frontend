import React from 'react';

const AdvertPage = ({ name, image, description, sale, price }) => {
  return (
    <div>
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{description}</p>
      <p>{sale ? 'For sale' : 'Purchase'}</p>
      <p>Price: {price}</p>
    </div>
  );
};

export default AdvertPage;
