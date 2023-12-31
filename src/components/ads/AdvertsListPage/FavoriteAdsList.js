import AdsList from '../AdsList/AdsList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getFavoriteAds, getUi } from '../../../store/selectors';
import { getFavorite } from '../../../store/slices/ads';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';

const FavoriteAdsList = () => {
  const { error } = useSelector(getUi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFavorite()).catch(error => console.log(error));
  }, [dispatch]);

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  return (
    <div>
      <AdsList selector={getFavoriteAds} />;
      {error && (
        <ErrorModal
          buttonErrorId="errorFavoriteAds"
          title="Error"
          message={error.message}
          onCancel={handleErrorClick}
        />
      )}
    </div>
  );
};

export default FavoriteAdsList;
