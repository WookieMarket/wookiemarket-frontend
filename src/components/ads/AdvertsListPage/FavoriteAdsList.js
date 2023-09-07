import AdsList from '../AdsList/AdsList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getFavoriteAds } from '../../../store/selectors';
import { FavoriteAds } from '../../../store/slices/ads';

const FavoriteAdsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FavoriteAds()).catch(error => console.log(error));
  }, [dispatch]);

  return <AdsList selector={getFavoriteAds} />;
};

export default FavoriteAdsList;
