import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAdvert, getAdById } from '../../../store/slices/ads';
import { useNavigate, useParams } from 'react-router-dom';
import { getAdvertById, getIsLogged, getUi } from '../../../store/selectors';
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
import IsDisable from '../../../utils/isDisable';
import AdBuyPage from '../AdBuyPage/AdBuyPage';

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
    console.log('Edited Advert');
    // Redirects to the modification page with the ID of the advertisement.
    navigate(`/modify/${id}`);
  };

  const handleChat = () => {
    setActiveModal(null);
    console.log('Chat Window');
    // Redirects to the Chat with the advert owner
    //navigate(`/chatRoom/${KEY}`); --> Ensure the key for chatRoom
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
          {activeModal === 1 && (
            <Modal
              buttonId1="delete1"
              buttonId2="delete2"
              id="deleteModal1"
              title={t('DELETING ADVERTISEMENT')}
              message={t('Are you sure you want to delete this advert?')}
              onConfirm={() => handleOpenModal(2)}
              onCancel={handleCloseModal}
            ></Modal>
          )}

          {activeModal === 2 && (
            <Modal
              buttonId1="delete3"
              buttonId2="delete4"
              id={2}
              title={t('DELETING ADVERTISEMENT (confirmation)')}
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

            {isDisabled && (
              <section id="buttonSection">
                <Button id="buyButton" onClick={handleBuy}>
                  {t('Buy Advert')}
                </Button>
              </section>
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
            {isLogged && advert && (
              <Button id="chatButton" onClick={handleChat}>
                {t('Chat with ad owner')}
              </Button>
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
