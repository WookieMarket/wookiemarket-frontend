import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Advert from '../Advert/Advert';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAds, getUi } from '../../../store/selectors';
import { getAdsByUser } from '../../../store/slices/ads';
import './advertListPage.css';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';

const UserAdsListPage = () => {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const ads = useSelector(getUserAds);
  const { isLoading } = useSelector(getUi);
  const { username } = useParams();
  const dispatch = useDispatch();
  const advertsPerPage = process.env.REACT_APP_ADS_PER_PAGE;

  useEffect(() => {
    dispatch(getAdsByUser(username)).catch(error => console.log(error));
  }, [username, dispatch]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const filterAdName = ad =>
    (ad.name ?? '').toUpperCase().startsWith(filterName.toUpperCase());

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

  // Cleaning & making friendly URL
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

export default UserAdsListPage;