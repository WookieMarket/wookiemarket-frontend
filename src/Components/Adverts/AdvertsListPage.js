
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from './AdvertPage';
import { connect } from 'react-redux';
import { getAdverts, getUi } from '../../store/selectors';
import { advertsList } from '../../store/slices/adverts';
import '../../stylesheets/advertListPage.css'


const EmptyList = ({ dataFiltered }) => {
    
        <div style={{ textAlign: 'center' }}>
            <p>Sorry, no adverts yet.</p>
        </div>
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

  return (
    <>
      <div className="container">
        {isLoading ? (
          <div className="loadingPage">
            <div className="loadingInfo">
              <h1>LOADING....</h1>
            </div>
          </div>
        ) : (
          <div>
            {!!(adverts && adverts.length) ? (
              <>
                <div className="listContainer">
                  <div className="contaienrTittle">
                    <h1>ADVERTISEMENTS AVIABLE</h1>
                  </div>
                  <ul>
                    {advertsToDisplay
                      .sort((a, b) => a.createdAt > b.createdAt)
                      .map((advert) => (
                        <li key={advert.id}>
                          <Link to={`/adverts/${advert.id}`}>
                            <Advert {...advert} />
                          </Link>
                        </li>
                      ))}
                  </ul>
                </div>
                <div className="pagination">
                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
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


const mapStateToProps = state => ({
    adverts: getAdverts(state),
    //isLoading: isLoading(state),
    ...getUi(state)
    });
const mapDispatchToProps = {
    onAdvertsLoaded: advertsList,
    };
    
export default connect(mapStateToProps, mapDispatchToProps)(AdvertsListPage);