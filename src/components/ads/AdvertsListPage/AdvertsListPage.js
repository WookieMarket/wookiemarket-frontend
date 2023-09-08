import AdsList from '../AdsList/AdsList';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { advertsList } from '../../../store/slices/ads';
import { getAdverts } from '../../../store/selectors';

const AdvertsListPage = () => {
  const dispatch = useDispatch();
  let skip;
  const limit = 10;

  useEffect(() => {
    const skip = 0;
    dispatch(advertsList({ skip, limit, sort: 'desc' })).catch(error =>
      console.log(error),
    );
  }, [dispatch]);

  return <AdsList selector={getAdverts} />;
};

export default AdvertsListPage;
