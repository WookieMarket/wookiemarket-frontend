import React from 'react';
import '../../css/advert.css';
import Advert from './Advert';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getAdvertById } from '../../store/selectors';

const AdvertPage = ({ onImageError }) => {
  const { advertId } = useParams();
  /*const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const advertId = searchParams.get('_id');*/

  console.log('Advert ID:', advertId);

  const advert = useSelector((state) => getAdvertById(state, advertId));

  console.log('Esto debería ser el anuncio:', advert);
 

  const navigate = useNavigate();
  //navigate.replace(`/adverts/${advert.name}`);

  if (advert) {
    navigate(`/adverts/${advert._id}`);
  } else {
    console.error('No se encontró un anuncio con el ID especificado');
  }

  return (
    <>
      <Advert advert={advert} onImageError={onImageError} />
      <div>
        <small>Created at: ¡AÑADIR CAMPO FECHA CREACIÓN ANUNCIO!</small>
      </div>
    </>
  );
};

export default AdvertPage;
