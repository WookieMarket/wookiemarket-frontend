import AdsList from '../AdsList/AdsList';
import { useDispatch } from 'react-redux';
import { getAdsPerPage, useEffect } from 'react';
import { advertsList, setAdsPerPage } from '../../../store/slices/ads';
import { getAdverts } from '../../../store/selectors';
import Pagination from '../../shared/pagination/Pagination';
import Button from '../../shared/Button';

const AdvertsListPage = () => {
  const dispatch = useDispatch();
  let skip;
  const limit = 10;

  //const advertsPerPage = process.env.REACT_APP_ADS_PER_PAGE;
  //console.log('anuncios', process.env.REACT_APP_ADS_PER_PAGE);

  useEffect(() => {
    const skip = 0;
    dispatch(advertsList({ skip, limit, sort: 'desc' })).catch(error =>
      console.log(error),
    );
  }, [dispatch, currentPage, advertsPerPage]);

  return <AdsList selector={getAdverts} />;
};

export default AdvertsListPage;
