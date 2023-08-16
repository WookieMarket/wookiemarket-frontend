import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../shared/modal/Modal";
import { getIsLogged, getUi } from "../../store/selectors";
import { toggleModal } from "../../store/slices/ui";
import { authLogout } from "../../store/slices/auth";
import { useTranslation } from "react-i18next";

const Header = (...rest) => {
  const { t, i18n } = useTranslation();
  const isLogged = useSelector(getIsLogged);
  const dispatch = useDispatch();
  const { showModal } = useSelector(getUi);

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
    <header className="header">
      <nav className="navbar">
        <div className="icons">
          <Link to="/">
            <h1 className="title"> {t("header")} </h1>
          </Link>
          <img
            className="icon-language"
            src="/images/languageIcons/es.png"
            alt="ES"
            title={t("icon-hover")}
            onClick={() => i18n.changeLanguage("es")}
          />
          <img
            className="icon-language"
            src="/images/languageIcons/en.png"
            alt="EN"
            title={t("icon-hover")}
            onClick={() => i18n.changeLanguage("en")}
          />
        </div>
        <ul>
          <li>
            <NavLink className="navbar-list-item" to="/create-ad">
              {t("Upload ad")}
            </NavLink>
            {isLogged ? (
              <button onClick={handleLogoutClick} className="navbar-list-item">
                {t("Logout")}
              </button>
            ) : (
              <NavLink className="navbar-list-item" to="/login">
                {t("Login")}
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
      <hr />
      {showModal && (
        <Modal
          title={t("Leave session")}
          message={t("¿are you sure?")}
          onConfirm={handleShowModalconfirm}
          onCancel={handleShowModalCancel}
        />
      )}
    </header>
  );
};

export default Header;
