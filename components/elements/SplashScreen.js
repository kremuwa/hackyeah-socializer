import styled from "styled-components";
import { Button } from "./Button";

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100vw;
  height: 100vh;
  padding: 25px;
`

const SplashScreen = () => {
  return (
    <WrapperDiv>
      <h1>Socializer</h1>

      <Button>Join!</Button>
    </WrapperDiv>
  );
};

export default SplashScreen;
