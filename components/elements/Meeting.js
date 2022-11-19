import styled from "styled-components";
import Twemoji from "react-twemoji";

const EmojiWrapper = styled.div`
  text-align: center;
  background-color: ${(props) => props.backgroundColor};
  & img {
    width: 80%;
  }
  height: 100vh
`;

export const Meeting = (props) => {
  const { gameParams = {} } = props;
  const { color, emoji } = gameParams;

  return (
    <EmojiWrapper backgroundColor={color}>
      <Twemoji
        options={{
          folder: "svg",
          ext: ".svg",
        }}
      >
        {emoji}
      </Twemoji>
    </EmojiWrapper>
  );
};
