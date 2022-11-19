import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {checkGameForUser} from "../api/game";
import {toastError} from "../helpers/toast";
import {Meeting} from "@/elements/Meeting";
import {GAME_STATE} from "../helpers/constants";
import {WaitingRoom} from "@/elements/WaitingRoom";
import {endOfLine} from "tailwindcss/prettier.config";

const {STARTED, NOT_STARTED} = GAME_STATE;

const Game = () => {
    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const [playersCount, setPlayersCount] = useState()
    const [gameProps, setGameProps] = useState();
    const router = useRouter()
    const {query = {}} = router
    const {id} = query

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
        <div className="container mx-auto my-20 p-5 border-1">
            {status !== STARTED && <WaitingRoom playersCount={playersCount} status={status} error={error} id={id}/>}
            {status === STARTED && <Meeting gameParams={gameProps}/>}
        </div>
    );
};

export default Game
