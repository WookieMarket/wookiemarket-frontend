import { render, screen } from "@testing-library/react";
import LoginPage from "../LoginPage";
import userEvent from "@testing-library/user-event";
import { authLogin } from "../../../../store/slices/auth";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import * as defaultState from "../../../../store/reducers";

jest.mock("../../../../store/slices/auth", () => ({
  __esModule: true,
  authLogin: jest.fn(), // Mock only the authLogin action
}));

describe("LoginPage", () => {
  const renderComponent = (error = null) => {
    const store = {
      getState: () => {
        const state = { ...defaultState }; // Create a copy of the state
        state.ui.error = error; // Modify the copy instead of the original state

        return state;
      },
      subscribe: () => {},
      dispatch: () => {},
    };
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
    const checkboxInput = screen.getByLabelText(/RememberMe/);
    const submitButton = screen.getByRole("button", { name: /Log in/ });
    expect(submitButton).toBeDisabled();

    //NOTE para lanzar eventos
    userEvent.type(usernameInput, credentials.username);
    userEvent.type(passwordInput, credentials.password);
    userEvent.click(checkboxInput, credentials.rememberMe);

    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);

    expect(authLogin).toHaveBeenCalledWith(credentials);
  });
  test("should display an error", () => {
    //NOTE // Spy on resetError function
    const resetErrorSpy = jest.spyOn(
      require("../../../../store/slices/ui"),
      "resetError",
    );

    const error = { message: "Unauthorized" };

    renderComponent(error);
    const errorElement = screen.getByText(error.message);

    expect(errorElement).toBeInTheDocument();
    const modalButton = screen.getByTestId("modalButton");
    userEvent.click(modalButton);

    expect(resetErrorSpy).toHaveBeenCalled();
  });
});
