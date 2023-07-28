import { render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";

import { configureStore } from "@reduxjs/toolkit";

import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import authReducer, { authLogin } from "../../../store/slices/auth";
import uiReducer, { resetError } from "../../../store/slices/ui";

jest.mock("../../../store/slices/auth");

console.log("authred", authReducer);
console.log("login", authLogin);

describe("LoginPage", () => {
  const renderComponent = (error = null) => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        ui: uiReducer, // Agrega el slice uiReducer al store
      },
      preloadedState: {
        auth: false,
        ui: { error }, // Establece el estado de error en el slice ui
      },
    });
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );
  };

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("shoul dispatch authLogin action", () => {
    const credentials = {
      username: "rober",
      password: "123",
      rememberMe: true,
    };

    //NOTE renderizo el componente
    renderComponent();

    const usernameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);
    const checkboxInput = screen.getByLabelText(/rememberMe/);
    const submitButton = screen.getByRole("button", { name: /Log in/ });

    expect(submitButton).toBeDisabled();

    //NOTE para lanzar eventos

    userEvent.type(usernameInput, credentials.username);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(checkboxInput, credentials.rememberMe);

    expect(submitButton).toBeEnabled();

    userEvent.click(submitButton);
    console.log(authLogin);
    expect(authLogin).toHaveBeenCalledWith(credentials);
  });

  test("should display an error", () => {
    const error = { message: "Unauthorized" };
    renderComponent(error);

    const errorElement = screen.getByText(error.message);
    expect(errorElement).toBeInTheDocument();

    const modalButton = screen.getByTestId("modalButton");

    userEvent.click(modalButton);

    expect(resetError).toHaveBeenCalled();
  });
});
