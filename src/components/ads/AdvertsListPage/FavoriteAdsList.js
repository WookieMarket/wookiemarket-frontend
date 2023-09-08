import AdsList from '../AdsList/AdsList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFavoriteAds } from '../../../store/selectors';
import { getFavorite } from '../../../store/slices/ads';

const FavoriteAdsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavorite()).catch(error => console.log(error));
  }, [dispatch]);

  return <AdsList selector={getFavoriteAds} />;
};

export default FavoriteAdsList;
