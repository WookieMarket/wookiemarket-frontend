import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Advert from "./Advert";
import { useDispatch, useSelector } from "react-redux";
import { getAdverts, getUi } from "../../store/selectors";
import { advertsList } from "../../store/slices/ads";
import "../../css/advertListPage.css";
import "../../css/advert.css";
import defaultImage from "../../assets/no_image.jpg";
import { filterByName } from "../../store/slices/adsFiltered";
import Layout from "../layout/Layout";

const EmptyList = ({ dataFiltered }) => {
  return (
    <div style={{ textAlign: "center" }}>
      <p>Sorry, no adverts yet.</p>
    </div>
  );
};

const handleImageError = event => {
  event.target.src = defaultImage;
};

const advertsPerPage = 2;

const AdvertsListPage = () => {
  //const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredAdverts, setFilteredAdverts] = useState("");
  const [isFilterActive, setIsFilterActive] = useState(false);
  const ads = useSelector(getAdverts);
  const { isLoading } = useSelector(getUi);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   onAdvertsLoaded();
  // }, [onAdvertsLoaded]);

  useEffect(() => {
    dispatch(advertsList()).catch(error => console.log(error));
  }, [dispatch]);

  const handlePageChange = page => {
    setCurrentPage(page);
  };

  const filterAdName = ad =>
    (ad.name ?? "").toUpperCase().startsWith(filteredAdverts.toUpperCase());

  const filteredAds = ads
    //.filter(filterAdSaleValueOrDefault)
    .filter(filterAdName);
  //.filter(filterAdPrice)
  //.filter(filterAdTags);

  //const totalPages = Math.ceil(adverts.length / advertsPerPage);
  const totalPages = Math.ceil(
    (isFilterActive ? filteredAds.length : ads.length) / advertsPerPage,
  );
  const startIndex = (currentPage - 1) * advertsPerPage;
  const endIndex = startIndex + advertsPerPage;
  //const advertsToDisplay = adverts.slice(startIndex, endIndex);
  const advertsToDisplay = isFilterActive
    ? filteredAds.slice(startIndex, endIndex)
    : ads.slice(startIndex, endIndex);
  //const isLastPage = currentPage === totalPages;
  const isLastPage = isFilterActive
    ? currentPage === Math.ceil(filteredAds.length / advertsPerPage)
    : currentPage === Math.ceil(ads.length / advertsPerPage);

  // const handleFilterChange = event => {
  //   // //filterByName(event.target.value);
  //   // const filteredData = filterByName({ name: event.target.value, adverts });
  //   // setFilteredAdverts(filteredData);
  //   setFilteredAdverts(event.target.value);
  // };

  // const handleFilterChange = event => {
  //   const value = event.target.value;
  //   setFilteredAdverts(value);
  //   setIsFilterActive(value.trim() !== "");
  // };
  const handleFilterChange = event => {
    const value = event.target.value;
    setFilteredAdverts(value);
    setIsFilterActive(value.trim() !== "");
    dispatch(filterByName({ name: value.trim(), adverts: ads })); // Llama a la acción filterByName
  };

  return (
    <Layout title="anuncios">
      <>
        <section className="searchSection">
          <h1>Searching area</h1>
          <label className="advert_label">Name: </label>
          <input type="text" onChange={handleFilterChange} />
        </section>
        <div className="container">
          {isLoading ? (
            <div className="loadingPage">
              <div className="loadingInfo">
                <h1>LOADING....</h1>
              </div>
            </div>
          ) : (
            <div>
              {!!(ads && ads.length) ? (
                <>
                  <div className="listContainer">
                    <div className="contaienrTittle">
                      <h1>ADVERTISEMENTS AVIABLE</h1>
                    </div>
                    <ul>
                      {advertsToDisplay
                        .sort((a, b) => a.createdAt > b.createdAt)
                        .map(advert => (
                          <li key={advert.id}>
                            <div className="advert-container">
                              <Link to={`/adverts/${advert.id}`}>
                                <Advert
                                  advert={advert}
                                  onImageError={handleImageError}
                                />
                              </Link>
                            </div>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="pagination">
                    <p>
                      <span
                        className={currentPage === 1 ? "disabled" : "page"}
                        onClick={() => handlePageChange(currentPage - 1)}>
                        &lt;{" "}
                      </span>
                      {[...Array(totalPages)].map((_, index) => {
                        if (
                          totalPages > 5 &&
                          index > 1 &&
                          index < totalPages - 2
                        ) {
                          return (
                            <span className="page" key={index}>
                              ...
                            </span>
                          );
                        } else {
                          return (
                            <>
                              <span
                                className="page"
                                key={index}
                                onClick={() => handlePageChange(index + 1)}>
                                {index + 1}
                              </span>
                              {index < totalPages - 1 && <span> - </span>}
                            </>
                          );
                        }
                      })}
                      <span
                        className={isLastPage ? "disabled" : "page"}
                        onClick={() => handlePageChange(currentPage + 1)}>
                        {" "}
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

// const mapStateToProps = state => ({
//   adverts: getAdverts(state),
//   //isLoading: isLoading(state),
//   ...getUi(state),
// });
// const mapDispatchToProps = {
//   onAdvertsLoaded: advertsList,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(AdvertsListPage);

export default AdvertsListPage;
