import styled from "styled-components";

const ButtonStyled = styled.button`
  margin: 10px;
  padding: 0 2em;
  font-size: 1.2rem;
  border-radius: 5px;
  background: #2e355d !important;
  color: #f1ebe4;
  /* From: https://boxshadows.nakulrathore.com/ */
  box-shadow: 0 6px 6px rgba(10, 16, 20, 0.15), 0 0 52px rgba(10, 16, 20, 0.12);
  border: 0;

  &:hover {
    background: #1e847f !important;
    color: #f1ebe4 !important;
  }

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1em;
    margin: 5px;
  }
`;

export default ButtonStyled;
