/*import AdNew from "../AdNew";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import * as defaultState from "../../../../store/reducers";
import userEvent from "@testing-library/user-event";
import { adsCreate } from "../../../../store/slices/ads";

jest.mock("../../../../store/slices/ads", () => ({
  __esModule: true,
  adsCreate: jest.fn(), // Mock only the adsCreate action
}));

describe("AdNew", () => {
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
    const file = new File(["hello"], "hello.png", { type: "image/png" });

    const ad = {
      name: "mando",
      onSale: "true",
      price: "20",
      category: "imperio",
      description: "lado oscuro",
      status: "true",
      coin: "euro",
      image: file,
    };
    //NOTE I render the component
    renderComponent();

    const nameInput = screen.getByLabelText(/Article/);
    const onsaleInput = screen.getByLabelText(/Sell/);
    const priceInput = screen.getByLabelText(/Price/);
    const categoryInput = screen.getByLabelText(/Category/);
    const descriptionInput = screen.getByLabelText(/Description/);
    const statusInput = screen.getByLabelText(/Status/);
    const coinInput = screen.getByLabelText(/Coin/);
    const imageInput = screen.getByLabelText(/Image/);

    const submitButton = screen.getByTestId("buttonAdNew");
    expect(submitButton).toBeDisabled();

    //NOTE to launch events
    userEvent.type(nameInput, ad.name);
    userEvent.type(onsaleInput, ad.onSale);
    userEvent.type(priceInput, ad.price);
    userEvent.type(categoryInput, ad.category);
    userEvent.type(descriptionInput, ad.description);
    userEvent.type(statusInput, ad.status);
    userEvent.type(coinInput, ad.coin);
    userEvent.upload(imageInput, ad.image);

    expect(submitButton).toBeEnabled();
    userEvent.click(submitButton);

    expect(imageInput.files[0]).toStrictEqual(file);
    expect(imageInput.files.item(0)).toStrictEqual(file);
    expect(imageInput.files).toHaveLength(1);
    expect(adsCreate).toHaveBeenCalledWith(ad);
  });

  test("should display an error", () => {
    //NOTE // Spy on resetError function
    const resetErrorSpy = jest.spyOn(
      require("../../../../store/slices/ui"),
      "resetError",
    );

    const error = { message: "Network Error" };

    renderComponent(error);
    const errorElement = screen.getByText(error.message);

    expect(errorElement).toBeInTheDocument();
    const modalButton = screen.getByTestId("modalButton");
    userEvent.click(modalButton);

    expect(resetErrorSpy).toHaveBeenCalled();
  });
});*/
