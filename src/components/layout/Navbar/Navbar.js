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
} from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { useTranslation } from 'react-i18next';
import '../Header.css';

import UserOptions from '../UserOptions/UserOptions';

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

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

              <UserOptions />
            </MenuItem>
          </Menu>
        </IconContext.Provider>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
