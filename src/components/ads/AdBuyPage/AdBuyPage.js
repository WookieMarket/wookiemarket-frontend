import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { getUi } from '../../../store/selectors';
import { emailBuyAd } from '../../../store/slices/ads';
import { resetError } from '../../../store/slices/ui';
import AdFormBuy from '../../shared/AdFormBuy/AdFormBuy';
import ErrorModal from '../../shared/modal/ErrorModal';

const AdBuyPage = ({
  handleButtonClick,
  handleSubmitEmail,
  showModalEmail,
  setShowModalEmail,
}) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();
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
    navigate('/');
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
      {!showModalEmail && (
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
      )}

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
