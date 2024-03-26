import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom/extend-expect";
import KeyLabels from "../../components/KeyLabels";

const mockStore = configureMockStore();
let store;
let noteName: string;
let midiNumber: number;

describe("KeyLabels", () => {
  beforeEach(() => {
    noteName = "C";
    midiNumber = 48;
    store = mockStore({
      keyboardKeypress: {
        keysPressed: {},
      },
    });
  });

  const renderInfoKey = () => {
    const { queryByText } = render(
      <Provider store={store}>
        <KeyLabels noteName={noteName} midi={midiNumber} />
      </Provider>
    );

    return queryByText;
  };

  it("Renders only the mapped key when no modifiers are on", () => {
    let query = renderInfoKey();
    const note = query("k");
    const noteName = query("C");
    const midi = query(48);

    expect(note).toBeInTheDocument();
    expect(noteName).not.toBeInTheDocument();
    expect(midi).not.toBeInTheDocument();
  });

  describe("When shift mod is on", () => {
    beforeEach(() => {
      store = mockStore({
        keyboardKeypress: {
          keysPressed: { Shift: true },
        },
      });
    });

    it("Does not render the mapped key when the shift mod is on", () => {
      let query = renderInfoKey();
      const note = query("k");
      expect(note).not.toBeInTheDocument();
    });

    it("Renders the note name with the shift mod on", () => {
      let query = renderInfoKey();
      const note = query("C");
      expect(note).toBeInTheDocument();
    });
  });

  describe("When ctrl mod is on", () => {
    beforeEach(() => {
      store = mockStore({
        keyboardKeypress: {
          keysPressed: { Control: true },
        },
      });
    });

    it("Does not render the mapped key when the ctrl mod is on", () => {
      let query = renderInfoKey();
      const note = query("k");
      expect(note).not.toBeInTheDocument();
    });

    it("Renders the midi number when the ctrl mod is on", () => {
      let query = renderInfoKey();
      const midi = query(48);
      expect(midi).toBeInTheDocument();
    });
  });
});
