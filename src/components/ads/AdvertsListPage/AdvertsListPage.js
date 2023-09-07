import AdsList from '../AdsList/AdsList';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { advertsList } from '../../../store/slices/ads';
import { getAdverts, getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';

const AdvertsListPage = () => {
  const { error } = useSelector(getUi);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(advertsList()).catch(error => console.log(error));
  }, [dispatch]);

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  return (
    <div>
      <AdsList selector={getAdverts} />
      {error && (
        <ErrorModal
          title="Error"
          message={error.data.error}
          onCancel={handleErrorClick}
        />
      )}
    </div>
  );
};

export default AdvertsListPage;
