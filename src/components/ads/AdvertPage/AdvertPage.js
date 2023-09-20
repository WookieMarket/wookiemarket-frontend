import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import '../../../css/holoTextEffect.css';
import { getAdvertById, getIsLogged, getUi } from '../../../store/selectors';
import { deleteAdvert, getAdById } from '../../../store/slices/ads';
import { resetError } from '../../../store/slices/ui';
import IsDisable from '../../../utils/isDisable';
import Layout from '../../layout/Layout';
import Button from '../../shared/Button';
import ErrorModal from '../../shared/modal/ErrorModal';
import Modal from '../../shared/modal/Modal';
import Spinner from '../../shared/spinner/Spinner';
import AdBuyPage from '../AdBuyPage/AdBuyPage';
import Advert from '../Advert/Advert';
import './advertPage.css';

const AdvertPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const { isLoading, error } = useSelector(getUi);
  const { id } = useParams();

  //GETTING ADVERT BY ID
  useEffect(() => {
    dispatch(getAdById(id));
  }, [dispatch, id]);

  //MODAL WINDOWS
  const [activeModal, setActiveModal] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = modalId => {
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  //USERINFO HANDLING
  const advert = useSelector(getAdvertById(id));

  const isDisabled = IsDisable(advert);

  //Delete Advert
  const handleDeleteConfirm = async () => {
    setActiveModal(null);
    await dispatch(deleteAdvert(id));
    handleOpenModal(3);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  const handleEdit = () => {
    setActiveModal(null);

    // Redirects to the modification page with the ID of the advertisement.
    navigate(`/modify/${id}`);
  };

  const handleBuy = () => {
    setShowModal(true);
  };

  return (
    <Layout>
      {isLoading ? (
        <Spinner message={t('charging...')} />
      ) : (
        <>
          {activeModal === 2 && (
            <Modal
              buttonId1="delete3"
              buttonId2="delete4"
              id={2}
              title={t('DELETING ADVERTISEMENT')}
              message={t(`Are you really sure you want to delete this advert?`)}
              onConfirm={handleDeleteConfirm}
              onCancel={handleCloseModal}
            ></Modal>
          )}
          {activeModal === 3 && (
            <Modal
              buttonId1="delete5"
              buttonId2="delete6"
              id={3}
              title={t('DELETED ADVERT')}
              message={t(`Your advert was deleted successfully`)}
              showCancel={false}
              onConfirm={() => navigate('/')}
            ></Modal>
          )}

          {showModal && <AdBuyPage />}

          {error && (
            <ErrorModal
              buttonErrorId="errorAdvertPage"
              title="Error"
              message={error.data.error}
              onCancel={handleErrorClick}
            />
          )}

          <div className={'content'}>
            <div className="holobackground"></div>
            <h1 className="hologram-text tv-text">{t('ADVERT DETAIL')}</h1>
            {advert ? (
              <Advert {...advert} />
            ) : (
              <p>{t('Sorry, the requested ad is not available')}</p>
            )}

            {isDisabled && isLogged && (
              <section className="buttonSection">
                <Button id="buyButton" onClick={handleBuy}>
                  {t('Buy button title')}
                </Button>
              </section>
            )}

            {!isDisabled && advert && (
              <section className="buttonSection">
                <Button id="deleteButton" onClick={() => handleOpenModal(2)}>
                  {t('Delete Advert')}?
                </Button>
                <Button id="editButton" onClick={handleEdit}>
                  {t('Edit Advert')}
                </Button>
              </section>
            )}
            <div
              className={`no-advert_content ${!advert ? 'no-advert' : ''}`}
            ></div>
          </div>
          <div
            className={`holoBase ${!advert ? 'holoBaseNoAdvert' : ''}`}
          ></div>
        </>
      )}
    </Layout>
  );
};

export default AdvertPage;
