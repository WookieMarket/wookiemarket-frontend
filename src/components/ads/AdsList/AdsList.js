import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { advertsPerPage, getUi } from '../../../store/selectors';
import { setAdsPerPage } from '../../../store/slices/ads';
import Layout from '../../layout/Layout';
import Pagination from '../../shared/Pagination/Pagination';
import Spinner from '../../shared/spinner/Spinner';
import AdvertReduced from '../Advert/AdvertReduced';
import EmptyList from '../EmptyList/EmptyList';
import './AdsList.css';

const AdsList = ({ selector }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const ads = useSelector(selector);
  const { isLoading } = useSelector(getUi);
  const dispatch = useDispatch();
  const adsPerPage = useSelector(advertsPerPage);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const filterAdName = ad =>
    (ad.name ?? '').toUpperCase().startsWith(filterName.toUpperCase());
  //NOTE añadir resto de campos de filtrado

  const filteredAds = ads
    //.filter(filterAdSaleValueOrDefault)
    .filter(filterAdName);
  //.filter(filterAdPrice)
  //.filter(filterAdTags);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const skip = (currentPage - 1) * adsPerPage;
  const advertsToDisplay = filteredAds.slice(skip, skip + adsPerPage);

  const handleFilterChange = event => {
    const value = event.target.value;
    setFilterName(value);
    //NOTE Resetear la página al cambiar el filtro
    setCurrentPage(1);
  };

  const handleChangeAdsPerPage = event => {
    const page = event.target.value;
    const newAdsPerPage = parseInt(page);
    dispatch(setAdsPerPage(newAdsPerPage));
  };

  return (
    <Layout>
      <div className="containerTittle">
        <h1>{t('ADVERTISEMENTS AVIABLE')}</h1>
      </div>
      <section className="searchSection">
        {/* <h1>{t('Searching area')}</h1> */}
        {/* <label className="advert_label">{t('Name')}: </label> */}

        <input
          type="text"
          onChange={handleFilterChange}
          placeholder={t('Searching area')}
          className="filter"
        />
      </section>
      <div className="container">
        {isLoading ? (
          <Spinner message={t('LOADING...')} />
        ) : (
          <div>
            {!!ads.length ? (
              <>
                <div className="listContainer">
                  <div className="container-ad">
                    {advertsToDisplay
                      .sort((a, b) => a.createdAt > b.createdAt)
                      .map(advert => (
                        <div className="advert-container" key={advert._id}>
                          <AdvertReduced {...advert} />
                        </div>
                      ))}
                  </div>
                </div>
                {/* {currentPage === totalPages && (
                  <Button onClick={handleLoadMore}>{t('more ads')}</Button>
                )} */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            ) : (
              <EmptyList />
            )}
          </div>
        )}
      </div>
      <section id="advertsPerPage">
        <label className="advert_label">{t('Adverts per page')}: </label>
        <select value={adsPerPage} onChange={handleChangeAdsPerPage}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </section>
    </Layout>
  );
};

export default AdsList;
