import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../store";

import KeyInfo from "../../components/KeyInfo";
import { Provider } from "react-redux";
import exp from "constants";

describe("InfoKey", () => {
  it("Renders no text when no modifiers are on", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <KeyInfo
          shiftMod={false}
          ctrlMod={false}
          noteName="C"
          midi={60}
          altMod={false}
        />
      </Provider>
    );
    const note = queryByText("C");
    expect(note).not.toBeInTheDocument();
  });

  it("Renders the note name with the shift modifier On", () => {
    const { getByText } = render(
      <Provider store={store}>
        <KeyInfo
          shiftMod={true}
          ctrlMod={false}
          noteName="C"
          midi={60}
          altMod={false}
        />
      </Provider>
    );
    const note = getByText("C");
    expect(note).toBeInTheDocument();
  });

  it("Does not render the note name with the shift modifier Off", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <KeyInfo
          shiftMod={false}
          ctrlMod={false}
          noteName="C"
          midi={60}
          altMod={false}
        />
      </Provider>
    );
    const note = queryByText("C");
    expect(note).not.toBeInTheDocument();
  });

  it("Renders the midi value when the ctrlMod is On", () => {
    const { getByText } = render(
      <Provider store={store}>
        <KeyInfo
          shiftMod={false}
          ctrlMod={true}
          noteName="C"
          midi={60}
          altMod={false}
        />
      </Provider>
    );
    const midi = getByText("60");
    expect(midi).toBeInTheDocument();
  });

  it("Does not render the midi number when the ctrlMod is Off", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <KeyInfo
          shiftMod={false}
          ctrlMod={false}
          noteName="C"
          midi={60}
          altMod={false}
        />
      </Provider>
    );
    const midi = queryByText("60");
    expect(midi).not.toBeInTheDocument();
  });
});
