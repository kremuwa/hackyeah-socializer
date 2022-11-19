import styled from "styled-components";
import {Button} from "./Button";
import {Input} from "./Input";
import {Giraffe} from "./Girrafe";
import {useCallback, useState} from "react";
import {joinGame} from "../../api/join";
import {useRouter} from "next/router";
import {toastServerError} from "../../helpers/toast";

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
`

const SplashScreen = () => {
    const [username,setUsername] = useState("");
    const router = useRouter()

    const handleSubmit = useCallback((event) => {
        event.preventDefault();
        joinGame({username}).then((response) => {
            router.push(`/game?id=${response.id}`)
        }).catch(toastServerError)
    }, [username]);

    const changeInput = useCallback((event) =>{
        setUsername(event.target.value)
    }, [])

    return (
        <WrapperDiv>
            <ScreenTitle>Socializer</ScreenTitle>
            <SplashScreenForm onSubmit={handleSubmit}>
                <Input value={username} type="text" placeholder="Your username" onChange={changeInput}/>
                <Button>Join!</Button>
            </SplashScreenForm>
            <Giraffe></Giraffe>
        </WrapperDiv>
    );
};

export default SplashScreen;
