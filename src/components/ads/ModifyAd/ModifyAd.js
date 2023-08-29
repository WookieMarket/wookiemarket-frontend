import { useState } from 'react';
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
//import { modifyAd } from '../../../service/ads';
import { useParams } from 'react-router-dom';
import { uploadModifiedAd } from '../../../store/slices/ads';

//import Button from '../../shared/Button';
//import AdForm from '../../AdForm/AdForm';
//import './AdNew.css';

function ModifyAd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const [image, setImage] = useState('');
  const { adId } = useParams();

  // const advert = useSelector(getAdvertById(adId));
  // console.log('anuncio padina', advert);

  const [modifiedAd, setModifiedAd] = useState('');
  // const [modifiedAd, setModifiedAd] = useState({
  //   name: '',
  //   onSale: true,
  //   price: '',
  //   category: '',
  //   description: '',
  //   coin: '',
  // })

  const handleChangeInputFile = e => {
    setImage({ ...image, image: e.target.files[0] });
    console.log('Selected image file:', e.target.files[0]);
    console.log(' image file:', image);
  };

  const handleChange = event => {
    setModifiedAd({
      ...modifiedAd,
      [event.target.name]: event.target.value,
    });
  };
  const adNew = {
    name: modifiedAd.name,
    onSale: modifiedAd.onSale,
    price: modifiedAd.price,
    category: modifiedAd.category,
    description: modifiedAd.description,
    coin: modifiedAd.coin,
    image: image ? image.image : null,
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(uploadModifiedAd({ id: adId, ad: adNew }));
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  // useEffect(() => {
  //   // Cargar el anuncio con el adId
  //   dispatch(getAdById(adId));
  // }, [dispatch, adId]);

  // const buttonDisabled =
  //   !ad.name ||
  //   !ad.onSale ||
  //   !ad.price ||
  //   !ad.category ||
  //   !ad.description ||
  //   !ad.coin;

  return (
    <Layout title={t('Edit an ad')}>
      {isLoading ? (
        <Spinner message={t('charging...')} />
      ) : (
        <AdForm
          handleSubmit={handleSubmit}
          valueInputName={modifiedAd.name}
          handleChange={handleChange}
          valueInputPrice={modifiedAd.price}
          valueInputCategory={modifiedAd.category}
          valueInputDescription={modifiedAd.description}
          valueInputCoin={modifiedAd.coin}
          handleChangeInputFile={handleChangeInputFile}
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
