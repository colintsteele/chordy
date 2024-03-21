import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import store from "../../store";

import FunctionPianoKey from "../../components/FunctionPianoKey";
import { Provider } from "react-redux";
import exp from "constants";

describe("FunctionPianoKey", () => {
  it("Renders the key", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C"
          accidental={false}
          midiNumber={60}
          xOffset={0}
        />
      </Provider>
    );
    const key = getByTestId("C:60");
    expect(key).toBeInTheDocument();
  });

  it("renders an accidental key", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C#"
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
    const { getByTestId } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C"
          accidental={false}
          midiNumber={60}
          xOffset={1}
        />
      </Provider>
    );
    const key = getByTestId("C:60");
    expect(key).not.toHaveStyle("left: 1em");
  });

  it("does apply the offset to accidental keys", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C#"
          accidental={true}
          midiNumber={61}
          xOffset={1}
        />
      </Provider>
    );
    const key = getByTestId("C#:61");
    expect(key).toHaveStyle("left: 1em");
  });

  it("shows the midi number when showMeta is true", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C"
          accidental={false}
          midiNumber={60}
          xOffset={0}
        />
      </Provider>
    );
    const midiNumber = getByText("60");
    expect(midiNumber).toBeInTheDocument();
  });

  it("shows the note name when showMeta is true", () => {
    const { getByText } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C"
          accidental={false}
          midiNumber={60}
          xOffset={0}
        />
      </Provider>
    );
    const noteName = getByText("C");
    expect(noteName).toBeInTheDocument();
  });

  it("does not show the midi number when showMeta is false", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C"
          accidental={false}
          midiNumber={60}
          xOffset={0}
        />
      </Provider>
    );
    const midiNumber = queryByText("60");
    expect(midiNumber).not.toBeInTheDocument();
  });

  it("does not show the note name when showMeta is false", () => {
    const { queryByText } = render(
      <Provider store={store}>
        <FunctionPianoKey
          pressed={false}
          noteName="C"
          accidental={false}
          midiNumber={60}
          xOffset={0}
        />
      </Provider>
    );
    const noteName = queryByText("C");
    expect(noteName).not.toBeInTheDocument();
  })
});
