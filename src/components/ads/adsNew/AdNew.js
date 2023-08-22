import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../../store/selectors";
import { resetError } from "../../../store/slices/ui";
import ErrorModal from "../../shared/modal/ErrorModal";
import Spinner from "../../shared/spinner/Spinner";
import Layout from "../../layout/Layout";
import { useTranslation } from "react-i18next";
import { adsCreate } from "../../../store/slices/ads";
import Form from "../../shared/form/Form";
import Button from "../../shared/Button";

import "./AdNew.css";

function AdNew() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    onSale: true,
    price: '',
    category: '',
    description: '',
    status: '',
    coin: '',
  });

  const adNew = {
    name: formData.name,
    onSale: formData.onSale,
    price: formData.price,
    category: formData.category,
    description: formData.description,
    status: formData.status,
    coin: formData.coin,
    image: image ? image.image : null,
  };

  const handleChangeInputFile = e => {
    setImage({ ...image, image: e.target.files[0] });
    console.log('Selected image file:', e.target.files[0]);
    console.log(' image file:', image);
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
    !formData.category ||
    !formData.description ||
    !formData.status ||
    !formData.coin;

  return (
    <Layout title={t('Create an ad')}>
      {isLoading ? (
        <Spinner message={t('charging...')} />
      ) : (
        <form
          onSubmit={handleSubmit}
          className="container-form-creation"
          encType="multipart/form-data">
          <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="adname"
            text={t("Article")}
            classNameInput="password-input-creation"
            inputId="adname"
            inputType="text"
            inputName="name"
            value={formData.name}
            handleChange={handleChange}
            placeholder={t('Name')}
          />

          <div className="input-checked">
            <Form
              classNameLabel="checked-label-creation"
              htmlFor="onsale"
              text={t("Sell")}
              classNameInput="checked-input-creation"
              inputId="onsale"
              inputType="radio"
              inputName="onSale"
              value={true}
              handleChange={handleChange}
              required
            />
            <Form
              classNameLabel="checked-label-creation"
              htmlFor="onsale"
              text={t("Buy")}
              classNameInput="checked-input-creation"
              inputId="onsale"
              inputType="radio"
              inputName="onSale"
              value={false}
              handleChange={handleChange}
              required
            />
          </div>

          <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="price"
            text={t("Price")}
            classNameInput="password-input-creation"
            inputId="price"
            inputType="number"
            inputName="price"
            value={formData.price}
            handleChange={handleChange}
            placeholder={t('Price')}
            required
          />
          <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="category"
            text={t("Category")}
            classNameInput="password-input-creation"
            inputId="category"
            inputType="text"
            inputName="category"
            value={formData.category}
            handleChange={handleChange}
            placeholder={t('Category')}
            required
          />
          <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="description"
            text={t("Description")}
            classNameInput="password-input-creation"
            inputId="description"
            inputType="text"
            inputName="description"
            value={formData.description}
            handleChange={handleChange}
            placeholder={t('Description')}
            required
          />
          <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="status"
            text={t("Status")}
            classNameInput="password-input-creation"
            inputId="status"
            inputType="text"
            inputName="status"
            value={formData.status}
            handleChange={handleChange}
            placeholder={t('Status')}
            required
          />
          <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="coin"
            text={t("Coin")}
            classNameInput="password-input-creation"
            inputId="coin"
            inputType="text"
            inputName="coin"
            value={formData.coin}
            handleChange={handleChange}
            placeholder={t('Coin')}
            required
          />
          <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="img"
            text={t("Image")}
            classNameInput="img-input-creation"
            inputId="img"
            inputName="image"
            inputType="file"
            accept="image/*"
            handleChange={handleChangeInputFile}
          />

          <Button
            data-testid="buttonAdNew"
            type="submit"
            variant="accept"
            //variant="primary"
            width="button-form"
            disabled={buttonDisabled}>
            {t("Create")}
          </Button>
        </form>
      )}

      {error && (
        <ErrorModal
          title="Error"
          message={error.message}
          onCancel={handleErrorClick}
        />
      )}
    </Layout>
  );
}

export default AdNew;
