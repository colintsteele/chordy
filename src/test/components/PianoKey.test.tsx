import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import PianoKey, { PianoKeyType, } from "../../components/PianoKey";
import { Provider } from "react-redux";

jest.mock('../../components/KeyLabels', () => {
  return () => <div>Mocked KeyInfo</div>;
});
const mockStore = configureMockStore();
let store;
let container;

describe("FunctionPianoKey", () => {
  beforeEach(() => {
    store = mockStore({
      keyPresser: {
        notesPressed: {},
      },
    });
  });

  const renderComponent = (props: PianoKeyType) => {
    const { container, rerender } = render(
      <Provider store={store}>
        <PianoKey
          noteName={props.noteName}
          accidental={props.accidental}
          midiNumber={props.midiNumber}
          xOffset={props.xOffset}
        />
      </Provider>
    );

    return container;
  };

  // test mouseUp and mouseDown
  // test pressed class from being pressed from the useSelector
  describe("Clicking", () => {
    
  });

  describe("Rendering", () => {
    describe("Key is a natural", () => {
      beforeEach(() => {
        container = renderComponent({
          accidental: false,
          midiNumber: 48,
          noteName: "C",
          xOffset: 1,
        });
      });

      it("should not have an offset", () => {
        const key = container.querySelector(".FunctionKey");
        expect(key).not.toHaveAttribute("left", expect.stringMatching(/left:/));
      });

      it("should have the correct class name", () => {
        const key = container.querySelector(".FunctionKey");
        expect(key).toHaveClass("FunctionKey Natural C Natural");
      });

      it("should dispatch pressNote when mouseDown", () => {
        const key = container.querySelector(".FunctionKey");

        key.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
        let actions = store.getActions()[0];

        expect(actions.type).toBe("pressNote");
        expect(actions.payload).toBe(48);
      });

      it("should dispatch liftNote when mouseUp", () => {
        const key = container.querySelector(".FunctionKey");

        key.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
        let actions = store.getActions()[0];

        expect(actions.type).toBe("pressedNotes/liftNote");
        expect(actions.payload).toBe(48);
      });
    });

    describe("Key is an accidental", () => {
      beforeEach(() => {
        container = renderComponent({
          accidental: true,
          midiNumber: 48,
          noteName: "C#",
          xOffset: 1,
        });
      });

      it("should have an offset", () => {
        const key = container.querySelector(".FunctionKey");
        expect(key).toHaveStyle("left: 1em");
      });

      it("should have the correct class name", () => {
        const key = container.querySelector(".FunctionKey");
        expect(key).toHaveClass("FunctionKey Accidental C# Accidental");
      });
    });
  });
});
