import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useParams } from 'react-router';
//import Modal from '../../shared/modal/Modal';
import AdFormBuy from '../../shared/AdFormBuy/AdFormBuy';
import { useDispatch, useSelector } from 'react-redux';
import { emailBuyAd } from '../../../store/slices/ads';
import { getUi } from '../../../store/selectors';
import ErrorModal from '../../shared/modal/ErrorModal';
import { resetError } from '../../../store/slices/ui';
import Modal from '../../shared/modal/Modal';

const AdBuyPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log('id', id);
  const [showModal, setShowModal] = useState(false);
  const { error } = useSelector(getUi);

  // const handleShowModalEmail = () => {
  //   setShowModal(false);
  // };
  const handleErrorClick = () => {
    dispatch(resetError());
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    email: '',
  });
  console.log('texto', formData);

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(emailBuyAd({ adOwnerId: id, custom_message: formData.email }));
    handleOpenModal(1);
    // setTimeout(() => {
    //   navigate('/');
    // }, 3000);
    //setShowModal(true);
    // console.log('id', id);
    // console.log('texto', formData);
    // console.log('showModalEmail despues', showModal);
  };
  const [activeModal, setActiveModal] = useState(null);
  const handleOpenModal = modalId => {
    setActiveModal(modalId);
  };
  const handleCloseModal = () => {
    setActiveModal(null);
  };
  const buttonDisabled = !formData.email;
  console.log('showModalEmail:', showModal);

  return (
    <>
      {/* {!error && showModal && (
        <ErrorModal
          title={t('Email')}
          message={t('Email sent')}
          onCancel={handleShowModalEmail}
          testid="showmodal"
        />
      )} */}
      {activeModal === 1 && (
        <Modal
          buttonId="buyModal1"
          title={t('Email')}
          message={t('Email sent')}
          onConfirm={() => handleOpenModal(1)}
          onCancel={handleCloseModal}
        ></Modal>
      )}
      {error && (
        <ErrorModal
          buttonErrorId="errorAdBuy"
          title="Error"
          message={error.data.error}
          onCancel={handleErrorClick}
          testid="modalButton"
        />
      )}
      <AdFormBuy
        handleSubmit={handleSubmit}
        valueInputEmail={formData.email}
        handleChange={handleChange}
        buttonDisabled={buttonDisabled}
        testid={'buttonAdNew'}
        nameButton={t('Buy')}
      />
    </>
  );
};

export default AdBuyPage;
