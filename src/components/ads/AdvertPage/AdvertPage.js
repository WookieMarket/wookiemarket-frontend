import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getAdById } from '../../../store/slices/ads';
import { useNavigate, useParams } from 'react-router-dom';
import {
  getAdvertById,
  getIsLogged,
  getJwt,
  getUi,
} from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import Advert from '../Advert/Advert';
import Button from '../../shared/Button';
import Modal from '../../shared/modal/Modal';
import ErrorModal from '../../shared/modal/ErrorModal';
import './advertPage.css';
import '../../../css/holoTextEffect.css';
import { useState } from 'react';
import Layout from '../../layout/Layout';
import Spinner from '../../shared/spinner/Spinner';
import storage from '../../../utils/storage';
import jwt_decode from 'jwt-decode';

const AdvertPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const { id } = useParams();
  const isLogged = useSelector(getIsLogged);
  const advert = useSelector(getAdvertById(id));
  const jwt = useSelector(getJwt);
  const userJwt = jwt || storage.get('auth');

  //GETTING ADVERT BY ID
  useEffect(() => {
    dispatch(getAdById(id));
  }, [dispatch, id]);

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

  //USERINFO HANDLING
  if (!userJwt) {
    return;
  }
  let userId;
  try {
    userId = jwt_decode(userJwt)._id;
  } catch (error) {
    console.error('Error decoding token: ', error);
  }

  const isAdvertOwner = advert && isLogged && advert.userId === userId;
  console.log('advert.userId: ' + advert.userId);
  console.log('isAdvertOwner:' + isAdvertOwner);
  const isDisabled = !isAdvertOwner;

  //TODO Delete Advert
  const handleDeleteConfirm = () => {
    setActiveModal(null);
    console.log('Deleted Advert');
  };

  const handleEdit = () => {
    setActiveModal(null);
    console.log('Edited Advert');
    // Redirige a la página de modificación con el ID del anuncio
    navigate(`/modify/${id}`);
  };

  return (
    <Layout>
      {isLoading ? (
        <Spinner message={t('charging...')} />
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

          <div className={'content'}>
            <div className="holobackground"></div>
            <h1 className="hologram-text tv-text">
              <span className="StarWarsObject fontInverted">*</span>
              {t('ADVERT DETAIL')}
              <span className="StarWarsObject">*</span>
            </h1>
            {advert ? (
              <Advert {...advert} />
            ) : (
              <p>{t('Sorry, the requested ad is not available')}</p>
            )}
            {!isDisabled && advert && (
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
        </>
      )}
    </Layout>
  );
};

export default AdvertPage;
