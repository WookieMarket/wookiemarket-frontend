import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from '../AdvertPage/Advert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdsPerPage, getAdverts, getUi } from '../../../store/selectors';
import { advertsList, setAdsPerPage } from '../../../store/slices/ads';
import './advertListPage.css';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';

const AdvertsListPage = () => {
  const { t } = useTranslation();
  const adsPerPage = useSelector(getAdsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const ads = useSelector(getAdverts);
  const { isLoading } = useSelector(getUi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(advertsList()).catch((error) => console.log(error));
  }, [dispatch]);

  const handleAdsPerPageChange = (event) => {
    dispatch(setAdsPerPage(event.target.value));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const filterByName = (ad) =>
    (ad.name ?? '').toUpperCase().includes(filterName.toUpperCase());

  //NOTE añadir resto de campos de filtrado

  const filteredAds = ads
    //.filter(filterAdSaleValueOrDefault)
    .filter(filterByName);
  //.filter(filterAdPrice)
  //.filter(filterAdTags);
  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const startIndex = (currentPage - 1) * adsPerPage;
  const endIndex = startIndex + adsPerPage;
  const advertsToDisplay = filteredAds.slice(startIndex, endIndex);
  const isLastPage = currentPage === totalPages;

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterName(value);
    //NOTE Resetear la página al cambiar el filtro
    setCurrentPage(1);
  };

  return (
    <Layout title='adverts'>
      <>
        <section className='searchSection'>
          <h1>{t('Searching area')}</h1>
          <label className='advert_label'>{t('Adverts per page')}: </label>
          <select value={adsPerPage} onChange={handleAdsPerPageChange}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <label className='advert_label'>{t('Name')}: </label>
          <input type='text' onChange={handleFilterChange} />
        </section>
        <div className='container'>
          {isLoading ? (
            <Spinner message={t('charging...')} />
          ) : (
            <div>
              {!!ads.length ? (
                <>
                  <div className='listContainer'>
                    <div className='contaienrTittle'>
                      <h1>ADVERTISEMENTS AVIABLE</h1>
                    </div>
                    <ul>
                      {advertsToDisplay
                        .sort((a, b) => {
                          const aDate = new Date(a.createdAt);
                          const bDate = new Date(b.createdAt);
                          if (
                            isNaN(aDate.getTime()) ||
                            isNaN(bDate.getTime())
                          ) {
                            return isNaN(aDate.getTime()) ? 1 : -1;
                          }
                          return bDate - aDate;
                        })
                        /*.sort((a, b) => a.createdAt > b.createdAt)*/
                        .map((advert) => (
                          <li key={advert._id}>
                            <div className='advert-container'>
                              <Link to={`/adverts/${advert._id}`}>
                                <Advert {...advert} />
                              </Link>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className='pagination'>
                    <p>
                      <span
                        className={currentPage === 1 ? 'disabled' : 'page'}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &lt;{' '}
                      </span>
                      {[...Array(totalPages)].map((_, index) => {
                        if (
                          totalPages > 5 &&
                          index > 1 &&
                          index < totalPages - 2
                        ) {
                          return (
                            <span className='page' key={`ellipsis-${index}`}>
                              ...
                            </span>
                          );
                        } else {
                          return (
                            <span
                              className={
                                currentPage === index + 1 ? 'disabled' : 'page'
                              }
                              key={index}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                              {index < totalPages - 1 && <span> - </span>}
                            </span>
                          );
                        }
                      })}
                      <span
                        className={isLastPage ? 'disabled' : 'page'}
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        {' '}
                        &gt;
                      </span>
                    </p>
                  </div>
                </>
              ) : (
                <EmptyList />
              )}
            </div>
          )}
        </div>
      </>
    </Layout>
  );
};

export default AdvertsListPage;
