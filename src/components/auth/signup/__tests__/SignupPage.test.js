import { render, screen } from '@testing-library/react';
import SignupPage from '../SignupPage';
import userEvent from '@testing-library/user-event';
import { authSignup } from '../../../../store/slices/auth';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import * as defaultState from '../../../../store/reducers';

jest.mock('../../../../store/slices/auth', () => ({
  __esModule: true,
  authSignup: jest.fn(),
}));

describe('Signup', () => {
  const renderComponent = (error = null) => {
    const store = {
      getState: () => {
        const state = { ...defaultState };
        state.ui.error = error;
        return state;
      },
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <SignupPage />
        </MemoryRouter>
      </Provider>,
    );
  };

  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch signup action', () => {
    const userData = {
      username: 'user123',
      password: 'supersegurisimo',
      email: 'user123@test.com',
    };

    // Render component
    renderComponent();

    // Test UI components
    const usernameInput = screen.getByLabelText(/Username/);
    const passwordInput = screen.getByLabelText(/Password/);
    const emailInput = screen.getByLabelText(/Email/);
    const submitButton = screen.getByRole('button', { name: /Register/ });
    expect(submitButton).toBeDisabled();

    // Test button after fulfilling text fields
    userEvent.type(usernameInput, userData.username);
    userEvent.type(passwordInput, userData.password);
    userEvent.type(emailInput, userData.email);
    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);

    expect(authSignup).toHaveBeenCalledWith(userData);
  });

  test('should display an error', () => {
    const resetErrorSpy = jest.spyOn(
      require('../../../../store/slices/ui'),
      'resetError',
    );

    const email = 'example@example.com';
    const error = {
      data: { error: `Email: ${email} is already registered!` },
    };

    renderComponent(error);
    const errorElement = screen.getByText(error.data.error);

    expect(errorElement).toBeInTheDocument();
    const modalButton = screen.getByTestId('modalSignup');
    userEvent.click(modalButton);

    expect(resetErrorSpy).toHaveBeenCalled();
  });
});
