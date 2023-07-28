import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUi } from "../../store/selectors";
import { resetError } from "../../store/slices/ui";
import { authLogin } from "../../store/slices/auth";
import ErrorModal from "../shared/modal/ErrorModal";
import Spinner from "../shared/spinner/Spinner";
import Layout from "../layout/Layout";

//DONE Log in with username and password and a checkbox to give the option to persist the token, also handle errors and user feedback. When doing Login I want to send the user to the page they wanted to go to.

function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

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

  const buttonDisabled =
    isLoading || !credentials.username || !credentials.password;

  return (
    <Layout title="Login Page">
      <div>
        {isLoading ? (
          <Spinner message="cargando..." />
        ) : (
          <form onSubmit={handleSubmit} className="container-form">
            <label className="form-label" htmlFor="username">
              Username
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
              Password
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
              rememberMe
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
              Log in
            </button>
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
