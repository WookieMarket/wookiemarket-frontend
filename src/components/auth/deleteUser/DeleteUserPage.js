import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Layout from '../../layout/Layout';
import { getUi } from '../../../store/selectors';
import Spinner from '../../shared/spinner/Spinner';
import Button from '../../shared/Button';
import { deleteAccount } from '../../../store/slices/auth';
import Modal from '../../shared/modal/Modal';
import { resetError, toggleModal } from '../../../store/slices/ui';
import ErrorModal from '../../shared/modal/ErrorModal';
import './DeleteUserPage.css';
import Form from '../../shared/form/Form';

function DeleteUserPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error, showModal } = useSelector(getUi);

  const [email, setEmail] = useState('');

  const handleChangeEmail = e => {
    setEmail(e.target.value);
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const handleShowModalconfirm = async event => {
    dispatch(deleteAccount(email));
    dispatch(toggleModal());
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(toggleModal());
  };

  const buttonDisabled = isLoading || !email;

  return (
    <Layout title={t('Delete User')}>
      <>
        {isLoading ? (
          <Spinner message={t('charging...')} />
        ) : (
          <form onSubmit={handleSubmit} className="container-delete-form">
            <Form
              classNameForm="delete-form-group"
              classNameLabel="delete-form-label"
              htmlFor="delete-user"
              text={t('Enter your email')}
              classNameInput="delete-form-input"
              inputId="delete-user"
              inputType="email"
              inputName="delete-user"
              value={email}
              handleChange={handleChangeEmail}
              placeholder={t('Email')}
              required
            />

            <Button
              //className="login-button"
              data-testid="button"
              type="submit"
              variant="accept"
              width="button-form"
              disabled={buttonDisabled}
            >
              {t('Delete')}
            </Button>
          </form>
        )}
        {showModal && (
          <Modal
            title={t('Delete Account')}
            message={t('¿are you sure?')}
            onConfirm={handleShowModalconfirm}
            onCancel={handleShowModalCancel}
          />
        )}

        {error && (
          <ErrorModal
            title="Error"
            message={error.data.error}
            onCancel={handleErrorClick}
          />
        )}
      </>
    </Layout>
  );
}

export default DeleteUserPage;
