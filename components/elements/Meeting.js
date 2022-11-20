import styled from "styled-components";
import Twemoji from "react-twemoji";
import useSound from "use-sound";
import { Button } from "./Button";
import { useState, useCallback } from "react";
import { verifyCode } from "api/verifyCode";
import { toastError, toastServerError } from "helpers/toast";
import { Input } from "./Input";
import NextLink from "next/link";

import dynamic from "next/dynamic"
import {getAnimalSound} from "../../helpers/sounds";


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
  margin-top: 2vh;
  justify-content: center;
  display: flex;

  & > Button {
    width: 80%;
  }
`;

const CongratsWrapper = styled.div`
  flex-direction: column;
  text-align: center;
  justify-content: center;
  display: flex;
  height: 100%;
  align-items: center;
  
  img{
    max-height: 260px;
    width: auto;
    margin: 2rem;
  }

  & > Button {
    width: 80%;
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
  text-align: center;

  &::placeholder {
    opacity: 0.5;
  }
`;

const UserCode = styled.div`
  margin-top: 16px;
  text-shadow: -1px 1px 0 rgba(0, 0, 0, 0.3), 1px 1px 0 rgba(0, 0, 0, 0.3),
    1px -1px 0 rgba(0, 0, 0, 0.3), -1px -1px 0 rgba(0, 0, 0, 0.3);
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

const ChatNoSSR = dynamic(() => import("../elements/ChatComponent"), {
  ssr: false,
});

export const Meeting = (props) => {
  const { gameParams = {}, userId, isFinished } = props;
  const { color, emoji, userCode, duration } = gameParams;
  const [isAttemptingCodeVerification, setIsAttemptingCodeVerification] =
    useState(false);
  const [partnerCode, setPartnerCode] = useState("");

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      verifyCode({ code: partnerCode, userId })
        .then((response) => {
          if (response.success) {
            setIsAttemptingCodeVerification(false);
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

  const toHHMMSS = (numSecs) => {
    let secNum = parseInt(numSecs, 10);
    let hours = Math.floor(secNum / 3600).toString().padStart(2, '0');
    let minutes = Math.floor((secNum - (hours * 3600)) / 60).toString().padStart(2, '0');
    let seconds = (secNum - (hours * 3600) - (minutes * 60)).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const [play] = useSound(getAnimalSound(emoji));

  if (isFinished) {
    return (
      <CongratsWrapper>
          <img src="/images/congratulations.png" alt="happy"/>
        {
          duration && <p>It took you both  {toHHMMSS(duration / 1000)}. Great job!</p>
        }
        <NextLink href="/">
          <Button>Go to lobby!</Button>
        </NextLink>
      </CongratsWrapper>
    );
  }

  return (
    <Wrapper backgroundColor={color}>
      <Twemoji
        onClick={play}
        options={{
          folder: "svg",
          ext: ".svg",
        }}
      >
        {emoji}
      </Twemoji>
      {!isAttemptingCodeVerification && (
        <>
          <ButtonWrapper>
            <Button onClick={() => setIsAttemptingCodeVerification(true)}>
              I found my partner!
            </Button>
          </ButtonWrapper>
          <ChatNoSSR pairId={gameParams.pairId} userId={userId} />
        </>
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
            <div style={{ display: "flex" }}>
              <Button
                onClick={() => setIsAttemptingCodeVerification(false)}
                style={{ background: "none", border: "1px solid white" }}
              >
                Cancel
              </Button>
              <Button style={{ marginLeft: 10 }}>Submit</Button>
            </div>
          </CodeVerificationForm>
        </>
      )}
    </Wrapper>
  );
};
