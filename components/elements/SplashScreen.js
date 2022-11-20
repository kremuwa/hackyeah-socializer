import styled from "styled-components";
import { Button } from "./Button";
import { Input } from "./Input";
import { Giraffe } from "./Girrafe";
import { useCallback, useState } from "react";
import { joinGame } from "../../api/join";
import { useRouter } from "next/router";
import { toastServerError } from "../../helpers/toast";

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  width: 100vw;
  height: 100vh;
  padding: 25px;
`;

const ScreenTitle = styled.h1`
  font-size: 2.5em;
  margin: 1rem;
`;

const SplashScreenForm = styled.form`
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

const NameInput = styled(Input)`
  font-size: 0.8em;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  text-shadow: -1px 1px 0 #fff, 1px 1px 0 #fff, 1px -1px 0 #fff,
    -1px -1px 0 #fff;
  border-style: inset;
  padding: 8px;
  width: 80%;
  text-align: center;

  &::placeholder {
    opacity: 0.5;
  }
`;

const SplashScreen = () => {
  const [username, setUsername] = useState("");
  const router = useRouter();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      joinGame({ username })
        .then((response) => {
          router.push(`/game?id=${response.id}`);
        })
        .catch(toastServerError);
    },
    [username]
  );

  const changeInput = useCallback((event) => {
    setUsername(event.target.value);
  }, []);

  return (
    <WrapperDiv>
      <ScreenTitle>Socializer</ScreenTitle>
      <SplashScreenForm onSubmit={handleSubmit}>
        <NameInput
          value={username}
          type="text"
          placeholder="Your username"
          onChange={changeInput}
        />
        <Button>Join!</Button>
      </SplashScreenForm>
      <Giraffe />
      <Giraffe kind={2} />
    </WrapperDiv>
  );
};

export default SplashScreen;
