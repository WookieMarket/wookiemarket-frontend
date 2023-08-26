import { render, screen } from '@testing-library/react';
import DeleteUserPage from '../DeleteUserPage';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import * as defaultState from '../../../../store/reducers';
import { deleteAccount } from '../../../../store/slices/auth';

jest.mock('../../../../store/slices/auth', () => ({
  __esModule: true,
  deleteAccount: jest.fn(), // Mock only the deleteAccount action
}));

console.log('mock', deleteAccount);

describe('DeleteUserPage', () => {
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
          <DeleteUserPage />
        </MemoryRouter>
      </Provider>,
    );
  };

  test('snapshot', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test('should dispatch deleteAccount action', async () => {
    const email = 'example@example.com';

    //NOTE I render the component
    renderComponent();

    const usernameEmail = screen.getByLabelText(/Enter your email/);

    const submitButton = screen.getByTestId('buttonDelete');
    expect(submitButton).toBeDisabled();

    //NOTE to launch events
    userEvent.type(usernameEmail, email);

    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);

    const modalConfirmButton = await screen.findByTestId('confirmButton');

    expect(modalConfirmButton).toBeInTheDocument();

    userEvent.click(modalConfirmButton);

    expect(deleteAccount).toHaveBeenCalledWith(email);
  });

  test('should display an error', () => {
    //NOTE // Spy on resetError function
    const resetErrorSpy = jest.spyOn(
      require('../../../../store/slices/ui'),
      'resetError',
    );

    const error = {
      data: { error: 'You do not have permissions to delete this user.' },
    };

    renderComponent(error);
    const errorElement = screen.getByText(error.data.error);

    expect(errorElement).toBeInTheDocument();
    const modalButton = screen.getByTestId('modalDelete');
    userEvent.click(modalButton);

    expect(resetErrorSpy).toHaveBeenCalled();
  });
});
