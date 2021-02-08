/**
 * IndicatorSummary.js Component
 * Functional Component that returns a summary of values for each KPI
 * of a user.
 * 
 * @public
 */

import React from "react";
import styled from "styled-components";
import Trend from "react-trend";

const IndicatorSummary = ({ values, indicator, boosts }) => {
  var numberValues = values.map((i) => Number(i));
  const avg =
    numberValues.reduce((sum, curr) => sum + curr, 0) / numberValues.length; // Adapted from Q10Viking on https://stackoverflow.com/questions/15677869/how-to-convert-a-string-of-numbers-to-an-array-of-numbers

  return (
    <Box>
      <H2 >
        {indicator}
      </H2>
      <H2>
        {avg.toFixed(2)} &empty;
        {/* // toFixed() adapted from A Kunin on stackoverflow: https://stackoverflow.com/a/12830454 */}
      </H2>
      <Trend
        smooth
        autoDraw
        autoDrawDuration={3000}
        autoDrawEasing="ease-out"
        data={numberValues}
        gradient={["#cfa62c", "#1e847f"]}
        radius={25}
        strokeWidth={3}
        strokeLinecap={"square"}
      />
      <H2>
        Questions: {numberValues.length - boosts}
      </H2>
      <H2>
        Boosts: {boosts}
      </H2>
    </Box>
  );
};

const Box = styled.div`
  position: relative;
  margin: 1em 0.2em;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  background: #2e355d;
  border: 0;
  padding: 2em;

  @media (max-width: 1335px) {
    width: 100%;
    padding: 1rem;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;

const H2 = styled.h1`
  position: relative;
  display: block;
  font-family: "Frank Ruhl Libre", serif;
  font-size: 1.5rem;
  margin: auto;
  padding: 0.5em 0;
  font-weight: 300;
  color: #e1e2e1;
  max-height: 47px;
  @media (max-width: 768px) {
    margin: 0;
    padding: 0.5em 0;
  }
`;

export default IndicatorSummary;
