import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import FunctionPianoKey from "../../components/FunctionPianoKey";

describe("FunctionPianoKey", () => {
  it("changes CSS class when clicked", () => {
    const { getByTestId } = render(
      <FunctionPianoKey pressed={false} noteName="C" accidental={false} midiNumber={60} xOffset={0} showMeta={false}/>
    );
    const key = getByTestId("C:60");

    expect(key).not.toHaveClass("pressed");

    fireEvent.click(key);
  });
});
