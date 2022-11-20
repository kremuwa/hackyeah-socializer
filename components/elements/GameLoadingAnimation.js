import styled, {keyframes} from "styled-components";

const rotate = keyframes`
  0% {
    transform: scale(1, 1);
  }
  50% {
    transform: scale(1.1, 1.1);
  }
  100% {
    transform: scale(1, 1);
  }
`;

export const GameLoadingAnimation = styled.div`
  padding: 3vh;
  animation: ${rotate} 2s linear infinite;
`
