import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUi } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import { resetPassword } from '../../../store/slices/auth';
import ErrorModal from '../../shared/modal/ErrorModal';
import Spinner from '../../shared/spinner/Spinner';
import Layout from '../../layout/Layout';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Form from '../../shared/form/Form';
import Button from '../../shared/Button';
import './ResetPasswordPage.css';

// Changes Password
function ResetPasswordPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, error } = useSelector(getUi);

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    dispatch(resetPassword({ email, token, newPassword: password }));
  };

  const buttonDisabled = isLoading || !password || password !== confirmPassword;

  return (
    <Layout title={t('Reset Password')}>
      <div>
        {isLoading ? (
          <Spinner message={t('Resetting password...')} />
        ) : (
          <form onSubmit={handleSubmit} className="container-reset-form">
            <Form
              classNameForm="reset-form-group"
              classNameLabel="reset-form-label"
              htmlFor="new-password"
              text={t('New password')}
              classNameInput="reset-form-input"
              inputId="new-password"
              inputType="password"
              inputName="password"
              value={password}
              handleChange={handleChangePassword}
              placeholder={t('New password')}
              required
            />

            <Form
              classNameForm="reset-form-group"
              classNameLabel="reset-form-label"
              htmlFor="confirm-password"
              text={t('Confirm password')}
              classNameInput="reset-form-input"
              inputId="confirm-password"
              inputType="password"
              inputName="confirmPassword"
              value={confirmPassword}
              handleChange={handleChangeConfirmPassword}
              placeholder={t('Confirm password')}
              required
            />

            <Button
              data-testid="button"
              type="submit"
              disabled={buttonDisabled}
            >
              {t('Submit')}
            </Button>
          </form>
        )}

        {error && (
          <ErrorModal
            title={t('Error')}
            message={error.data.error}
            onCancel={handleErrorClick}
          />
        )}
      </div>
    </Layout>
  );
}

export default ResetPasswordPage;
