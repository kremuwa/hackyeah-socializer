import styled from "styled-components";
import Twemoji from "react-twemoji";
import { Button } from "./Button";

const Wrapper = styled.div`
  align-items: stretch;
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  & img {
    height: 60vh;
    max-width: 80%;
  }
  height: 100vh;
  width: 100%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  margin-top: 10vh;
  justify-content: center;
  display: flex;
`;

export const Meeting = (props) => {
  const { gameParams = {} } = props;
  const { color, emoji } = gameParams;

  return (
    <Wrapper backgroundColor={color}>
      <Twemoji
        options={{
          folder: "svg",
          ext: ".svg",
        }}
      >
        {emoji}
      </Twemoji>
      <ButtonWrapper>
        <Button>I found my partner!</Button>
      </ButtonWrapper>
    </Wrapper>
  );
};
