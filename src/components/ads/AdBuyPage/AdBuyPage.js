import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import { useParams } from 'react-router';
//import Modal from '../../shared/modal/Modal';
import AdFormBuy from '../../shared/AdFormBuy/AdFormBuy';

import { useDispatch } from 'react-redux';
import { emailBuyAd } from '../../../store/slices/ads';

const AdBuyPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log('id', id);

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
    console.log('id', id);
    console.log('texto', formData);
  };

  const buttonDisabled = !formData.email;

  return (
    <>
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
