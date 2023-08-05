import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../store/selectors";
import { resetError, toggleModal } from "../../store/slices/ui";
import { authLogin, emailResetPassword } from "../../store/slices/auth";
import ErrorModal from "../shared/modal/ErrorModal";
import Spinner from "../shared/spinner/Spinner";
import Layout from "../layout/Layout";
import { useTranslation } from "react-i18next";
import Modal from "../shared/modal/Modal";
import { Link } from "react-router-dom";

//DONE Log in with username and password and a checkbox to give the option to persist the token, also handle errors and user feedback. When doing Login I want to send the user to the page they wanted to go to.

function LoginPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { isLoading, error, showModal } = useSelector(getUi);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const [email, setEmail] = useState("");

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const handleChange = event => {
    const { name, value, type, checked } = event.target;

    setCredentials(prevCredentials => ({
      ...prevCredentials,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async event => {
    event.preventDefault();

    dispatch(authLogin(credentials));
  };

  const handleResetPasswordLinkClick = () => {
    // Aquí disparamos la acción para enviar el correo de restablecimiento de contraseña
    dispatch(toggleModal());
  };

  // const handleLogoutClick = () => {
  //   dispatch(toggleModal());
  // };

  const handleShowModalconfirm = async event => {
    event.preventDefault();
    dispatch(emailResetPassword(email));
    dispatch(toggleModal());
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };

  const buttonDisabled =
    isLoading || !credentials.username || !credentials.password;

  return (
    <Layout title={t("Login Page")}>
      <div>
        {isLoading ? (
          <Spinner message={t("charging...")} />
        ) : (
          <form onSubmit={handleSubmit} className="container-form">
            <label className="form-label" htmlFor="username">
              {t("Username")}
            </label>
            <input
              id="username"
              className="form-input"
              type="text"
              name="username"
              onChange={handleChange}
              value={credentials.username}
              required
            />
            <label className="form-label" htmlFor="password">
              {t("Password")}
            </label>
            <input
              id="password"
              className="form-input"
              type="password"
              name="password"
              onChange={handleChange}
              value={credentials.password}
              required
            />
            <label htmlFor="rememberMe">
              {t("RememberMe")}
              <input
                id="rememberMe"
                type="checkbox"
                name="rememberMe"
                checked={credentials.rememberMe}
                onChange={handleChange}
              />
            </label>
            <button
              data-testid="button"
              type="submit"
              //variant="primary"
              width="button-form"
              disabled={buttonDisabled}>
              {t("Log in")}
            </button>
            <Link onClick={handleResetPasswordLinkClick}>
              <h4 className="navbar-h4">{t("Forgot password?")}</h4>
            </Link>
            {showModal && (
              <Modal
                title={t("Recover password")}
                message={
                  <input
                    id="reset-email"
                    className="form-input"
                    type="email"
                    name="reset-email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                }
                onConfirm={handleShowModalconfirm}
                onCancel={handleShowModalCancel}
              />
            )}
          </form>
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

export default LoginPage;
