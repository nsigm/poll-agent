import styled from "styled-components";

const FormBox = styled.form`
  position: relative;
  margin: auto;
  padding: 3rem;
  width: 80%;
  margin-top: 2vh;
  display: flex;
  flex-shrink: 0;
  flex-flow: row wrap;
  background: white;
  /* From: https://boxshadows.nakulrathore.com/ */
  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
  border: 5px solid #2e355d;

  @media (max-width: 1335px) {
    width: 100%;
    padding: 2rem;
    
    &::-webkit-scrollbar {
      display: none;
    }
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

export default FormBox;
