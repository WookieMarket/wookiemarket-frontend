import React from 'react';
import { useDispatch } from 'react-redux';

import { addFavorite } from '../../../store/slices/user';

//import { useParams } from 'react-router-dom';

function FavoriteAds({ id }) {
  //const { id } = useParams();

  const dispatch = useDispatch();

  const handleIncludeFavorites = () => {
    dispatch(addFavorite(id));
  };

  return (
    <div>
      <button onClick={handleIncludeFavorites}>añadir</button>
    </div>
  );
}

export default FavoriteAds;
