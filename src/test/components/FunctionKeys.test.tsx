import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import FunctionPianoKey from "../../components/PianoKey";
import { testCalculateOffset } from "../../components/PianoKeyRow";

describe("FunctionPianoKey", () => {
  describe("The dreaded Offset", () => {
    it("Properly offsets for F starts", () => {
      let val = testCalculateOffset([
        5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      ]);

      expect(val[1]).toBe(2.2);
      expect(val[5]).toBe(8.2);
      expect(val[8]).toBe(14.2);
      expect(val[10]).toBe(17.2);
    });

    it("Properly offsets for E starts", () => {
      let val = testCalculateOffset([
        4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
      ]);
      expect(val[2]).toBe(5.2);
      expect(val[4]).toBe(8.2);
      expect(val[6]).toBe(11.2);
      expect(val[9]).toBe(17.2);
    });

    it("Properly offsets for Gb starts", () => {
      let val = testCalculateOffset([
        6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      ]);

      expect(val[0]).toBe(-0.7);
      expect(val[7]).toBe(11.2);
      expect(val[9]).toBe(14.2);
    });
  });
});
