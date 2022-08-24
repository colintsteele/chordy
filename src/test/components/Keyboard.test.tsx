import { render, screen } from "@testing-library/react";
import Keyboard from "../../components/Keyboard";
import "@testing-library/jest-dom";
import { waitFor } from "@testing-library/dom";
import preview from "jest-preview";

let mockObject = { onmidimessage: ({}) => {} };
let mockObject2 = {};

beforeEach(() => {
  Object.defineProperty(navigator, "requestMIDIAccess", {
    writable: true,
    value: jest.fn().mockImplementation(async () => ({
      inputs: [mockObject, mockObject2],
    })),
  });
});

describe("Keyboard Component", () => {
  // test("midiMessageHandler()", async () => {
  //   await act(async () => {
  //     const { container } = render(
  //       <Keyboard
  //         progressed={undefined}
  //         completed={false}
  //         activeNotes={[]}
  //         midiMounted={false}
  //       />
  //     );

  //     let mockEvent = {
  //       data: [144, 29, 2], //F on
  //     };

  //     waitFor(() => {
  //       screen.getByText(/midiMounted/);
  //       mockObject.onmidimessage(mockEvent);
  //       let c = container.getElementsByClassName(".ReactPiano__Key--active");

  //       preview.debug();
  //     });
  //   });

  //   //await screen.findByText(/midiMounted/);

  //   console.log("blah");
  // });

  test("midiMessageHandler()", async () => {
    const { container } = render(
      <Keyboard
        progressed={undefined}
        completed={false}
        activeNotes={[]}
        midiMounted={false}
      />
    );

    let mockEvent = {
      data: [144, 29, 2], //F on
    };

    await waitFor(() => {
      screen.getByText(/midiMounted/);
      mockObject.onmidimessage(mockEvent);
    });

    await waitFor(() => {
      screen.getByText(/active notes include/);
      preview.debug();

      expect(screen.getByText(/active notes include/)).toBeInTheDocument();
      expect(screen.getByText(/active notes include/)).toHaveTextContent("29");
    });
  });
});
