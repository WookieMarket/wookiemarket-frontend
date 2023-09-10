import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from '../Advert/Advert';
import Pagination from '../../shared/pagination/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdsPerPage,
  getUi,
  selectTotalCountAds,
  getAllCategory,
} from '../../../store/selectors';
import './AdsList.css';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';
import { categoriesList } from '../../../store/slices/categories';
import { setAdsPerPage } from '../../../store/slices/ads';

const getUniqueCategories = categories => {
  //Removing blank spaces before and after commas
  const trimmedCategories = categories.map(category =>
    category.replace(/\s*,\s*/g, ','),
  );
  // Divide each item into subcategories and flatten the array
  const splitCategories = trimmedCategories.flatMap(category =>
    category.split(','),
  );

  //Convert the first letter of all values to capital letters
  const capitalizedCategories = splitCategories.map(
    category => category.charAt(0).toUpperCase() + category.slice(1),
  );
  //Remove duplicate values and convert to array
  const uniqueCategories = Array.from(new Set(capitalizedCategories));
  console.log('categories: ' + uniqueCategories);

  return uniqueCategories;
};

const AdsList = ({ selector }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const [filterName, setFilterName] = useState('');
  const ads = useSelector(selector);
  const { isLoading } = useSelector(getUi);
  const originalCategories = useSelector(getAllCategory);
  const categories = useSelector(getAllCategory);
  const adsPerPage = useSelector(getAdsPerPage);
  const uniqueCategories = getUniqueCategories(categories);
  const totalCountAds = useSelector(selectTotalCountAds);

  const [noResults, setNoResult] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [queryPrice, setqueryPrice] = useState('');
  const [queryMinPrice, setQueryMinPrice] = useState('');
  const [queryMaxPrice, setQueryMaxPrice] = useState('');

  //let filteredAds = [];
  let filteredAds = ads;

  //const advertsPerPage = process.env.REACT_APP_ADS_PER_PAGE;
  //console.log('anuncios', process.env.REACT_APP_ADS_PER_PAGE);

  //ads list
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  //Categories list
  useEffect(() => {
    dispatch(categoriesList()).catch(error => console.log(error));
    console.log('categories: ' + categories);
  }, [dispatch]);

  //Filter by category NOT WORKING
  const handleCategoryChange = event => {
    const options = event.target.options;

    let selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value.toLowerCase());
      }
    }
    setSelectedCategories(selectedOptions);
  };

  const filterByCategory = ad => {
    if (selectedCategories.length === 0) {
      return true;
    }

    const lowerCaseCategories = selectedCategories.map(category =>
      category.trim().toLowerCase(),
    );

    return ad.category.some(adCategory =>
      lowerCaseCategories.includes(adCategory.trim().toLowerCase()),
    );
  };

  const handleFilterChange = event => {
    const value = event.target.value;
    setFilterName(value);
    setCurrentPage(1);
  };

  const handleChangePrice = event => {
    setqueryPrice(event.target.value);
    setNoResult(true);
  };

  const filterByPrice = ad =>
    queryPrice === '' || ad.price === Number(queryPrice);

  const handleChangeMinPrice = event => {
    setQueryMinPrice(event.target.value);
    setNoResult(true);
  };

  const handleChangeMaxPrice = event => {
    setQueryMaxPrice(event.target.value);
    setNoResult(true);
  };

  const filterByMinMaxPrice = ad => {
    if (!queryMinPrice && !queryMaxPrice) return true;

    const minPrice = parseInt(queryMinPrice) || 0;
    const maxPrice = parseInt(queryMaxPrice) || Infinity;

    return ad.price >= minPrice && ad.price <= maxPrice;
  };

  const filterAdName = ad =>
    (ad.name ?? '').toUpperCase().includes(filterName.toUpperCase());
  console.log('ads.length: ' + ads.length);
  if (ads.length > 0) {
    filteredAds = ads
      .filter(filterAdName)
      .filter(filterByCategory)
      .filter(filterByPrice)
      .filter(filterByMinMaxPrice);
  }

  const totalPages =
    Array.isArray(filteredAds) && filteredAds.length > 0
      ? Math.ceil(filteredAds.length / adsPerPage)
      : 1;

  const startIndex = (currentPage - 1) * adsPerPage;
  const endIndex = startIndex + adsPerPage;
  const isLastPage = currentPage === totalPages;

  const advertsToDisplay = filteredAds;
  /*filteredAds.length > 0
      ? filteredAds.slice(startIndex, endIndex)
      : ads.slice(startIndex, endIndex);*/
  console.log('advertsToDisplay: ' + advertsToDisplay);

  //Cleaning & making friendly URL
  const cleanUpForURL = text => {
    return text
      .toLowerCase()
      .replace(/ /g, '-') // Replace spaces with hyphens
      .replace(/[^\w-]/g, ''); // Remove special characters
  };

  //PAGINATION
  const handleAdsPerPageChange = event => {
    dispatch(setAdsPerPage(event.target.value));
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
          <section id="advertsPerPage">
            <label className="advert_label">{t('Adverts per page')}: </label>
            <select value={adsPerPage} onChange={handleAdsPerPageChange}>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </section>
          <section id="filters">
            <section id="filterByName">
              <label className="advert_label">{t('Name')}: </label>
              <input type="text" onChange={handleFilterChange} />
            </section>
            <section id="filterByCategory">
              <label className="advert_label">{t('Category')}:</label>
              <select
                id="categorySelect"
                multiple
                onChange={handleCategoryChange}
              >
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <p>
                {t('Hold down the ctrl key to select more than one category')}.
              </p>
            </section>
            <section id="filterByPrice">
              <label className="advert_label">{t('Price')}:</label>
              <input
                type="number"
                id="priceInput"
                placeholder={t('Enter the exact price')}
                value={queryPrice}
                onChange={handleChangePrice}
              />
              <label className="form-label">Precio Mínimo:</label>
              <input
                className="form-input"
                type="number"
                placeholder={t('Enter minimum price')}
                value={queryMinPrice}
                onChange={handleChangeMinPrice}
              />
              <label className="form-label">{t('Maximum price')}:</label>
              <input
                className="form-input"
                type="number"
                placeholder={t('Enter maximum price')}
                value={queryMaxPrice}
                onChange={handleChangeMaxPrice}
              />
            </section>
          </section>
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
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />

                  {/*<div className="pagination">
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
                    </div>*/}
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
