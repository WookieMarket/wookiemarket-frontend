import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../../store/selectors";
import { resetError, toggleModal } from "../../../store/slices/ui";
import { authLogin, emailResetPassword } from "../../../store/slices/auth";
import ErrorModal from "../../shared/modal/ErrorModal";
import Spinner from "../../shared/spinner/Spinner";
import Layout from "../../layout/Layout";
import { useTranslation } from "react-i18next";
import Modal from "../../shared/modal/Modal";
import { Link } from "react-router-dom";
import Form from "../../shared/form/Form";

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
    dispatch(toggleModal());
  };

  const handleShowModalconfirm = async event => {
    event.preventDefault();
    dispatch(emailResetPassword(email));
    dispatch(toggleModal());
  };

  const handleShowModalCancel = () => {
    dispatch(toggleModal());
  };

  const handleChangeEmail = e => {
    setEmail(e.target.value);
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
            <Form
              classNameLabel="user-label"
              htmlFor="username"
              text={t("Username")}
              classNameInput="user-input"
              inputId="username"
              inputType="text"
              inputName="username"
              value={credentials.username}
              handleChange={handleChange}
              placeholder={t("Username")}
              required
            />

            <Form
              classNameLabel="password-label"
              htmlFor="password"
              text={t("Password")}
              classNameInput="password-input"
              inputId="password"
              inputType="password"
              inputName="password"
              value={credentials.password}
              handleChange={handleChange}
              placeholder={t("Password")}
              required
            />

            <Form
              classNameLabel="rememberMe-label"
              htmlFor="rememberMe"
              text={t("RememberMe")}
              classNameInput="password-input"
              inputId="rememberMe"
              inputType="checkbox"
              inputName="rememberMe"
              checked={credentials.rememberMe}
              handleChange={handleChange}
              required
            />

            <button
              data-testid="button"
              type="submit"
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
                  <Form
                    classNameLabel="email-label"
                    htmlFor="email-service"
                    text={t("Enter your email")}
                    classNameInput="email-input"
                    inputId="email-service"
                    inputType="email"
                    inputName="reset-email"
                    value={email}
                    handleChange={handleChangeEmail}
                    placeholder={t("Example@Example.com")}
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
