import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../store";

import KeyInfo from "../../components/KeyInfo";
import { Provider } from "react-redux";
import exp from "constants";

describe("InfoKey", () => {
  const mockStore = configureMockStore();

  let noteName = "C";
  let midiNumber = 48;

  const renderKey = () => {
    const { queryByText } = render(
      <Provider store={store}>
        <KeyInfo noteName={noteName} midi={midiNumber} />
      </Provider>
    );

    return queryByText;
  }

  it("Renders only the mapped key when no modifiers are on", () => {
    let query = renderKey();
    const note = query("k")
    expect(note).toBeInTheDocument();
  });

  it("Renders the note name with the shift modifier On", () => {
    const { getByText } = render(
      <Provider store={store}>
        <KeyInfo noteName="C" midi={60} />
      </Provider>
    );
    const note = getByText("C");
    expect(note).toBeInTheDocument();
  });

  it("Does not render the note name with the shift modifier Off", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <KeyInfo noteName="C" midi={60} />
      </Provider>
    );
    const note = queryByText("C");
    expect(note).not.toBeInTheDocument();
  });

  it("Renders the midi value when the ctrlMod is On", () => {
    const { getByText } = render(
      <Provider store={store}>
        <KeyInfo noteName="C" midi={60} />
      </Provider>
    );
    const midi = getByText("60");
    expect(midi).toBeInTheDocument();
  });

  it("Does not render the midi number when the ctrlMod is Off", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <KeyInfo noteName="C" midi={60} />
      </Provider>
    );
    const midi = queryByText("60");
    expect(midi).not.toBeInTheDocument();
  });
});

function configureMockStore() {
  throw new Error("Function not implemented.");
}