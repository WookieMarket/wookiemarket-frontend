import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../../store/selectors";
import { resetError } from "../../../store/slices/ui";
import { resetPassword } from "../../../store/slices/auth";
import ErrorModal from "../../shared/modal/ErrorModal";
import Spinner from "../../shared/spinner/Spinner";
import Layout from "../../layout/Layout";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

//DONE change Password
function ResetPasswordPage() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isLoading, error } = useSelector(getUi);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleErrorClick = () => {
    dispatch(resetError());
  };

  const handleChangePassword = event => {
    setPassword(event.target.value);
  };

  const handleChangeConfirmPassword = event => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    dispatch(resetPassword({ email, token, newPassword: password }));
  };

  const buttonDisabled = isLoading || !password || password !== confirmPassword;

  return (
    <Layout title={t("Reset Password")}>
      <div>
        {isLoading ? (
          <Spinner message={t("Resetting password...")} />
        ) : (
          <form onSubmit={handleSubmit} className="container-form">
            <label className="form-label" htmlFor="password">
              {t("New Password")}
            </label>
            <input
              id="password"
              className="form-input"
              type="password"
              name="password"
              onChange={handleChangePassword}
              value={password}
              required
            />
            <label className="form-label" htmlFor="confirmPassword">
              {t("Confirm Password")}
            </label>
            <input
              id="confirmPassword"
              className="form-input"
              type="password"
              name="confirmPassword"
              onChange={handleChangeConfirmPassword}
              value={confirmPassword}
              required
            />
            <button
              data-testid="button"
              type="submit"
              disabled={buttonDisabled}>
              {t("Submit")}
            </button>
          </form>
        )}

        {error && (
          <ErrorModal
            title={t("Error")}
            message={error.message}
            onCancel={handleErrorClick}
          />
        )}
      </div>
    </Layout>
  );
}

export default ResetPasswordPage;
