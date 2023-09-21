import AdsList from '../AdsList/AdsList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUi, userAds } from '../../../store/selectors';
import { getUserAds } from '../../../store/slices/user';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';

const UserAdsListPage = () => {
  const { error } = useSelector(getUi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserAds()).catch(error => console.log(error));
  }, [dispatch]);

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  return (
    <div>
      <AdsList selector={userAds} />
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
