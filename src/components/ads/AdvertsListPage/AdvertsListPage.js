import AdsList from '../AdsList/AdsList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { advertsList, getFavorite } from '../../../store/slices/ads';
import { getAdverts, getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';
import storage from '../../../utils/storage';
import { userNotification } from '../../../store/slices/user';

const AdvertsListPage = () => {
  const { error } = useSelector(getUi);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(advertsList()).catch(error => console.log(error));
  }, [dispatch]);

  const accessToken = storage.get('auth');
  // load only if there is token
  useEffect(() => {
    if (accessToken) {
      dispatch(getFavorite()).catch(error => console.log(error));
    }
  }, [dispatch, accessToken]);

  useEffect(() => {
    if (accessToken) {
      const loadNotifications = () => {
        dispatch(userNotification()).catch(error => console.log(error));
      };

      loadNotifications();
    }
  }, [dispatch, accessToken]);

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  return (
    <div>
      <AdsList selector={getAdverts} />
      {error && (
        <ErrorModal
          title="Error"
          message={error.message}
          onCancel={handleErrorClick}
        />
      )}
    </div>
  );
};

export default AdvertsListPage;
