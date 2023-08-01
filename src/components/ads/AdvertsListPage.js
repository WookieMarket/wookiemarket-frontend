import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from './Advert';
import { connect } from 'react-redux';
import { getAdverts, getUi, dataFiltered } from '../../store/selectors';
import { advertsList } from '../../store/slices/ads';
import '../../css/advertListPage.css';
import '../../css/advert.css';
import defaultImage from '../../assets/no_image.jpg';
import { filterByName } from '../../store/slices/adsFiltered';


const EmptyList = ({ dataFiltered }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p>Sorry, no adverts yet.</p>
    </div>
  );
};

const handleImageError = (event) => {
  event.target.src = defaultImage;
};

const advertsPerPage = 2;

const AdvertsListPage = ({ adverts, onAdvertsLoaded, isLoading }) => {
  //const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAdverts, setFilteredAdverts] = useState(adverts);

  useEffect(() => {
    onAdvertsLoaded();
  }, [onAdvertsLoaded]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(adverts.length / advertsPerPage);
  const startIndex = (currentPage - 1) * advertsPerPage;
  const endIndex = startIndex + advertsPerPage;
  const advertsToDisplay = adverts.slice(startIndex, endIndex);
  const isLastPage = currentPage === totalPages;

  const handleFilterChange = (event) => {
    //filterByName(event.target.value);
        const filteredData = filterByName({ name: event.target.value, adverts });
    setFilteredAdverts(filteredData);
  };

  return (
    <>
      <section className='searchSection'>
        <h1>Searching area</h1>
        <label className='advert_label'>Name: </label>
        <input type='text' onChange={handleFilterChange} />
      </section>
      <div className='container'>
        {isLoading ? (
          <div className='loadingPage'>
            <div className='loadingInfo'>
              <h1>LOADING....</h1>
            </div>
          </div>
        ) : (
          <div>
            {!!(adverts && adverts.length) ? (
              <>
                <div className='listContainer'>
                  <div className='contaienrTittle'>
                    <h1>ADVERTISEMENTS AVIABLE</h1>
                  </div>
                  <ul>
                    <ul>
                      {advertsToDisplay
                        .sort((a, b) => a.createdAt > b.createdAt)
                        .map((advert) => (
                          <li key={advert.id}>
                            <div className='advert-container'>
                              <Link to={`/adverts/${advert.id}`}>
                                <Advert
                                  key={advert.id}
                                  advert={advert}
                                  onImageError={handleImageError}
                                />
                              </Link>
                            </div>
                          </li>
                        ))}
                    </ul>
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
                          <span className='page' key={index}>
                            ...
                          </span>
                        );
                      } else {
                        return (
                          <>
                            <span
                              className='page'
                              key={index}
                              onClick={() => handlePageChange(index + 1)}
                            >
                              {index + 1}
                            </span>
                            {index < totalPages - 1 && <span> - </span>}
                          </>
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
  );
};

const mapStateToProps = (state) => ({
  adverts: getAdverts(state),
  //isLoading: isLoading(state),
  ...getUi(state),
});
const mapDispatchToProps = {
  onAdvertsLoaded: advertsList,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsListPage);
