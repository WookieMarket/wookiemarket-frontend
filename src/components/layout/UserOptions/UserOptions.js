import React, { useState } from 'react';
import {
  Container,
  DropdownMenu,
  MenuItem,
  MobileIcon,
} from './UserOptions-css';
import {
  FaExpeditedssl,
  FaPowerOff,
  FaTrashAlt,
  FaEyeSlash,
  FaUserAlt,
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
    //setToggleModal(false);
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
          {showDropdown ? <FaEyeSlash /> : <FaUserAlt />}
        </MobileIcon>
        <DropdownMenu open={showDropdown}>
          {isLogged ? (
            <MenuItem>
              <FaPowerOff />
              <button onClick={handleLogoutClick} className="navbar-list-item">
                {t('Logout')}
              </button>
            </MenuItem>
          ) : (
            <MenuItem to="/login">
              <FaExpeditedssl />
              <> {t('Login')}</>
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
