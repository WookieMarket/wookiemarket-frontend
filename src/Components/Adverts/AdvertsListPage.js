import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Advert from './AdvertPage';
import { getAdverts } from '../../store/selectors';
import { adFilterName, advertsLoaded } from '../../store/actions';

const EmptyList = ({ dataFiltered }) => {
    return dataFiltered ? (
        <div style={{ textAlign: 'center' }}>
            <p>Sorry, no adverts yet.</p>
        </div>
    ) : (
        <div style={{ textAlign: 'center' }}>
            <p>Sorry, your search returned no results</p>
        </div>
    );
};

const AdvertsListPage = ({ isLoading }) => {
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const adverts = useSelector(getAdverts);

    const onAdvertsLoaded = (adverts) => dispatch(advertsLoaded(adverts));

    const [query, setQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState({
        lifestyle: false,
        motor: false,
        mobile: false,
        work: false,
    });
    const [dataFiltered, setDataFiltered] = useState([]);
    const [maxPrice, setQueryMaxPrice] = useState(Infinity);
    const [minPrice, setQueryMinPrice] = useState(-Infinity);

    let filteredAdverts = adverts.filter((advert) =>
        advert.name.toUpperCase().startsWith(query.toLocaleUpperCase())
    );

    useEffect(() => {
        dispatch(advertsLoaded())
            .then((adverts) => {
                filteredAdverts === 0
                    ? onAdvertsLoaded(adverts) //setDataFiltered(true)
                    : dispatch(adFilterName(query)); //setDataFiltered(false);
                //onAdvertsLoaded(adverts);
                //dispatch(adFilterName(query));
            })
            .catch((error) => {
                console.log('El error: ', error);
                if (error.status === 401) {
                    navigate('/login');
                } else {
                }
            });
    }, [
        dispatch,
        filteredAdverts,
        navigate,
        onAdvertsLoaded,
        query,
    ]);

    const handleFilter = (event) => {
        const { name, value } = event.target;
        if (name === 'filterByName') {
            setQuery(value);
            dispatch(adFilterName(value));
        };
    }

    return (
        <>
            <div className='container'>
                {isLoading ? (
                    <div className='loadingPage'>
                        <div className='loadingInfo'>
                            <h1>LOADING....</h1>
                            <div className='spinner' id='spinner'>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className='filterArea'>
                            <div>
                                <h1>Searching Area</h1>
                            </div>
                            {/*FILTER BY NAME*/}
                            <div className='filters'>
                                <label htmlFor='filterByName'>
                                    By name: {''}
                                </label>
                                <input
                                    name='filterByName'
                                    type='text'
                                    style={{ borderWidth: 1 }}
                                    value={query}
                                    onChange={(event) =>
                                        setQuery(event.target.value)
                                    }
                                />
                            </div>

                            {/*FILTER BY PRICE*/}
                            <div className='filters'>
                                <label htmlFor='filterByPrice'>
                                    By price: {''}
                                </label>
                                <input
                                    name='minPrice'
                                    type='number'
                                    placeholder='Min'
                                    value={minPrice}
                                    onChange={handleFilter}
                                    className='numberInputs'
                                />
                                <input
                                    name='maxPrice'
                                    type='number'
                                    placeholder='Max'
                                    value={maxPrice}
                                    onChange={handleFilter}
                                    className='numberInputs'
                                />
                            </div>
                        </div>
                        {!!adverts.length && filteredAdverts.length ? (
                            <>
                                <div className='listContainer'>
                                    <div className='contaienrTittle'>
                                        <h1>ADVERTISEMENTS AVIABLE</h1>
                                    </div>
                                    <ul>
                                        {filteredAdverts
                                            .sort(
                                                (a, b) =>
                                                    a.createdAt > b.createdAt
                                            )
                                            .map((advert) => (
                                                <li key={advert.id}>
                                                    <Link
                                                        to={`/adverts/${advert.id}`}
                                                    >
                                                        {<Advert {...advert} />}
                                                    </Link>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <EmptyList dataFiltered={dataFiltered} />
                        )}
                    </div>
                )}
            </div>
        </>
    );
};

export default AdvertsListPage;
