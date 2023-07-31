import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from './Advert';
import { connect } from 'react-redux';
import { getAdverts, getUi } from '../../store/selectors';
import { advertsList } from '../../store/slices/ads';
import '../../css/advertListPage.css';
import '../../css/advert.css';

const EmptyList = ({ dataFiltered }) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <p>Sorry, no adverts yet.</p>
    </div>
  );
};

const advertsPerPage = 2;

const AdvertsListPage = ({ adverts, onAdvertsLoaded, isLoading }) => {
  //const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

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

  return (
    <>
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
                                <Advert {...advert} />
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
