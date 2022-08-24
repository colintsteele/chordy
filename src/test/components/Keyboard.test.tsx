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
  describe("midiMessageHandler()", () => {
    beforeEach(() => {
      render(
        <Keyboard
          progressed={undefined}
          completed={false}
          activeNotes={[]}
          midiMounted={false}
        />
      );
    });

    let mockCPress = {
      data: [144, 24, 2],
    };
    let mockCLift = {
      data: [0, 24, 2],
    };
    let mockDPress = {
      data: [144, 26, 2],
    };
    let mockDLift = {
      data: [0, 26, 2],
    };

    test("registers multiple midi keypresses", async () => {
      await waitFor(() => {
        screen.getByText(/midiMounted/);
        mockObject.onmidimessage(mockCPress);
      });
      await waitFor(() => {
        screen.getByText(/active notes include/);
        mockObject.onmidimessage(mockDPress);
      });
      await waitFor(() => {
        screen.getByText(/pressed26/);
      });

      expect(screen.getByText(/active notes include/)).toBeInTheDocument();
      expect(screen.getByText(/active notes include/)).toHaveTextContent(
        "24,26"
      );
    });

    test("lifting a note lifts only that note", async () => {
      await waitFor(() => {
        screen.getByText(/midiMounted/);
        mockObject.onmidimessage(mockCPress);
      });
      await waitFor(() => {
        screen.getByText(/pressed24/);
        mockObject.onmidimessage(mockDPress);
      });
      await waitFor(() => {
        screen.getByText(/pressed26/);
        mockObject.onmidimessage(mockCLift);
      });

      await waitFor(() => {
        screen.getByText(/lifted/);
      });

      let notesElement = screen.getByText(/active notes include/);
      expect(notesElement).toBeInTheDocument();
      expect(notesElement).toHaveTextContent("26");
      expect(notesElement).not.toHaveTextContent("24");
    });
  });
});
