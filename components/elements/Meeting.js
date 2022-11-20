import styled from "styled-components";
import Twemoji from "react-twemoji";
import useSound from "use-sound";
import { Button } from "./Button";
import { useState, useCallback } from "react";
import { verifyCode } from "api/verifyCode";
import { toastError, toastServerError } from "helpers/toast";
import { Input } from "./Input";
import giraffe1 from "../../public/sounds/giraffe1.mp3";
import giraffe2 from "../../public/sounds/giraffe2.mp3";

const Wrapper = styled.div`
  align-items: stretch;
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  background-color: ${(props) => props.backgroundColor};
  & img {
    height: 30vh;
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

  & > Button {
    width: 70%;
  }
`;

const CodeInput = styled(Input)`
  font-size: 0.8em;
  background: rgba(255, 255, 255, 0.5);
  /* border-radius: 8px; */
  text-shadow: -1px 1px 0 #fff, 1px 1px 0 #fff, 1px -1px 0 #fff,
    -1px -1px 0 #fff;
  border-style: inset;
  padding: 8px;
  width: 80%;
  border: none;
  border-bottom: 2px solid black;
  background: none;
  width: 80%;

  &::placeholder {
    opacity: 0.5;
  }
`;

const UserCode = styled.div`
  margin-top: 16px;
  text-shadow: -1px 1px 0 rgba(0,0,0,0.3), 1px 1px 0 rgba(0,0,0,0.3), 1px -1px 0 rgba(0,0,0,0.3),
    -1px -1px 0 rgba(0,0,0,0.3);
`;

const CodeVerificationForm = styled.form`
  z-index: 2;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  background-color: rgba(208, 208, 208, 0.3);
  margin-top: 16px;
  padding: 16px;

  ${Button} {
    margin-top: 16px;
  }
`;

export const Meeting = (props) => {
  const { gameParams = {}, userId } = props;
  const { color, emoji, userCode } = gameParams;

  const [isAttemptingCodeVerification, setIsAttemptingCodeVerification] =
    useState(false);
  const [isPartnerFound, setIsPartnerFound] = useState(false);
  const [partnerCode, setPartnerCode] = useState("");

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      verifyCode({ code: partnerCode, userId })
        .then((response) => {
          if (response.success) {
            setIsAttemptingCodeVerification(false);
            setIsPartnerFound(true);
          } else {
            toastError(
              "The entered code is incorrect. Are you sure the animal and the color are the same on both phones?"
            );
          }
        })
        .catch(toastServerError);
    },
    [partnerCode, userId]
  );

  const changeInput = useCallback((event) => {
    setPartnerCode(event.target.value.toUpperCase());
  }, []);

  const [play1] = useSound(giraffe1);
  const [play2] = useSound(giraffe2);

  return (
    <Wrapper backgroundColor={color}>
      <Twemoji
        onClick={() => (Math.random() > 0.5 ? play1() : play2)}
        options={{
          folder: "svg",
          ext: ".svg",
        }}
      >
        {emoji}
      </Twemoji>
      {!isAttemptingCodeVerification && !isPartnerFound && (
        <ButtonWrapper>
          <Button onClick={() => setIsAttemptingCodeVerification(true)}>
            I found my partner!
          </Button>
        </ButtonWrapper>
      )}
      {isAttemptingCodeVerification && (
        <>
          <UserCode>Your code: {userCode}</UserCode>
          <CodeVerificationForm onSubmit={handleSubmit}>
            <CodeInput
              value={partnerCode}
              type="text"
              placeholder="Your partner's code"
              onChange={changeInput}
              maxLength={4}
            />
            <Button>Submit</Button>
          </CodeVerificationForm>
        </>
      )}
      {isPartnerFound && (
        <ButtonWrapper>
          <Button>Congrats!</Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};
