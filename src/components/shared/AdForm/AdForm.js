import { useTranslation } from 'react-i18next';
import Form from '../form/Form';
import Button from '../Button';
import './AdForm.css';
import { getAllCategory } from '../../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import {
  addNewCategory,
  categoriesList,
} from '../../../store/slices/categories';
import { useEffect } from 'react';
import AdCategorySelect from '../AdCategory/AdCategory';
import './AdForm.css';
import SelectForm from '../SelectForm/SelectForm';

function AdForm(props) {
  const {
    handleOpcionsChange,
    handleSubmit,
    valueInputName,
    handleChange,
    valueInputPrice,
    valueInputCategory,
    valueInputDescription,
    valueInputCoin,
    handleTagChange,
    handleChangeInputFile,
    buttonDisabled,
    testid,
    nameButton,
    nameButtonCancel,
    showSoldReservedOptions,
    handleButtonClick,
  } = props;
  const { t } = useTranslation();
  const tags = useSelector(getAllCategory);
  const dispatch = useDispatch();

  const formattedTags = tags.map(tag => ({
    label: tag,
    value: tag,
  }));

  const handleCreateCategory = newCategory => {
    dispatch(addNewCategory(newCategory));
  };

  useEffect(() => {
    dispatch(categoriesList()).catch(error => console.log(error));
  }, [dispatch]);

  return (
    <div className="form">
      <form
        onSubmit={handleSubmit}
        className="container-form-creation-refactor"
        encType="multipart/form-data"
      >
        {showSoldReservedOptions && ( // Condición para mostrar las opciones "Sell" y "Buy"
          <div className=" element-form">
            <label>{t('Status')}</label>
            <SelectForm
              inputId="status"
              onChange={handleOpcionsChange}
              className="select-form-status"
            />
          </div>
        )}

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

        <div className=" element-form">
          <label>{t('Categories')}</label>

          <AdCategorySelect
            inputId="category"
            options={formattedTags}
            value={valueInputCategory}
            className="select-form-categories"
            onChange={newValue => {
              const selectedValue = newValue ? newValue.value : null;

              if (selectedValue) {
                const categoryExists = formattedTags.some(
                  tag => tag.value === selectedValue,
                );

                if (!categoryExists) {
                  handleCreateCategory(selectedValue);
                }
              }

              handleTagChange(newValue);
            }}
          />
        </div>
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

        <div className="container-button">
          <Button
            id="adformcancel"
            data-testid={testid}
            type="button"
            variant="decline"
            // width="button-form"
            onClick={handleButtonClick}
          >
            {nameButtonCancel}
          </Button>
          <Button
            id="adform"
            data-testid={testid}
            type="submit"
            variant="accept"
            // width="button-form"
            disabled={buttonDisabled}
          >
            {nameButton}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AdForm;
