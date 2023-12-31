import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import { authLogin, emailResetPassword } from '../../../store/slices/auth';
import ErrorModal from '../../shared/modal/ErrorModal';
import Spinner from '../../shared/spinner/Spinner';
import Layout from '../../layout/Layout';
import { useTranslation } from 'react-i18next';
import Modal from '../../shared/modal/Modal';
import { Link } from 'react-router-dom';
import Form from '../../shared/form/Form';
import './LoginPage.css';
import Button from '../../shared/Button';
import '../../shared/AdForm/AdForm.css';

// Log in with username and password and a checkbox to give the option to persist the token,
// also handle errors and user feedback. When doing Login I want to send the user to the page they wanted to go to.

function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const [toggleModal, setToggleModal] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(false);
  };

  const [email, setEmail] = useState('');

  const handleErrorClick = () => {
    dispatch(resetError());
    setShowModal(false);
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(authLogin(credentials));
  };

  const handleResetPasswordLinkClick = () => {
    setToggleModal(true);
  };

  const handleShowModalconfirm = async event => {
    event.preventDefault();
    dispatch(emailResetPassword(email));

    setShowModal(true);
    setToggleModal(false);
  };

  const handleShowModalCancel = () => {
    setToggleModal(false);
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const buttonDisabled =
    isLoading || !credentials.username || !credentials.password;

  return (
    <Layout title={t('Login Page')}>
      <div className="form">
        {isLoading ? (
          <Spinner message={t('charging...')} />
        ) : (
          <form onSubmit={handleSubmit} className="container-form-refactor">
            <Form
              classNameForm="form-group"
              classNameLabel="password-label"
              htmlFor="username"
              text={t('Username')}
              classNameInput="password-input"
              inputId="username"
              inputType="text"
              inputName="username"
              value={credentials.username}
              handleChange={handleChange}
              placeholder={t('Username')}
              required
            />

            <Form
              classNameForm="form-group"
              classNameLabel="password-label"
              htmlFor="password"
              text={t('Password')}
              classNameInput="password-input"
              inputId="password"
              inputType="password"
              inputName="password"
              value={credentials.password}
              handleChange={handleChange}
              placeholder={t('Password')}
              required
            />

            <Form
              classNameForm="password-input-rememberme"
              htmlFor="rememberMe"
              text={t('RememberMe')}
              inputId="rememberMe"
              inputType="checkbox"
              inputName="rememberMe"
              checked={credentials.rememberMe}
              handleChange={handleChange}
              required
            />
            <div className="button-rememberme">
              <Button
                //className="login-button"
                data-testid="button"
                type="submit"
                variant="accept"
                width="button-form"
                disabled={buttonDisabled}
              >
                {t('Log in')}
              </Button>
              <Link onClick={handleResetPasswordLinkClick}>
                <h4 className="link-reset color-blue">
                  {t('Forgot password?')}
                </h4>
              </Link>
            </div>
            {toggleModal && (
              <Modal
                title={t('Recover password')}
                message={
                  <Form
                    classNameForm="form-group"
                    classNameLabel="password-label"
                    htmlFor="email-service"
                    text={t('Enter your email')}
                    classNameInput="email-input"
                    inputId="email-service"
                    inputType="email"
                    inputName="reset-email"
                    value={email}
                    handleChange={handleChangeEmail}
                    placeholder={t('Email')}
                    required
                  />
                }
                onConfirm={handleShowModalconfirm}
                onCancel={handleShowModalCancel}
              />
            )}
          </form>
        )}

        {/* Mostrar el mensaje de error si hay un error */}
        {error && (
          <ErrorModal
            title="Error"
            message={error.data.error}
            onCancel={handleErrorClick}
            testid="modalButton"
          />
        )}

        {/* Mostrar el modal de éxito */}
        {!error && showModal && (
          <ErrorModal
            title={t('Email')}
            message={t('Email sent, check your email')}
            onCancel={handleShowModal}
            testid="showmodal"
          />
        )}
      </div>
    </Layout>
  );
}

export default LoginPage;
