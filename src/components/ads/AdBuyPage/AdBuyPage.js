import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import AdFormBuy from '../../shared/AdFormBuy/AdFormBuy';
import { useDispatch, useSelector } from 'react-redux';
import { emailBuyAd } from '../../../store/slices/ads';
import { getUi } from '../../../store/selectors';
import ErrorModal from '../../shared/modal/ErrorModal';
import { resetError } from '../../../store/slices/ui';

const AdBuyPage = ({ handleButtonClick, handleSubmitEmail }) => {
  const { t } = useTranslation();
  const { id } = useParams();

  const dispatch = useDispatch();
  //const [showModal, setShowModal] = useState(false);
  const [showModalEmail, setShowModalEmail] = useState(false);
  const { error } = useSelector(getUi);

  const handleErrorClick = () => {
    dispatch(resetError());
    setShowModalEmail(false);
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

  handleSubmitEmail = async event => {
    console.log('handleSubmitEmail se está llamando');
    event.preventDefault();
    dispatch(emailBuyAd({ adOwnerId: id, custom_message: formData.email }));

    setShowModalEmail(true);
  };

  const buttonDisabled = !formData.email;

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
