import styled from "styled-components";

const TrendWrapper = styled.div`
  position: relative;
  padding: 0 1em 0 1em;
  width: 100%;
  display: flex;
  flex-shrink: 0;
  flex-flow: row;

  @media (max-width: 1585px) {
    display: block;
  }
`;

export default TrendWrapper;
