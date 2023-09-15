import AdsList from '../AdsList/AdsList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUi, getUserAds } from '../../../store/selectors';
import { getAdsByUser } from '../../../store/slices/ads';
import { useParams } from 'react-router-dom';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';

const UserAdsListPage = () => {
  const { error } = useSelector(getUi);
  const { username } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(username);
    dispatch(getAdsByUser(username)).catch(error => console.log(error));
  }, [username, dispatch]);

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  return (
    <div>
      <AdsList selector={getUserAds} />
      {error && (
        <ErrorModal
          buttonErrorId="errorUserAds"
          title="Error"
          message={error.message}
          onCancel={handleErrorClick}
        />
      )}
    </div>
  );
};

export default UserAdsListPage;
