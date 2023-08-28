import React, { useState } from 'react';
import {
  Container,
  LogoContainer,
  Wrapper,
  Menu,
  MenuItem,
  MenuItemLink,
  MobileIcon,
} from './Navbar-css';
import {
  FaBattleNet,
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaBriefcase,
  FaGlasses,
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useTranslation } from 'react-i18next';
import '../Header.css';
//import { Link, NavLink } from "react-router-dom";
import { toggleModal } from '../../../store/slices/ui';
import { authLogout } from '../../../store/slices/auth';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLogged, getUi } from '../../../store/selectors';
import Modal from '../../shared/modal/Modal';

const Navbar = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector(getUi);
  const isLogged = useSelector(getIsLogged);
  const { t, i18n } = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const onLogout = () => dispatch(authLogout());

  const handleLogoutClick = () => {
    dispatch(toggleModal());
  };

  const handleShowModalconfirm = async event => {
    onLogout();
    dispatch(toggleModal());
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };

  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: '2em' } }}>
          <LogoContainer>
            <FaBattleNet />
            <p>{t('Mandalorians')}</p>
            <img
              className="icon-language"
              src="/images/languageIcons/es.png"
              alt="ES"
              title={t('icon-hover')}
              onClick={() => i18n.changeLanguage('es')}
            />
            <img
              className="icon-language"
              src="/images/languageIcons/en.png"
              alt="EN"
              title={t('icon-hover')}
              onClick={() => i18n.changeLanguage('en')}
            />
          </LogoContainer>

          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu open={showMobileMenu}>
            <MenuItem>
              <MenuItemLink
                to="/home"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <div>
                  <FaUserAlt />
                  {t('Home')}
                </div>
              </MenuItemLink>
              <MenuItemLink
                to="/create-ad"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <div>
                  <FaBriefcase />
                  {t('Upload')}
                </div>
              </MenuItemLink>
              <MenuItemLink
                to="/signup"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <div>
                  <FaHome />
                  {t('Signup')}
                </div>
              </MenuItemLink>
              {isLogged && (
                <MenuItemLink
                  to="/user-info"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <div>
                    <FaGlasses />
                    <> {t('User info')}</>
                  </div>
                </MenuItemLink>
              )}
              {isLogged ? (
                <MenuItemLink
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <div>
                    <FaGlasses />
                    <button
                      onClick={handleLogoutClick}
                      className="navbar-list-item"
                    >
                      {t('Logout')}
                    </button>
                  </div>
                </MenuItemLink>
              ) : (
                <MenuItemLink
                  to="/login"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <div>
                    <FaGlasses />
                    <> {t('Login')}</>
                  </div>
                </MenuItemLink>
              )}
            </MenuItem>
          </Menu>
        </IconContext.Provider>
      </Wrapper>
      {showModal && (
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

export default Navbar;
