import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getUi, getUserInfo } from '../../../store/selectors';
import { resetError, toggleModal } from '../../../store/slices/ui';
import { authUserInfo, editUserInfo } from '../../../store/slices/user';
import storage from '../../../utils/storage';
import Layout from '../../layout/Layout';
import Form from '../../shared/form/Form';
import ErrorModal from '../../shared/modal/ErrorModal';
import Modal from '../../shared/modal/Modal';
import Spinner from '../../shared/spinner/Spinner';
import './UserInfo.css';

/**
 * This page allows user to create an account.
 * If account is successfully created a session is created
 * and user is forwarded to home page.
 */
function UserInfo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const userInfo = useSelector(getUserInfo);
  const { showModal } = useSelector(getUi);

  const [userData, setUserData] = useState({
    email: '',
    username: '',
    password: '',
    newPassword: '',
  });
  const userJwt = storage.get('auth');
  const userId = jwt_decode(userJwt)._id;

  const handleShowModalconfirm = async event => {
    dispatch(toggleModal());
    dispatch(editUserInfo(userData)).catch(error => console.log(error));
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };
  // get user info
  useEffect(() => {
    dispatch(authUserInfo(userId)).catch(error => console.log(error));
  }, [dispatch, userId]);

  useEffect(() => {
    if (userInfo) {
      setUserData({ email: userInfo.email, username: userInfo.username });
    }
  }, [dispatch, userInfo]);

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
    dispatch(toggleModal());
  };

  const buttonDisabled = isLoading || !userData.username || !userData.email;

  return (
    <Layout title={t('User info')}>
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
            <Form
              classNameLabel="password-new"
              htmlFor="newPassword"
              text={t('New password')}
              classNameInput="newPassword-input"
              inputId="newPassword"
              inputType="password"
              inputName="newPassword"
              value={userData.newPassword}
              handleChange={handleChange}
              placeholder={t('New password')}
              required
            />
            <button
              data-testid="button"
              type="submit"
              width="button-form"
              disabled={buttonDisabled}
            >
              {t('Actualizar')}
            </button>
          </form>
        )}
        {showModal && (
          <Modal
            title={t('update user info')}
            message={t('¿are you sure?')}
            onConfirm={handleShowModalconfirm}
            onCancel={handleShowModalCancel}
          />
        )}
        {error && (
          <ErrorModal
            title="Error"
            message={error.message}
            onCancel={handleErrorClick}
          />
        )}
      </div>
    </Layout>
  );
}

export default UserInfo;
