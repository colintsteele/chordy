import { Component, ReactNode } from "react";
import React from "react";

type ObjectiveProps = {
  name: string;
  progressed?: boolean;
  completed?: boolean;
  objectives: string[]; //TODO test and remove
};

const Objective = ({
  name,
  progressed,
  completed,
  objectives,
}: ObjectiveProps) => (
  <>
    <span style={{ color: completed ? "green" : "black" }}>{name}</span>
    <br></br>
    <span>{progressed ? "keep going!" : "Wrong!"}</span>
    <br></br>
    <span>{completed ? "TADA!" : ""}</span>
    <br></br>
    <span>{objectives}</span>
  </>
);

export default Objective;
