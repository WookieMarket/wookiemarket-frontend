import "./Header.css";
import { Link } from "react-router-dom";
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
        <h1 className="title"> {t("header")} </h1>
        <div className="icons">
          <img
            className="icon-language"
            src="/images/languageIcons/es.png"
            alt="Castellano"
            title={t("icon-hover")}
            onClick={() => i18n.changeLanguage("es")}
          />
          <img
            className="icon-language"
            src="/images/languageIcons/en.png"
            alt="Inglés"
            title={t("icon-hover")}
            onClick={() => i18n.changeLanguage("en")}
          />
        </div>
        {isLogged ? (
          <button onClick={handleLogoutClick}>Logout</button>
        ) : (
          <button as={Link} to="/login">
            Login
          </button>
        )}
      </nav>
      <hr />
      {showModal && (
        <Modal
          title="Leave session"
          message="¿You're sure? "
          onConfirm={handleShowModalconfirm}
          onCancel={handleShowModalCancel}
        />
      )}
    </header>
  );
};

export default Header;
