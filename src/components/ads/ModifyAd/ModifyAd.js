import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAdvertById, getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';
import Spinner from '../../shared/spinner/Spinner';
import Layout from '../../layout/Layout';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getAdById, uploadModifiedAd } from '../../../store/slices/ads';
import AdForm from '../../shared/AdForm/AdForm';

function ModifyAd() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const [image, setImage] = useState('');
  const { adId } = useParams();
  const advert = useSelector(getAdvertById(adId));
  const [modifiedAd, setModifiedAd] = useState(advert);

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

  const [selectedTags, setSelectedTags] = useState([]);
  const adNew = {
    name: modifiedAd.name,
    onSale: modifiedAd.onSale,
    price: modifiedAd.price,
    category: selectedTags ? selectedTags.value : '',
    coin: modifiedAd.coin,
    image: image ? image.image : null,
  };

  const handleTagChange = selectedOption => {
    const selectedCategory = selectedOption ? selectedOption.value : '';
    setSelectedTags(selectedOption);
    handleChange({ target: { value: selectedCategory } });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(uploadModifiedAd({ id: adId, ad: adNew }));
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  useEffect(() => {
    dispatch(getAdById(adId));
  }, [dispatch, adId]);

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
          valueInputDescription={modifiedAd.description}
          valueInputCoin={modifiedAd.coin}
          handleTagChange={handleTagChange}
          handleChangeInputFile={handleChangeInputFile}
          testid={'buttonModifyAd'}
          nameButton={t('Modify')}
        ></AdForm>
      )}

      {error && (
        <ErrorModal
          title="Error"
          message={error.data.error}
          onCancel={handleErrorClick}
          testid="modalButton"
        />
      )}
    </Layout>
  );
}

export default ModifyAd;
