import "./Header.css";
import { useTranslation } from "react-i18next";

const Header = (...rest) => {
  const { t, i18n } = useTranslation();

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
      </nav>
      <hr />
    </header>
  );
};

export default Header;
