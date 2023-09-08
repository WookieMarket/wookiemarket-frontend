import { useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from '../Advert/Advert';
import { useDispatch, useSelector } from 'react-redux';
import { getAdsPerPage, getAdverts, getUi } from '../../../store/selectors';
import './AdsList.css';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';
import Pagination from '../../shared/pagination/Pagination';
import Button from '../../shared/Button';
import { advertsList, setAdsPerPage } from '../../../store/slices/ads';


const AdsList = ({ selector }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const ads = useSelector(getAdverts);
  const { isLoading } = useSelector(getUi);
  const advertsPerPage = useSelector(getAdsPerPage);
  const dispatch = useDispatch();
  const skip = ads.length;
  const limit = 10;

  //const advertsPerPage = process.env.REACT_APP_ADS_PER_PAGE;
  //console.log('anuncios', process.env.REACT_APP_ADS_PER_PAGE);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const filterAdName = ad =>
    (ad.name ?? '').toUpperCase().includes(filterName.toUpperCase());
  //NOTE añadir resto de campos de filtrado

  const filteredAds = ads
    //.filter(filterAdSaleValueOrDefault)
    .filter(filterAdName)
    //.filter(filterAdPrice)
    //.filter(filterAdTags);
    .sort((a, b) => {
      const aDate = new Date(a.createdAt);
      const bDate = new Date(b.createdAt);
      if (isNaN(aDate.getTime()) || isNaN(bDate.getTime())) {
        return isNaN(aDate.getTime()) ? 1 : -1;
      }
      return bDate - aDate;
    });

  //PAGINATION
  //  const advertsPerPage = useSelector(getAdsPerPage);
  const totalPages = Math.ceil(filteredAds.length / advertsPerPage);
  const startIndex = (currentPage - 1) * advertsPerPage;
  const endIndex = startIndex + advertsPerPage;
  const advertsToDisplay = filteredAds.slice(startIndex, endIndex);

  const handleChangeAdsPerPage = event => {
    const newAdsPerPage = parseInt(event.target.value);
    dispatch(setAdsPerPage(newAdsPerPage));
    setCurrentPage(1);
  };

  const handleFilterChange = event => {
    const value = event.target.value;
    setFilterName(value);
    //NOTE Resetear la página al cambiar el filtro
    setCurrentPage(1);
  };

  //Cleaning & making friendly URL
  const cleanUpForURL = text => {
    return text
      .toLowerCase()
      .replace(/ /g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]/g, ''); // Remove special characters
  };
  // Generates the URL using the _id of the advert and the name field
  const generateAdvertURL = advert => {
    const cleanName = cleanUpForURL(advert.name);
    return `/adverts/${advert._id}/${cleanName}`;
  };

  const handleLoadMore = async () => {
    try {
      
      await dispatch(advertsList({ skip, limit, sort: 'desc' }));
      console.log('Debería haber hecho la llamada');
      setCurrentPage(prevPage => prevPage + 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <>
        <section className="searchSection">
          <h1>{t('Searching area')}</h1>
          <label className="advert_label">{t('Name')}: </label>
          <input type="text" onChange={handleFilterChange} />
        </section>
        <section id="advertsPerPage">
          <label className="advert_label">{t('Adverts per page')}: </label>
          <select value={advertsPerPage} onChange={handleChangeAdsPerPage}>
            <option value={2}>2</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </section>

        <div className="container">
          {isLoading ? (
            <Spinner message={t('LOADING...')} />
          ) : (
            <div>
              {!!ads.length ? (
                <>
                  <div className="listContainer">
                    <div className="containerTittle">
                      <h1>{t('ADVERTISEMENTS AVIABLE')}</h1>
                    </div>
                    <div className="container-ad">
                      {advertsToDisplay
                        .sort((a, b) => a.createdAt > b.createdAt)
                        .map(advert => (
                          <div key={advert._id}>
                            <div className="advert-container">
                              <Link to={generateAdvertURL(advert)}>
                                <Advert {...advert} />
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  {currentPage === totalPages && (
                    <Button onClick={handleLoadMore}>{t('more ads')}</Button>
                  )}
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
      </>
    </Layout>
  );
};

export default AdsList;

/*import { useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from '../Advert/Advert';
import { useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import './AdsList.css';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';
import Pagination from '../../shared/pagination/Pagination';
import Button from '../../shared/Button';

const AdsList = ({ selector }) => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const ads = useSelector(selector);
  const { isLoading } = useSelector(getUi);
  let skip;
  const limit = 10;

  //const advertsPerPage = process.env.REACT_APP_ADS_PER_PAGE;
  //console.log('anuncios', process.env.REACT_APP_ADS_PER_PAGE);

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

  //Cleaning & making friendly URL
  const cleanUpForURL = text => {
    return text
      .toLowerCase()
      .replace(/ /g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]/g, ''); // Remove special characters
  };
  // Generates the URL using the _id of the advert and the name field
  const generateAdvertURL = advert => {
    const cleanName = cleanUpForURL(advert.name);
    return `/adverts/${advert._id}/${cleanName}`;
  };
  return (
    <Layout>
      <>
        <section className="searchSection">
          <h1>{t('Searching area')}</h1>
          <label className="advert_label">{t('Name')}: </label>
          <input type="text" onChange={handleFilterChange} />
        </section>
        <div className="container">
          {isLoading ? (
            <Spinner message={t('LOADING...')} />
          ) : (
            <div>
              {!!ads.length ? (
                <>
                  <div className="listContainer">
                    <div className="containerTittle">
                      <h1>{t('ADVERTISEMENTS AVIABLE')}</h1>
                    </div>
                    <div className="container-ad">
                      {advertsToDisplay
                        .sort((a, b) => a.createdAt > b.createdAt)
                        .map(advert => (
                          <div key={advert._id}>
                            <div className="advert-container">
                              <Link to={generateAdvertURL(advert)}>
                                <Advert {...advert} />
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
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

export default AdsList;*/
