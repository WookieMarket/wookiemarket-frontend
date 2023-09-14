import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';
import Spinner from '../../shared/spinner/Spinner';
import Layout from '../../layout/Layout';
import { useTranslation } from 'react-i18next';
import { adsCreate } from '../../../store/slices/ads';
import AdForm from '../../shared/AdForm/AdForm';

function AdNew() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    onSale: true,
    price: '',
    description: '',
    status: 'available',
    coin: '',
  });
  const [selectedTags, setSelectedTags] = useState([]);

  const adNew = {
    name: formData.name,
    onSale: formData.onSale,
    price: formData.price,
    category: selectedTags ? selectedTags.value : '',
    description: formData.description,
    status: 'available',
    coin: formData.coin,
    image: image ? image.image : null,
  };

  const handleChangeInputFile = e => {
    setImage({ ...image, image: e.target.files[0] });
    console.log('Selected image file:', e.target.files[0]);
    console.log(' image file:', image);
  };

  const handleTagChange = selectedOption => {
    const selectedCategory = selectedOption ? selectedOption.value : '';
    setSelectedTags(selectedOption);
    handleChange({ target: { value: selectedCategory } });
  };

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    dispatch(adsCreate(adNew));
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const buttonDisabled =
    !formData.name ||
    !formData.onSale ||
    !formData.price ||
    !formData.description ||
    !formData.coin ||
    !selectedTags;

  return (
    <Layout title={t('Create an ad')}>
      {isLoading ? (
        <Spinner message={t('charging...')} />
      ) : (
        <AdForm
          handleSubmit={handleSubmit}
          valueInputName={formData.name}
          handleChange={handleChange}
          valueInputPrice={formData.price}
          valueInputDescription={formData.description}
          valueInputCoin={formData.coin}
          handleTagChange={handleTagChange}
          handleChangeInputFile={handleChangeInputFile}
          buttonDisabled={buttonDisabled}
          testid={'buttonAdNew'}
          nameButton={t('Create')}
          showSoldReservedOptions={false}
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

export default AdNew;
