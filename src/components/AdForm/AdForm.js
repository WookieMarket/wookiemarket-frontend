import { useTranslation } from 'react-i18next';
import Form from '../shared/form/Form';
import Button from '../shared/Button';
import './AdForm.css';

function AdForm(props) {
  const {
    handleSubmit,
    valueInputName,
    handleChange,
    valueInputPrice,
    valueInputCategory,
    valueInputDescription,
    valueInputCoin,
    handleChangeInputFile,
    buttonDisabled,
    testid,
    nameButton,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="container-form-creation"
        encType="multipart/form-data"
      >
        <Form
          classNameForm="form-group-creation"
          classNameLabel="password-label-creation"
          htmlFor="adname"
          text={t('Article')}
          classNameInput="password-input-creation"
          inputId="adname"
          inputType="text"
          inputName="name"
          value={valueInputName}
          handleChange={handleChange}
          placeholder={t('Name')}
        />

        <div className="input-checked">
          <Form
            classNameLabel="checked-label-creation"
            htmlFor="onsale"
            text={t('Sell')}
            classNameInput="checked-input-creation"
            inputId="onsale"
            inputType="radio"
            inputName="onSale"
            value={true}
            handleChange={handleChange}
          />
          <Form
            classNameLabel="checked-label-creation"
            htmlFor="onsale"
            text={t('Buy')}
            classNameInput="checked-input-creation"
            inputId="onsale"
            inputType="radio"
            inputName="onSale"
            value={false}
            handleChange={handleChange}
          />
        </div>

        <Form
          classNameForm="form-group-creation"
          classNameLabel="password-label-creation"
          htmlFor="price"
          text={t('Price')}
          classNameInput="password-input-creation"
          inputId="price"
          inputType="number"
          inputName="price"
          value={valueInputPrice}
          handleChange={handleChange}
          placeholder={t('Price')}
        />
        <Form
          classNameForm="form-group-creation"
          classNameLabel="password-label-creation"
          htmlFor="category"
          text={t('Category')}
          classNameInput="password-input-creation"
          inputId="category"
          inputType="text"
          inputName="category"
          value={valueInputCategory}
          handleChange={handleChange}
          placeholder={t('Category')}
        />
        <Form
          classNameForm="form-group-creation"
          classNameLabel="password-label-creation"
          htmlFor="description"
          text={t('Description')}
          classNameInput="password-input-creation"
          inputId="description"
          inputType="text"
          inputName="description"
          value={valueInputDescription}
          handleChange={handleChange}
          placeholder={t('Description')}
        />
        {/* <Form
            classNameForm="form-group-creation"
            classNameLabel="password-label-creation"
            htmlFor="status"
            text={t('Status')}
            classNameInput="password-input-creation"
            inputId="status"
            inputType="text"
            inputName="status"
            value={formData.status}
            handleChange={handleChange}
            placeholder={t('Status')}
            required
          /> */}
        <Form
          classNameForm="form-group-creation"
          classNameLabel="password-label-creation"
          htmlFor="coin"
          text={t('Coin')}
          classNameInput="password-input-creation"
          inputId="coin"
          inputType="text"
          inputName="coin"
          value={valueInputCoin}
          handleChange={handleChange}
          placeholder={t('Coin')}
        />
        <Form
          classNameForm="form-group-creation"
          classNameLabel="password-label-creation"
          htmlFor="img"
          text={t('Image')}
          classNameInput="img-input-creation"
          inputId="img"
          inputName="image"
          inputType="file"
          accept="image/*"
          handleChange={handleChangeInputFile}
        />

        <Button
          data-testid={testid}
          type="submit"
          variant="accept"
          //variant="primary"
          width="button-form"
          disabled={buttonDisabled}
        >
          {nameButton}
        </Button>
      </form>
    </>
  );
}

export default AdForm;
