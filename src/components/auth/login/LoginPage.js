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
import "./LoginPage.css";
import Button from "../../shared/Button";

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
              classNameForm="form-group"
              classNameLabel="password-label"
              htmlFor="username"
              text={t("Username")}
              classNameInput="password-input"
              inputId="username"
              inputType="text"
              inputName="username"
              value={credentials.username}
              handleChange={handleChange}
              placeholder={t("Username")}
              required
            />

            <Form
              classNameForm="form-group"
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
              classNameForm="password-input-rememberme"
              htmlFor="rememberMe"
              text={t("RememberMe")}
              inputId="rememberMe"
              inputType="checkbox"
              inputName="rememberMe"
              checked={credentials.rememberMe}
              handleChange={handleChange}
              required
            />

            <Button
              //className="login-button"
              data-testid="button"
              type="submit"
              variant="accept"
              width="button-form"
              disabled={buttonDisabled}>
              {t("Log in")}
            </Button>
            <Link onClick={handleResetPasswordLinkClick}>
              <h4 className="link-reset">{t("Forgot password?")}</h4>
            </Link>
            {showModal && (
              <Modal
                title={t("Recover password")}
                message={
                  <Form
                    classNameForm="form-group"
                    classNameLabel="password-label"
                    htmlFor="email-service"
                    text={t("Enter your email")}
                    classNameInput="email-input"
                    inputId="email-service"
                    inputType="email"
                    inputName="reset-email"
                    value={email}
                    handleChange={handleChangeEmail}
                    placeholder={t("Email")}
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
