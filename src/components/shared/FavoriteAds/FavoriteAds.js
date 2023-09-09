import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorites } from '../../../store/slices/ads';
import { isFavorite } from '../../../store/selectors';
import { FaRegStar } from 'react-icons/fa';
import './FavoriteAds.css';
import estrella from '../../../assets/CSS-Images/estrella.png';

function FavoriteAds({ id }) {
  // Usa el selector isFavorite para obtener el estado de favoritos
  const isAdFavorite = useSelector(isFavorite(id));
  const dispatch = useDispatch();

  const toggleFavorite = () => {
    if (isAdFavorite) {
      dispatch(deleteFavorites(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  //const buttonClass = isAdFavorite ? 'favorite-button' : 'not-favorite-button';

  return (
    <button onClick={toggleFavorite}>
      {isAdFavorite ? (
        <img className="favorite-button" src={estrella} alt="estrella" />
      ) : (
        <FaRegStar className="not-favorite-button" />
      )}
    </button>
  );
}

export default FavoriteAds;
