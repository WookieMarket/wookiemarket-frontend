import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById } from '../../../store/slices/ads';
import { useParams } from 'react-router-dom';
import {
  getAdvertById,
  getUi,
  getUsernameFromAd,
} from '../../../store/selectors';
import { resetError, toggleModal } from '../../../store/slices/ui';
import Advert from '../Advert/Advert';
import Header from '../../layout/Header';
import Footer from '../../layout/Footer';
import Button from '../../shared/Button';
import Modal from '../../shared/modal/Modal';
import ErrorModal from '../../shared/modal/ErrorModal';
import './advertPage.css';
import { useState } from 'react';

const AdvertPage = () => {
  const token = localStorage.getItem('auth');
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const advert = useSelector(state => getAdvertById(state, id));
  const { isLoading, error } = useSelector(getUi);
  const isDisabled = !useSelector(state => state.auth) && !token;

  //TODO Error al recargar
  const username = useSelector(state => state.ads.data[0].username);
  const realUser = (username) => {
    const tokenUsername = JSON.parse(atob(token.split('.')[1]));
    console.log('tokenUsername:' + tokenUsername.username)
    username === tokenUsername.username ? (
      console.log('El usuario es autenticado es el propietario del anuncio')
    ) : (console.log('El usuario autenticado NO es el propietario del anuncio'))
  }
  !token ? (//MODAL CON DEBE LOGUEARSE
  console.log('Ud. no está logueado')) : (realUser(username))

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

  const handleDeletetClick = () => {
    dispatch(toggleModal());
  };

  const handleShowModalconfirm = async event => {
    dispatch(toggleModal());
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };
  /* */

  //TODO Delete Advert

  const handleDeleteConfirm = () => {
    setActiveModal(null);
    //dispatch(deletedAdvert(id));
    
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
        <div className="loadingPage">
          <div className="loadingInfo">
            <h1>LOADING....</h1>
            <div className="spinner" id="spinner">
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        </div>
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
