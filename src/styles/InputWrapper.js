import styled from "styled-components";

const InputWrapper = styled.div`
  margin-right: 15px;
  width: calc(50% - 15px);
  color: black;
  .input-field {
    margin-top: 50px !important;

    .picker {
      &__container__wrapper {
        background-color: #f1ebe4
      }
      &__input {
        font-size: 1.3rem;
        margin: 0;
      }
      &__date-display {
        background-color: #2e355d !important;
      }
      &__input
    }
    span {
      font-size: 1.1rem;
    }
  }

  .input-field.col label {
    left: 0 !important;
    top: 0 !important;
    font-size: 1.3rem;
    &::before {
      top: -15px;
    }
  }

  .select-dropdown {
    font-size: 1.3rem !important;
    margin: 0 !important;
  }
`;

export default InputWrapper;
