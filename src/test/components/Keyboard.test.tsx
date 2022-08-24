import * as theory from "../../Theory";
import { findByText, render, screen } from "@testing-library/react";
import PianoKeys from "../../components/PianoKeys";
import Keyboard from "../../components/Keyboard";
import ObjectiveManager from "../../objectives/ObjectiveManager";
import UserEvent from "@testing-library/user-event";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
import ScaleObjective from "../../objectives/ScaleObjective";
import React from "react";
import { act, mockComponent } from "react-dom/test-utils";
import { getByLabelText, getByText, waitFor } from "@testing-library/dom";
import preview from "jest-preview";
import { debug } from "jest-preview";

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
  test("midiMessageHandler()", async () => {
    await act(async () => {
      const { container } = render(
        <Keyboard
          progressed={undefined}
          completed={false}
          activeNotes={[]}
          midiMounted={false}
        />
      );

      let mockEvent = {
        data: [144, 29, 2],
      };

      waitFor(() => {
        screen.getByText(/midiMounted/);
        mockObject.onmidimessage(mockEvent);
        let c = container.getElementsByClassName(".ReactPiano__Key--active");

        preview.debug();
      });
    });

    //await screen.findByText(/midiMounted/);

    console.log("blah");
  });
});
