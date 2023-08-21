import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from '../AdvertPage/Advert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdverts, getUi } from '../../../store/selectors';
import { advertsList } from '../../../store/slices/ads';
import './advertListPage.css';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';

const advertsPerPage = 2;

const AdvertsListPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const ads = useSelector(getAdverts);
  const { isLoading } = useSelector(getUi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(advertsList()).catch(error => console.log(error));
  }, [dispatch]);

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
  const totalPages = Math.ceil(filteredAds.length / advertsPerPage);
  const startIndex = (currentPage - 1) * advertsPerPage;
  const endIndex = startIndex + advertsPerPage;
  const advertsToDisplay = filteredAds.slice(startIndex, endIndex);
  const isLastPage = currentPage === totalPages;

  const handleFilterChange = event => {
    const value = event.target.value;
    setFilterName(value);
    //NOTE Resetear la página al cambiar el filtro
    setCurrentPage(1);
  };

  return (
    <Layout title="anuncios">
      <>
        <section className="searchSection">
          <h1>Searching area</h1>
          <label className="advert_label">Name: </label>
          <input type="text" onChange={handleFilterChange} />
        </section>
        <div className="container">
          {isLoading ? (
            <Spinner message={t('charging...')} />
          ) : (
            <div>
              {!!ads.length ? (
                <>
                  <div className="listContainer">
                    <div className="contaienrTittle">
                      <h1>ADVERTISEMENTS AVIABLE</h1>
                    </div>
                    <ul>
                      {advertsToDisplay
                        .sort((a, b) => a.createdAt > b.createdAt)
                        .map(advert => (
                          <li key={advert._id}>
                            <div className="advert-container">
                              <Link to={`/adverts/${advert._id}`}>
                                <Advert {...advert} />
                              </Link>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="pagination">
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
                            <span className="page" key={`ellipsis-${index}`}>
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
