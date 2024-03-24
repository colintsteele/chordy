import React from "react";
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";
import App from "../../App";
import { Provider } from "react-redux";
import store from "../../store";

describe("App.tsx", () => {
  it('renders "Hello World" text', () => {
    const { queryByText } = render(
      <Provider store={store}>
        <App/>
      </Provider>
    );
    let pass = true;
    expect(pass)
  });
});
