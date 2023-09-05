import jwt_decode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { getJwt, getUi, getUserInfo } from '../../../store/selectors';
import { resetError } from '../../../store/slices/ui';
import { authUserInfo, editUserInfo } from '../../../store/slices/user';
import storage from '../../../utils/storage';
import Layout from '../../layout/Layout';
import Form from '../../shared/form/Form';
import ErrorModal from '../../shared/modal/ErrorModal';
import Modal from '../../shared/modal/Modal';
import Spinner from '../../shared/spinner/Spinner';
import './UserInfo.css';

function UserInfo() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const jwt = useSelector(getJwt);
  const userInfo = useSelector(getUserInfo);
  const [toggleModal, setToggleModal] = useState(false);

  //cambie esto
  const [userData, setUserData] = useState({
    email: userInfo?.email || '',
    username: userInfo?.username || '',
  });

  const userDataModify = {
    email: userData.email,
    username: userData.username,
    password: userData.password,
    newPassword: userData.newPassword,
  };

  const userJwt = jwt || storage.get('auth');
  const userId = jwt_decode(userJwt)._id;

  const handleShowModalconfirm = async event => {
    setToggleModal(false);
    dispatch(editUserInfo(userDataModify)).catch(error => console.log(error));
  };

  const handleShowModalCancel = () => {
    setToggleModal(false);
  };

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const handleChange = event => {
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(authUserInfo(userId));
    setToggleModal(true);
  };

  // Only run if userInfo.email and userInfo.username have values
  useEffect(() => {
    if (userInfo?.email && userInfo?.username) {
      setUserData({
        email: userInfo.email,
        username: userInfo.username,
      });
    }
  }, [userInfo]);
  // get user info
  useEffect(() => {
    dispatch(authUserInfo(userId)).catch(error => console.log(error));
  }, [dispatch, userId]);

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
        {toggleModal && (
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
