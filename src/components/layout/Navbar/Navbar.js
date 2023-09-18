import React, { useEffect, useState } from 'react';
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
  FaBell,
  FaLock,
  FaUpload,
  FaBattleNet,
  FaBars,
  FaTimes,
  FaHome,
} from 'react-icons/fa';

import { IconContext } from 'react-icons';
import { useTranslation } from 'react-i18next';
import '../Header.css';
import { getIsLogged, getNotification } from '../../../store/selectors';
import { useSelector } from 'react-redux';
import UserOptions from '../UserOptions/UserOptions';
import storage from '../../../utils/storage';
import capitalizeFirstLetter from '../../../utils/capitalizeFirstLetter';
import { Link } from 'react-router-dom';
import Notifications from '../../Notifications/Notifications';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const isLogged = useSelector(getIsLogged);
  const username = storage.get('username');
  const [showNotifications, setShowNotifications] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);

  // Calcula si hay notificaciones sin leer
  const notifications = useSelector(getNotification);

  useEffect(() => {
    // Comprueba notificaciones sin leer al cargar el componente
    const hasUnreadNotifications = notifications.some(
      notification => !notification.readAt,
    );
    setHasUnreadNotifications(hasUnreadNotifications);
  }, [notifications]);

  // Agregar esta función para abrir notificaciones
  const handleNotificationsClick = () => {
    setShowMobileMenu(!showMobileMenu);
    setShowNotifications(!showNotifications);
    // Verificar notificaciones nuevamente al hacer clic
    const hasUnreadNotifications = notifications.some(
      notification => !notification.readAt,
    );
    setHasUnreadNotifications(hasUnreadNotifications);
  };

  return (
    <Container>
      <Wrapper>
        <IconContext.Provider value={{ style: { fontSize: '2em' } }}>
          <LogoContainer>
            <FaBattleNet />
            <Link to="/home">
              <p>{t('Mandalorians')}</p>
            </Link>
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
            {isLogged && (
              <p>
                {t('Welcome: ')}
                {capitalizeFirstLetter(username)}
              </p>
            )}
          </LogoContainer>

          <MobileIcon onClick={() => setShowMobileMenu(!showMobileMenu)}>
            {showMobileMenu ? <FaTimes /> : <FaBars />}
          </MobileIcon>

          <Menu open={showMobileMenu ? 1 : 0}>
            <MenuItem>
              <MenuItemLink
                to="/home"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                <div>
                  <FaHome />
                  {t('Home')}
                </div>
              </MenuItemLink>

              {isLogged && (
                <MenuItemLink
                  to="/create-ad"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <div>
                    <FaUpload />
                    {t('Upload')}
                  </div>
                </MenuItemLink>
              )}
              {isLogged && (
                <MenuItemLink onClick={handleNotificationsClick}>
                  <div>
                    <FaBell
                      style={{
                        fill: hasUnreadNotifications ? 'red' : '', // Aplica color rojo si hay notificaciones sin leer
                      }}
                    />
                  </div>
                </MenuItemLink>
              )}

              {!isLogged && (
                <MenuItemLink
                  to="/signup"
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                  <div>
                    <FaLock />
                    {t('Signup')}
                  </div>
                </MenuItemLink>
              )}

              <UserOptions />
            </MenuItem>
          </Menu>
        </IconContext.Provider>
      </Wrapper>
      {/* Renderiza el componente de notificaciones si showNotifications es true */}
      {showNotifications && <Notifications />}
    </Container>
  );
};

export default Navbar;
