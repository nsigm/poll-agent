import styled from "styled-components";


const InputStyled = styled.input`
  height: 3.3rem !important;
  font-size: 1.3rem !important;
  border-bottom: 2px solid #6c6c6c !important;
  margin: 2px !important;

  &:focus {
    border-bottom: 2px solid #1e847f !important;
    box-shadow: 0 2px 0 0 #1e847f !important;
  }
`;

export default InputStyled;
