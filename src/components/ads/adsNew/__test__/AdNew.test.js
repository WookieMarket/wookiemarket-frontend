import AdNew from "../AdNew";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import * as defaultState from "../../../../store/reducers";
import userEvent from "@testing-library/user-event";
import { adsCreate } from "../../../../store/slices/ads";

jest.mock("../../../../store/slices/ads", () => ({
  __esModule: true,
  adsCreate: jest.fn(), // Mock only the authLogin action
}));

describe("AdNew", () => {
  const renderComponent = () => {
    const store = {
      getState: () => {
        const state = { ...defaultState }; // Create a copy of the state

        return state;
      },
      subscribe: () => {},
      dispatch: () => {},
    };
    return render(
      <Provider store={store}>
        <MemoryRouter>
          <AdNew />
        </MemoryRouter>
      </Provider>,
    );
  };

  test("snapshot", () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  test("shoul dispatch adsCreate action", () => {
    const ad = {
      name: "mando",
      onSale: "true",
      price: "20",
      category: "imperio",
      description: "lado oscuro",
      status: "true",
      coin: "euro",
      image: null,
    };
    //NOTE renderizo el componente
    renderComponent();

    const nameInput = screen.getByLabelText(/Article/);
    const onsaleInput = screen.getByLabelText(/Sell/);
    const priceInput = screen.getByLabelText(/Price/);
    const categoryInput = screen.getByLabelText(/Category/);
    const descriptionInput = screen.getByLabelText(/Description/);
    const statusInput = screen.getByLabelText(/Status/);
    const coinInput = screen.getByLabelText(/Coin/);
    const imageInput = screen.getByLabelText(/Image/);

    const submitButton = screen.getByRole("button", { name: /Create/ });
    expect(submitButton).toBeDisabled();

    //NOTE para lanzar eventos
    userEvent.type(nameInput, ad.name);
    userEvent.type(onsaleInput, ad.onsale);
    userEvent.type(priceInput, ad.price);
    userEvent.type(categoryInput, ad.category);
    userEvent.type(descriptionInput, ad.description);
    userEvent.type(statusInput, ad.status);
    userEvent.type(coinInput, ad.coin);
    userEvent.type(imageInput, ad.image);

    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);

    expect(adsCreate).toHaveBeenCalledWith(ad);
  });
});
