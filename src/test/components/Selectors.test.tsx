import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import configureMockStore from "redux-mock-store";
import PianoKey, { PianoKeyType, } from "../../components/PianoKey";
import { Provider } from "react-redux";
import Selectors from "../../components/Selectors";
import objectiveSettingsSlice from "../../store/slices/objectiveSettingsSlice";
import { configureStore, createStore } from "@reduxjs/toolkit";

describe("Selectors", () => {
  const mockStore = configureMockStore();
  const reducer = { objectiveSettingsSlice: objectiveSettingsSlice };
  let realStore;

  beforeEach(() => {
    realStore = configureStore({
      reducer: {
        objectiveSettings: objectiveSettingsSlice,
      },
      preloadedState: {
        objectiveSettings: {
          selectedScales: { major: true, minor: false },
          selectedTypes: { Note: true, Scale: false, Chord: false },
        },
      },
    });
  });

  const renderComponent = () => {
    const { container } = render(
      <Provider store={realStore}>
        <Selectors/>
      </Provider>
    );

    return container;
  };

  describe('Only one Scale is selected', () => {
    it("will not allow the last scale to be unselected", () => {
      renderComponent();
      let toggle = screen.getByTestId('ScaleSwitchLabel-major-scale');

      fireEvent.click(toggle);
      let muiSwitch = screen.getByTestId('ScaleSwitch-major-scale');
      expect(muiSwitch).toHaveClass('Mui-checked');
    });

    it("will allow deselection if another scale is selected", () => {
      renderComponent();
      let minorToggle = screen.getByTestId('ScaleSwitchLabel-minor-scale');
      let majorToggle = screen.getByTestId('ScaleSwitchLabel-major-scale');
      let minorMuiSwitch = screen.getByTestId('ScaleSwitch-minor-scale');
      let majorMuiSwitch = screen.getByTestId('ScaleSwitch-major-scale');

      fireEvent.click(minorToggle);
      fireEvent.click(majorToggle);

      expect(minorMuiSwitch).toHaveClass('Mui-checked');
      expect(majorMuiSwitch).not.toHaveClass('Mui-checked');
    });
  });

  describe('Only one Objective Type is selected', () => {
    it("will not allow the last objective type to be unselected", () => {
      renderComponent();
      let toggle = screen.getByTestId('TypeSwitch-Note');

      fireEvent.click(toggle);
      let muiSwitch = screen.getByTestId('TypeSwitch-Note');
      expect(muiSwitch).toHaveClass('Mui-checked');
    });

    it("will allow deselection if another objective type is selected", () => {
      renderComponent();
      let noteToggle = screen.getByTestId('TypeSwitchLabel-Note');
      let scaleToggle = screen.getByTestId('TypeSwitchLabel-Scale');
      let noteMuiSwitch = screen.getByTestId('TypeSwitch-Note');
      let scaleMuiSwitch = screen.getByTestId('TypeSwitch-Scale');

      fireEvent.click(scaleToggle);
      fireEvent.click(noteToggle);

      expect(scaleMuiSwitch).toHaveClass('Mui-checked');
      expect(noteMuiSwitch).not.toHaveClass('Mui-checked');
    }); 
  })

});