import { act, render, screen } from "@testing-library/react";
// import NewKeys from "../../components/NewKeys";

describe("The New Keys work", () => {
  test("it works", () => {
    act(() => {
      render(
        <>
          {/* <NewKeys startingNote={41} activeKeys={[]} />
          <NewKeys startingNote={41 + 12} activeKeys={[]} /> */}
        </>
      );
    });
  });
});
