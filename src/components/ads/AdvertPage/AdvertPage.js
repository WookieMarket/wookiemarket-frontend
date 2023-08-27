import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById, deleteAdvert } from '../../../store/slices/ads';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { getAdvertById, getUi } from '../../../store/selectors';
import { resetError, toggleModal } from '../../../store/slices/ui';
import Advert from '../Advert/Advert';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Button from '../../shared/Button';
import Modal from '../../shared/modal/Modal';
import ErrorModal from '../../shared/modal/ErrorModal';
import './advertPage.css';
import { useState } from 'react';
import Spinner from '../../shared/spinner/Spinner';

const AdvertPage = () => {
  const token = localStorage.getItem('auth');
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const advert = useSelector(state => getAdvertById(state, id));
  const { isLoading, error } = useSelector(getUi);

  //TODO Error al recargar
  const username = useSelector(state => state.ads.data[0].username);
  let realUser = false;
  const realUserComp = username => {
    const tokenUsername = JSON.parse(atob(token.split('.')[1]));
    console.log('tokenUsername:' + tokenUsername.username);
    username === tokenUsername.username
      ? (realUser = true)
      : //TODO MODALSHOW SAING THIS
        console.log('El usuario autenticado NO es el propietario del anuncio');
  };
  const isDisabled = !useSelector(state => state.auth) && realUser === true;
  !token //MODAL CON DEBE LOGUEARSE
    ? console.log('Ud. no está logueado')
    : realUserComp(username);

  console.log('username: ' + username);

  //MODAL WINDOWS
  const [activeModal, setActiveModal] = useState(null);

  const handleOpenModal = modalId => {
    setActiveModal(modalId);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };
  

  //Delete Advert
  const handleDeleteConfirm = async () => {
    setActiveModal(null);
    await dispatch(deleteAdvert(id));
    handleOpenModal(3);
    setTimeout(() => {
      navigate('/');
    }, 3000);
  };

  //TODO Edit Advert

  const handleEdit = () => {
    setActiveModal(null);
    console.log('Edited Advert');
  };

  useEffect(() => {
    dispatch(getAdById(id));
  }, [dispatch, id]);

  return (
    <>
      {isLoading ? (
        <Spinner message={t('LOADING......')} />
      ) : (
        <>
          {activeModal === 1 && (
            <Modal
              id="deleteModal1"
              title={t('DELETING ADVERTISEMENT')}
              message={t('Are you sure you want to delete this advert?')}
              onConfirm={() => handleOpenModal(2)}
              onCancel={handleCloseModal}
            ></Modal>
          )}

          {activeModal === 2 && (
            <Modal
              id={2}
              title={t('DELETING ADVERTISEMENT (confirmation)')}
              message={t(`Are you really sure you want to delete this advert?`)}
              onConfirm={handleDeleteConfirm}
              onCancel={handleCloseModal}
            ></Modal>
          )}
          {activeModal === 3 && (
            <Modal
              id={3}
              title={t('DELETED ADVERT')}
              message={t(`Your advert was deleted successfully`)}
              showCancel={false}
              onConfirm={() => navigate('/')}
            ></Modal>
          )}
          {error && (
            <ErrorModal
              title="Error"
              message={error.message}
              onCancel={handleErrorClick}
            />
          )}
          <Header />
          <div className={'content'}>
            <div className="holobackground"></div>
            <h1>
              <span className="StarWarsObject fontInverted">*</span>
              {t('ADVERT DETAIL')}
              <span className="StarWarsObject">*</span>
            </h1>
            {advert ? (
              <Advert {...advert} />
            ) : (
              <p>{t('Sorry, the requested ad is not available')}</p>
            )}
            {!isDisabled && (
              <section id="buttonSection">
                <Button id="deleteButton" onClick={() => handleOpenModal(1)}>
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
          <Footer />
        </>
      )}
    </>
  );
};

export default AdvertPage;
