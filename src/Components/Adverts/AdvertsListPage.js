
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Advert from './AdvertPage';
import { connect } from 'react-redux';
import { getAdverts, getUi } from '../../store/selectors';
import { advertsList } from '../../store/slices/adverts';


const EmptyList = ({ dataFiltered }) => {
    
        <div style={{ textAlign: 'center' }}>
            <p>Sorry, no adverts yet.</p>
        </div>
};

const AdvertsListPage = ({ adverts, onAdvertsLoaded, isLoading }) => {

    const [query, setQuery] = useState('');

    useEffect(() => {
        onAdvertsLoaded();
      }, [onAdvertsLoaded]);

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
                        {[...adverts]
                        .slice()
                          .sort((a, b) => a.createdAt > b.createdAt)
                          .map((advert) => (
                            <li key={advert.id}>
                              <Link to={`/adverts/${advert.id}`}>
                                {<Advert {...advert} />}
                              </Link>
                            </li>
                          ))}
                      </ul>
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