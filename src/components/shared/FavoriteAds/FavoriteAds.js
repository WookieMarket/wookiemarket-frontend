import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, deleteFavorites } from '../../../store/slices/ads';
import { isFavorite } from '../../../store/selectors';

//import { useParams } from 'react-router-dom';

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

  // useEffect(() => {
  //   dispatch(getFavorite()).catch(error => console.log(error));
  // }, [dispatch]);

  // const toggleFavorite = () => {
  //   if (isFavorite === true) {
  //     // Si ya es favorito, quitar de favoritos
  //     dispatch(deleteFavorites(id)); // Asegúrate de tener una acción para eliminar de favoritos
  //   } else {
  //     // Si no es favorito, agregar a favoritos
  //     dispatch(addFavorite(id));
  //   }
  // };

  return (
    <button onClick={toggleFavorite}>
      {isAdFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
    </button>
    // <div>
    //   {isFavorite === false ? (
    //     <button onClick={handleIncludeFavorites}>boton</button>
    //   ) : (
    //     <button onClick={handleDeleteFavorites}>boton</button>
    //   )}
    // </div>
  );
}

export default FavoriteAds;
