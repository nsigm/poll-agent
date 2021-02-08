
import styled from "styled-components";

const DataBox = styled.div`
  position: relative;
  margin: auto;
  padding: 1rem;
  width: 28%;
  display: flex;
  flex-shrink: 0;
  flex-flow: row wrap;
  background: #2e355d;
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);

  @media (max-width: 1335px) {
    width: 95%;
    padding: 2em;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 1em 0 0 0;
  }
`;

export default DataBox;
