import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import AdFormBuy from '../../shared/AdFormBuy/AdFormBuy';
import { useDispatch, useSelector } from 'react-redux';
import { emailBuyAd } from '../../../store/slices/ads';
import { getUi } from '../../../store/selectors';
import ErrorModal from '../../shared/modal/ErrorModal';
import { resetError } from '../../../store/slices/ui';

const AdBuyPage = ({ handleButtonClick }) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { name } = useParams();
  console.log('nombre', name);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const { error } = useSelector(getUi);

  const handleErrorClick = () => {
    dispatch(resetError());
    setShowModal(false);
  };

  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleShowModal = () => {
    setShowModalEmail(false);
  };

  const handleSubmitEmail = async event => {
    event.preventDefault();
    dispatch(emailBuyAd({ adOwnerId: id, custom_message: formData.email }));
    console.log('Después del dispatch, showModal debería ser true:', showModal);
    setShowModal(true);
    console.log('Después de setShowModal(true), showModal es:', showModal);
  };

  const buttonDisabled = !formData.email;
  console.log('showModalEmail:', showModal);

  return (
    <>
      <AdFormBuy
        handleSubmit={handleSubmitEmail}
        valueInputEmail={formData.email}
        handleChange={handleChange}
        buttonDisabled={buttonDisabled}
        testid={'buttonAdNew'}
        nameButton={t('Buy')}
        handleButtonClick={handleButtonClick}
        nameButtonCancel={t('Cancel')}
      />

      {!error && showModalEmail && (
        <ErrorModal
          title={t('Email')}
          message={t('Email sent')}
          onCancel={handleShowModal}
          testid="showmodal"
        />
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
    </>
  );
};

export default AdBuyPage;
