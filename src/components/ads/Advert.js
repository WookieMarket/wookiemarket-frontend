import React from "react";
import defaultImage from "../../assets/no_image.jpg";
import "../../css/advert.css";

function Advert({ advert, onImageError }) {
  console.log("Rendering Advert component");
  const advDate = new Date(advert.createdAt);
  const images = image => {
    if (image) {
      return image;
    } else {
      return defaultImage;
    }
  };
  return (
    <>
      <div className="productInfo" id="advertOnly">
        <div className="advert-name">
          <h2>{advert.name}</h2>
        </div>
      </div>
      <br />
      <div className="productData">
        <div className="product-img">
          <img
            className="productPhoto"
            src={advert.image}
            onError={onImageError}
            alt="imagen del producto en venta"></img>
        </div>
        <br />
        <div className="product_Info">
          <p className="advert_label">Description: </p>
          <span className="description"> {advert.description}</span>
          <br />
          <br />
          <p>
            Is
            {advert.onSale ? (
              <span id="isSale"> for sale </span>
            ) : (
              <span id="isSale"> purchased </span>
            )}
            this product by:
          </p>
          <div className="price">
            <p>
              {advert.price} <span id="price_coin"> €</span>
            </p>
          </div>
          <div className="advert_label">
            <p>
              Category:{" "}
              <span className="advert_text">
                {advert.category === undefined
                  ? ""
                  : advert.category.join(", ").toLocaleUpperCase()}
              </span>
            </p>
          </div>
        </div>
        <div>
          <p className="advert_label">
            Username: <span className="advert-text">{advert.username}</span>
          </p>
          <small className="advert_label">
            Created at:{" "}
            <span className="advert_text">{`${advDate.toUTCString()}`}</span>
          </small>
        </div>
      </div>
    </>
  );
}

export default Advert;
