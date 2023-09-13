import { useTranslation } from 'react-i18next';
import Form from '../form/Form';
import Button from '../Button';
import './AdFormBuy.css';

function AdFormBuy(props) {
  const {
    handleSubmit,
    handleChange,
    valueInputEmail,
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
          htmlFor="email-buy"
          text={t('Buy')}
          classNameInput="password-input-creation"
          inputId="email-buy"
          inputType="text"
          inputName="email"
          value={valueInputEmail}
          handleChange={handleChange}
          placeholder={t('Write a message')}
        />

        <Button
          data-testid={testid}
          type="submit"
          variant="accept"
          width="button-form"
          disabled={buttonDisabled}
        >
          {nameButton}
        </Button>
      </form>
    </>
  );
}

export default AdFormBuy;
