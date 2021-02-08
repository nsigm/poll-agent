import styled from "styled-components";
import introSky from "../res/intro-sky.jpg";

const AppInner = styled.div`
  position: relative;
  background: #e1e2e1;
  min-height: 100%;

  @media screen and (max-width: 960px) {
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-image: url(${introSky});
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.4;
  }
`;

export default AppInner;
