import AdsList from '../AdsList/AdsList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserAds } from '../../../store/selectors';
import { getAdsByUser } from '../../../store/slices/ads';
import { useParams } from 'react-router-dom';

const UserAdsListPage = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(username);
    dispatch(getAdsByUser(username)).catch(error => console.log(error));
  }, [username, dispatch]);

  return <AdsList selector={getUserAds} />;
};

export default UserAdsListPage;
