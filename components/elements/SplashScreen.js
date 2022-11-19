import styled from "styled-components";
import { Button } from "./Button";
import { Giraffe } from "./Girrafe";

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  width: 100vw;
  height: 100vh;
  padding: 25px;
`

const ScreenTitle = styled.h1`
  font-size: 3em;
  color: darkslategray;
`

const SplashScreen = () => {
  return (
    <WrapperDiv>
      <Giraffe></Giraffe>
      <ScreenTitle>Socializer</ScreenTitle>

      <Button>Join!</Button>
    </WrapperDiv>
  );
};

export default SplashScreen;
