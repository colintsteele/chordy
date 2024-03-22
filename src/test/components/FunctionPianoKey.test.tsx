import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../store";

import FunctionPianoKey, {
  PianoKeyType,
} from "../../components/FunctionPianoKey";
import { Provider } from "react-redux";

describe("FunctionPianoKey", () => {
  const renderComponent = (props: PianoKeyType) => {
    return render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={props.pressed}
          noteName={props.noteName}
          accidental={props.accidental}
          midiNumber={props.midiNumber}
          xOffset={props.xOffset}
        />
      </Provider>
    );
  };

  it("Renders the key", () => {
    const { getByTestId } = renderComponent({
      pressed: false,
      noteName: "C",
      accidental: false,
      midiNumber: 60,
      xOffset: 0,
    });
    const key = getByTestId("C:60");
    expect(key).toBeInTheDocument();
  });

  it("Renders an accidental key", () => {
    let noteName = "C#";

    const { getByTestId } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName={noteName}
          accidental={true}
          midiNumber={61}
          xOffset={0}
        />
      </Provider>
    );

    const key = getByTestId("C#:61");
    expect(key).toBeInTheDocument();
  });

  it("Does not apply the offset to natural keys", () => {
    const { getByTestId } = renderComponent({
      pressed: false,
      noteName: "C",
      accidental: false,
      midiNumber: 60,
      xOffset: 1,
    });

    const key = getByTestId("C:60");
    expect(key).not.toHaveStyle("left: 1em");
  });

  it("Does apply the offset to accidental keys", () => {
    const { getByTestId } = renderComponent({
      pressed: false,
      noteName: "C#",
      accidental: true,
      midiNumber: 61,
      xOffset: 1,
    });
    const key = getByTestId("C#:61");
    expect(key).toHaveStyle("left: 1em");
  });
});
