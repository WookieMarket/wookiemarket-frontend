import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';
import Spinner from '../../shared/spinner/Spinner';
import Layout from '../../layout/Layout';
import { useTranslation } from 'react-i18next';
//import { adsCreate } from '../../../store/slices/ads';
//import Form from '../../shared/form/Form';
import AdForm from '../../AdForm/AdForm';
import { getAd, modifyAd } from '../../../service/ads';
//import Button from '../../shared/Button';
//import AdForm from '../../AdForm/AdForm';

//import './AdNew.css';

function ModifyAd({ match }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const [ad, setAd] = useState(null);
  const [image, setImage] = useState(null);

  //const adId = match.params.id;
  const adId = '64eb4bc75e26a79e96c9042e';

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const fetchedAd = await dispatch(getAd(adId));
        setAd(fetchedAd);
      } catch (error) {
        // Manejo de errores
      }
    };
    fetchAd();
  }, [adId, dispatch]);

  const handleChangeInputFile = e => {
    setImage({ ...image, image: e.target.files[0] });
    console.log('Selected image file:', e.target.files[0]);
    console.log(' image file:', image);
  };

  const handleChange = event => {
    setAd({
      ...ad,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(modifyAd((adId, ad)));
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const buttonDisabled =
    !ad.name ||
    !ad.onSale ||
    !ad.price ||
    !ad.category ||
    !ad.description ||
    !ad.coin;

  return (
    <Layout title={t('Create an ad')}>
      {isLoading ? (
        <Spinner message={t('charging...')} />
      ) : (
        <AdForm
          handleSubmit={handleSubmit}
          valueInputName={ad.name}
          handleChange={handleChange}
          valueInputPrice={ad.price}
          valueInputCategory={ad.category}
          valueInputDescription={ad.description}
          valueInputCoin={ad.coin}
          handleChangeInputFile={handleChangeInputFile}
          buttonDisabled={buttonDisabled}
          testid={'buttonModifyAd'}
          nameButton={t('Modify')}
        ></AdForm>
      )}

      {error && (
        <ErrorModal
          title="Error"
          message={error.message}
          onCancel={handleErrorClick}
          testid="modalButton"
        />
      )}
    </Layout>
  );
}

export default ModifyAd;
