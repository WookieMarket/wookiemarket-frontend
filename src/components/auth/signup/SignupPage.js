import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import { authSignup } from '../../../store/slices/auth';
import ErrorModal from '../../shared/modal/ErrorModal';
import Spinner from '../../shared/spinner/Spinner';
import Layout from '../../layout/Layout';
import { useTranslation } from 'react-i18next';
import Form from '../../shared/form/Form';
import './SignupPage.css';

/**
 * This page allows user to create an account.
 * If account is successfully created a session is created
 * and user is forwarded to home page.
 */
function SignupPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
  });

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const handleChange = event => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(authSignup(userData));
  };

  const buttonDisabled =
    isLoading || !userData.username || !userData.password || !userData.email;

  return (
    <Layout title={t('Signup Page')}>
      <div>
        {isLoading ? (
          <Spinner message={t('charging...')} />
        ) : (
          <form onSubmit={handleSubmit} className="container-form">
            <Form
              classNameLabel="email-label"
              htmlFor="email"
              text={t('Email')}
              classNameInput="email-input"
              inputId="email"
              inputType="text"
              inputName="email"
              value={userData.email}
              handleChange={handleChange}
              placeholder={t('Email')}
              required
            />
            <Form
              classNameLabel="user-label"
              htmlFor="username"
              text={t('Username')}
              classNameInput="user-input"
              inputId="username"
              inputType="text"
              inputName="username"
              value={userData.username}
              handleChange={handleChange}
              placeholder={t('Username')}
              required
            />

            <Form
              classNameLabel="password-label"
              htmlFor="password"
              text={t('Password')}
              classNameInput="password-input"
              inputId="password"
              inputType="password"
              inputName="password"
              value={userData.password}
              handleChange={handleChange}
              placeholder={t('Password')}
              required
            />
            <button
              data-testid="button"
              type="submit"
              width="button-form"
              disabled={buttonDisabled}
            >
              {t('Register-button-title')}
            </button>
          </form>
        )}

        {error && (
          <ErrorModal
            title="Error"
            message={error.data.error}
            onCancel={handleErrorClick}
            testid="modalSignup"
          />
        )}
      </div>
    </Layout>
  );
}

export default SignupPage;
