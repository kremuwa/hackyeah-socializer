import styled from "styled-components";
import Twemoji from "react-twemoji";
import { Button } from "./Button";
import { useState, useCallback } from "react";
import { verifyCode } from "api/verifyCode";
import { toastError, toastServerError } from "helpers/toast";
import { Input } from "./Input";

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

const UserCode = styled.div`
  margin-bottom: 16px;
`;

const CodeVerificationForm = styled.form`
  z-index: 2;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  flex-direction: column;
  background-color: rgba(208, 208, 208, 0.3);
  padding: 5vh;

  ${Button} {
    margin-top: 5vh;
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
      {!isAttemptingCodeVerification && !isPartnerFound && (
        <ButtonWrapper>
          <Button onClick={() => setIsAttemptingCodeVerification(true)}>
            I found my partner!
          </Button>
        </ButtonWrapper>
      )}
      {isAttemptingCodeVerification && (
        <CodeVerificationForm onSubmit={handleSubmit}>
          <UserCode>Your code: {userCode}</UserCode>
          <Input
            value={partnerCode}
            type="text"
            placeholder="Your partner's code"
            onChange={changeInput}
          />
          <Button>Submit</Button>
        </CodeVerificationForm>
      )}
      {isPartnerFound && (
        <ButtonWrapper>
          <Button>Congrats!</Button>
        </ButtonWrapper>
      )}
    </Wrapper>
  );
};
