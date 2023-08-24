import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from '../AdvertPage/Advert';
import { useDispatch, useSelector } from 'react-redux';
import {
  getAdsPerPage,
  getAdverts,
  getCategoriesList,
  getUi,
  selectTotalCountAds,
} from '../../../store/selectors';
import { advertsList, setAdsPerPage } from '../../../store/slices/ads';
import './advertListPage.css';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import EmptyList from '../EmptyList/EmptyList';
import { categoriesList } from '../../../store/slices/adsCategories';

const getUniqueCategories = (categories) => {
  //Removing blank spaces before and after commas
  const trimmedCategories = categories.map((category) =>
    category.replace(/\s*,\s*/g, ',')
  );
  // Divide each item into subcategories and flatten the array
  const splitCategories = trimmedCategories.flatMap((category) =>
    category.split(',')
  );

  //Convert the first letter of all values to capital letters
  const capitalizedCategories = splitCategories.map(
    (category) => category.charAt(0).toUpperCase() + category.slice(1)
  );
  //Remove duplicate values and convert to array
  const uniqueCategories = Array.from(new Set(capitalizedCategories));

  return uniqueCategories;
};

const AdvertsListPage = () => {
  const { t } = useTranslation();
  const ads = useSelector(getAdverts);
  const categories = useSelector(getCategoriesList);
  const adsPerPage = useSelector(getAdsPerPage);
  const uniqueCategories = getUniqueCategories(categories);
  const totalCountAds = useSelector(selectTotalCountAds);
  const { isLoading } = useSelector(getUi);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [noResults, setNoResult] = useState(true);
  const [filterName, setFilterName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [queryPrice, setqueryPrice] = useState('');
  const [queryMinPrice, setQueryMinPrice] = useState('');
  const [queryMaxPrice, setQueryMaxPrice] = useState('');

  //Ads list
  useEffect(() => {
    dispatch(advertsList()).catch((error) => console.log(error));
  }, [dispatch]);

  //Categories list
  useEffect(() => {
    dispatch(categoriesList()).catch((error) => console.log(error));
  }, [dispatch]);

  //PAGINATION
  const handleAdsPerPageChange = (event) => {
    dispatch(setAdsPerPage(event.target.value));
  };

  /*const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      dispatch(advertsList({ page: newPage })); // Call API for neew ads
    }
  };*/
  
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  //Filter by category NOT WORKING
  const handleCategoryChange = (event) => {
    const options = event.target.options;

    let selectedOptions = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedOptions.push(options[i].value);
      }
    }
    setSelectedCategories(selectedOptions);
  };

  const filterByCategory = (ad) =>
    selectedCategories.length === 0 ||
    ad.category.some((adCategory) =>
      selectedCategories.includes(adCategory.trim())
    );

  //Filter by price
  const handleChangePrice = (event) => {
    setqueryPrice(event.target.value);
    setNoResult(true);
  };

  const filterByPrice = (ad) =>
    queryPrice === '' || ad.price === Number(queryPrice);

  const handleChangeMinPrice = (event) => {
    setQueryMinPrice(event.target.value);
    setNoResult(true);
  };

  const handleChangeMaxPrice = (event) => {
    setQueryMaxPrice(event.target.value);
    setNoResult(true);
  };

  const filterByMinMaxPrice = (ad) => {
    if (!queryMinPrice && !queryMaxPrice) return true;

    const minPrice = parseInt(queryMinPrice) || 0;
    const maxPrice = parseInt(queryMaxPrice) || Infinity;

    return ad.price >= minPrice && ad.price <= maxPrice;
  };

  //Filter by name
  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterName(value);
    //NOTE Resetear la página al cambiar el filtro
    setCurrentPage(1);
  };

  const filterByName = (ad) =>
    (ad.name ?? '').toUpperCase().includes(filterName.toUpperCase());
  /**/
  const filteredAds = ads
    .filter(filterByName)
    .filter(filterByCategory)
    .filter(filterByPrice)
    .filter(filterByMinMaxPrice);

  const totalPages = Math.ceil(filteredAds.length / adsPerPage);
  const startIndex = (currentPage - 1) * adsPerPage;
  const endIndex = startIndex + adsPerPage;
  const advertsToDisplay = filteredAds.slice(startIndex, endIndex);
  const isLastPage = currentPage === totalPages;

  useEffect(() => {
    if (
      filteredAds.length < adsPerPage && 
      filteredAds.length < totalCountAds && 
      currentPage < totalPages 
    ) { 
      dispatch(advertsList({ page: currentPage + 1 })); // call API for new ads
    }
  }, [filteredAds.length, currentPage, totalPages, adsPerPage, totalCountAds, dispatch]);

  return (
    <Layout title='adverts'>
      <>
        <section className='searchSection'>
          <h1>{t('Searching area')}</h1>
          <section id='advertsPerPage'>
            <label className='advert_label'>{t('Adverts per page')}: </label>
            <select value={adsPerPage} onChange={handleAdsPerPageChange}>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
            </select>
          </section>
          <section id='filters'>
            <section id='filterByName'>
              <label className='advert_label'>{t('Name')}: </label>
              <input type='text' onChange={handleFilterChange} />
            </section>
          </section>
          <section id='filterByCategory'>
            <label className='advert_label'>{t('Category')}:</label>
            <select
              id='categorySelect'
              multiple
              onChange={handleCategoryChange}
            >
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <p>
              {t('Hold down the ctrl key to select more than one category')}.
            </p>
          </section>
          <section id='filterByPrice'>
            <label className='advert_label'>{t('Price')}:</label>
            <input
              type='number'
              id='priceInput'
              placeholder={t('Enter the exact price')}
              value={queryPrice}
              onChange={handleChangePrice}
            />
            <label className='form-label'>Precio Mínimo:</label>
            <input
              className='form-input'
              type='number'
              placeholder={t('Enter minimum price')}
              value={queryMinPrice}
              onChange={handleChangeMinPrice}
            />
            <label className='form-label'>{t('Precio Máximo')}:</label>
            <input
              className='form-input'
              type='number'
              placeholder={t('Enter maximum price')}
              value={queryMaxPrice}
              onChange={handleChangeMaxPrice}
            />
          </section>
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
                      <h1>{t('ADVERTISEMENTS AVIABLE')}</h1>
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
                  {/*Pagination buttons*/}
                  <div className='pagination'>
                    <p>
                      <span
                        className={currentPage === 1 ? 'numberPage' : 'page'}
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        &lt;{' '}
                      </span>
                      {[...Array(totalPages)].map((_, index) => {
                        const isCurrentPage = currentPage === index + 1; // Actual page?
                        return (
                          <span
                            className={`${isCurrentPage ? 'currentPage ' : ''}${
                              currentPage === index + 1 ? 'numberPage ' : 'page'
                            }`}
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                          >
                            {index + 1}
                            {index < totalPages - 1 && <span> - </span>}
                          </span>
                        );
                      })}
                      <span
                        className={
                          currentPage === totalPages ? 'numberPage' : 'page'
                        }
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
