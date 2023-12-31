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
    handleButtonClick,
    nameButtonCancel,
  } = props;
  const { t } = useTranslation();

  return (
    <>
      <form onSubmit={handleSubmit} className="container-form-creation-buy">
        <Form
          classNameForm="form-group-creation-buy"
          classNameLabel="password-label-creation-buy"
          htmlFor="email-buy"
          text={t('Buy')}
          classNameInput="password-input-creation-buy"
          inputId="email-buy"
          inputType="text"
          inputName="email"
          value={valueInputEmail}
          handleChange={handleChange}
          placeholder={t('Write a message')}
        />
        <div className="container-button">
          <Button
            id="adformbuycancel"
            data-testid={testid}
            type="button"
            variant="decline"
            width="button-form"
            onClick={handleButtonClick}
          >
            {nameButtonCancel}
          </Button>
          <Button
            id="adformbuy"
            data-testid={testid}
            type="submit"
            variant="accept"
            width="button-form"
            disabled={buttonDisabled}
          >
            {nameButton}
          </Button>
        </div>
      </form>
    </>
  );
}

export default AdFormBuy;
