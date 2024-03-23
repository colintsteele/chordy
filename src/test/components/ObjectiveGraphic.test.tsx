import * as theory from "../../Theory";
import { act } from "@testing-library/react";
import Objective from "../../components/Objective";
import ObjectiveGraphic from "../../components/ObjectiveGraphic";
import NoteObjective from "../../objectives/NoteObjective";
import { render, unmountComponentAtNode } from "react-dom";

// describe("top()", () => {
//   let note = theory.note("C", 4);
//   let objective = new NoteObjective(note);

//   let container: HTMLElement;
//   beforeEach(() => {
//     container = document.createElement("div");
//     document.body.appendChild(container);
//   });

//   afterEach(() => {
//     unmountComponentAtNode(container);
//     container.remove();
//   });

// //   test("e4 is 28", () => {
// //     act(() => {
// //       render(<ObjectiveGraphic name={"E4"} />, container);
// //       expect(container.textContent).toBe("28")
// //     });
// //   });

// //   test("e5 is 0", () => {
// //     act(() => {
// //       render(<ObjectiveGraphic name={"E5"} />, container);
// //       expect(container.textContent).toBe("0")
// //     });
// //   });
  
// // //   test("f4 is 24", () => {
// // //     act(() => {
// // //       render(<ObjectiveGraphic name={"F4"} />, container);
// // //       expect(container.textContent).toBe("28")
// // //     });
// // //   });

// //   test("f5 is -4", () => {
// //     act(() => {
// //       render(<ObjectiveGraphic name={"F5"} />, container);
// //       expect(container.textContent).toBe("-4")
// //     });
// //   });
// });
