import { useEffect, useState } from 'react';

import Pagination from '../../shared/Pagination/Pagination';
// import Pagination from '../../shared/pagination/Pagination';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdsPerPage,
  getAllCategory,
  getUi,
  selectTotalCountAds,
} from '../../../store/selectors';
import { getAdsWithFilters, setAdsPerPage } from '../../../store/slices/ads';
import { categoriesList } from '../../../store/slices/categories';
import Layout from '../../layout/Layout';
import Button from '../../shared/Button';
import Spinner from '../../shared/spinner/Spinner';
import AdvertReduced from '../Advert/AdvertReduced';
import EmptyList from '../EmptyList/EmptyList';
import './AdsList.css';
import storage from '../../../utils/storage';
import { userNotification } from '../../../store/slices/user';

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
  const categories = useSelector(getAllCategory);
  const uniqueCategories = getUniqueCategories(categories);
  const totalCountAds = useSelector(selectTotalCountAds);
  const accessToken = storage.get('auth');

  // const [result, setNoResult] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState([]);
  // const [queryPrice, setqueryPrice] = useState('');
  const [queryMinPrice, setQueryMinPrice] = useState('');
  const [queryMaxPrice, setQueryMaxPrice] = useState('');

  let filteredAds = ads;

  //ads list
  const handlePageChange = page => {
    setCurrentPage(page);
  };

  // notifications
  useEffect(() => {
    if (accessToken) {
      const loadNotifications = () => {
        dispatch(userNotification()).catch(error => console.log(error));
      };

      loadNotifications();
    }
  }, [dispatch, accessToken]);

  //Categories list
  useEffect(() => {
    dispatch(categoriesList()).catch(error => console.log(error));
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

  const filterByPrice = ad => true;
  // queryPrice === '' || ad.price === Number(queryPrice);

  const handleChangeMinPrice = event => {
    setQueryMinPrice(event.target.value);
  };

  const handleChangeMaxPrice = event => {
    setQueryMaxPrice(event.target.value);
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

  const applyFilter = () => {
    const filters = {
      name: filterName,
      category: selectedCategories.join(','),
      // price: queryPrice,
      minPrice: queryMinPrice,
      maxPrice: queryMaxPrice,
    };

    dispatch(getAdsWithFilters(filters));
  };

  //PAGINATION
  const advertsPerPage = useSelector(getAdsPerPage);
  const totalPages =
    Array.isArray(filteredAds) && filteredAds.length > 0
      ? Math.ceil(filteredAds.length / advertsPerPage)
      : 1;
  console.log('Número total de páginas:', totalPages);
  const startIndex = (currentPage - 1) * advertsPerPage;
  const endIndex = startIndex + advertsPerPage;
  const advertsToDisplay = filteredAds.slice(startIndex, endIndex);
  console.log('Índices de inicio y fin:', startIndex, endIndex);

  const handleAdsPerPageChange = event => {
    const selectedValue = parseInt(event.target.value); // Parse the selected value to an integer
    dispatch(setAdsPerPage(selectedValue)); // Dispatch an action to update the state
  };

  return (
    <Layout>
      <>
        <section className="searchSection">
          <div className="containerTittle">
            <h1>{t('ADVERTISEMENTS AVIABLE')}</h1>
          </div>
          <section id="filters">
            <section id="filterByName">
              <input
                type="text"
                onChange={handleFilterChange}
                placeholder={t('Searching area')}
                className="filter"
              />
            </section>
            <div className="group-filters">
              <section id="filterByCategory">
                <div className="element-form">
                  <label className="advert_label">{t('Category')}</label>
                  <select
                    id="categorySelect"
                    multiple
                    onChange={handleCategoryChange}
                    className="select-form-categories-filter"
                  >
                    {uniqueCategories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </section>
              <section id="filterByPrice">
                {/* <label className="advert_label">{t('Price')}:</label>
              <input
                type="number"
                id="priceInput"
                placeholder={t('Enter the exact price')}
                value={queryPrice}
                onChange={handleChangePrice}
              /> */}
                <div className="element-form">
                  <label className="form-label">{t('Price')}</label>
                  <div className="input-prices">
                    <input
                      className="form-input"
                      type="number"
                      placeholder={t('Enter minimum price')}
                      value={queryMinPrice}
                      onChange={handleChangeMinPrice}
                    />
                    <label className="form-label">-</label>
                    <input
                      className="form-input"
                      type="number"
                      placeholder={t('Enter maximum price')}
                      value={queryMaxPrice}
                      onChange={handleChangeMaxPrice}
                    />
                  </div>
                </div>
              </section>
              <div className="button-filter">
                <Button
                  className=""
                  variant="accept"
                  onClick={applyFilter}
                  disabled={totalCountAds === 0}
                >
                  {t('Filter')}
                </Button>
              </div>
            </div>
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
                    <div className="container-ad">
                      {advertsToDisplay
                        .sort((a, b) => a.createdAt > b.createdAt)
                        .map(advert => (
                          <div key={advert._id}>
                            <div className="advert-container">
                              <AdvertReduced {...advert} />
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
                </>
              ) : (
                <EmptyList />
              )}
            </div>
          )}
          <section id="advertsPerPage">
            <label className="advert_label">{t('Adverts per page')}: </label>
            <select value={advertsPerPage} onChange={handleAdsPerPageChange}>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </section>
        </div>
      </>
    </Layout>
  );
};

export default AdsList;
