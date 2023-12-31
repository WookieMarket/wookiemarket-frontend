import React, { useState } from 'react';
import {
  Container,
  DropdownMenu,
  MenuItem,
  MobileIcon,
} from './UserOptions-css';
import {
  FaPen,
  FaBookmark,
  FaUnlockAlt,
  FaPowerOff,
  FaTrashAlt,
  FaEyeSlash,
  FaUserAlt,
  FaListAlt,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useTranslation } from 'react-i18next';
import '../Header.css';
import { getIsLogged } from '../../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '../../shared/modal/Modal';
import { authLogout } from '../../../store/slices/auth';

const UserOptions = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector(getIsLogged);
  const { t } = useTranslation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [toggleModal, setToggleModal] = useState(false);

  const onLogout = () => dispatch(authLogout());

  const handleLogoutClick = () => {
    setToggleModal(true);
  };

  const handleShowModalconfirm = async event => {
    onLogout();
  };

  const handleShowModalCancel = () => {
    setToggleModal(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Container>
      <IconContext.Provider value={{ style: { fontSize: '1.7em' } }}>
        <MobileIcon onClick={toggleDropdown}>
          {showDropdown ? <FaEyeSlash size={30} /> : <FaUserAlt size={30} />}
        </MobileIcon>
        <DropdownMenu open={showDropdown}>
          {isLogged ? (
            <MenuItem>
              <FaPowerOff />
              <span href="none" onClick={handleLogoutClick} className="">
                {t('Logout')}
              </span>
            </MenuItem>
          ) : (
            <MenuItem to="/login">
              <FaUnlockAlt />
              <> {t('Login')}</>
            </MenuItem>
          )}

          {isLogged && (
            <MenuItem to={`/myads`}>
              <FaListAlt />
              {t('My Ads')}
            </MenuItem>
          )}

          {isLogged && (
            <MenuItem to={'/favorite'}>
              <FaBookmark />
              {t('My favourites')}
            </MenuItem>
          )}

          {isLogged && (
            <MenuItem to="/user-info">
              <FaPen />
              {t('User info')}
            </MenuItem>
          )}

          {isLogged && (
            <MenuItem to="/delete-account">
              <FaTrashAlt />
              {t('Delete Account')}
            </MenuItem>
          )}
        </DropdownMenu>
      </IconContext.Provider>
      {toggleModal && (
        <Modal
          title={t('Leave session')}
          message={t('¿are you sure?')}
          onConfirm={handleShowModalconfirm}
          onCancel={handleShowModalCancel}
        />
      )}
    </Container>
  );
};

export default UserOptions;
