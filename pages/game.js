import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {checkGameForUser} from "../api/game";
import {toastError} from "../helpers/toast";
import {Meeting} from "@/elements/Meeting";
import {GAME_STATE} from "../helpers/constants";
import {WaitingRoom} from "@/elements/WaitingRoom";
import styled from "styled-components";

const {STARTED, NOT_STARTED, FULFILLED} = GAME_STATE;

const GameWrapper = styled.div`
  height: 100vh;
`

const Game = () => {
    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const [playersCount, setPlayersCount] = useState()
    const [gameProps, setGameProps] = useState();
    const router = useRouter()
    const {query = {}} = router
    const {id} = query
    const isMeeting  = status === STARTED || status === FULFILLED;

    const checkGameStatus = useCallback(() => {
        id && status !== STARTED && checkGameForUser({
            userId: id,
        }).then((data) => {
            const {status = NOT_STARTED, gameParams, playersCount} = data || {};
            setStatus(status)
            playersCount && setPlayersCount(playersCount)
            gameParams && setGameProps(gameParams)
        }).catch((response) => {
            const {error, status} = response;
            if (status === 403) {
                router.push("/");
                toastError(error)
            } else {
                setError(response.error)
            }
        })
    }, [id])

    useEffect(() => {
        checkGameStatus();
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            checkGameStatus();
        }, 1000);
        return () => clearInterval(interval);
    }, [id])

    return (
        <GameWrapper className="container mx-auto my-20 p-5 border-1">
            {status !== STARTED && <WaitingRoom playersCount={playersCount} status={status} error={error} id={id}/>}
            {isMeeting && <Meeting isFinished={status === FULFILLED} gameParams={gameProps} userId={id}/>}
        </GameWrapper>
    );
};

export default Game
