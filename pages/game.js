import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {checkGameForUser} from "../api/game";
import {toastError} from "../helpers/toast";
import {Meeting} from "@/elements/Meeting";

const Game = () => {
    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const [gameProps, setGameProps] = useState();
    const router = useRouter()
    const {query = {}} = router
    const {id} = query

    const checkGameStatus = useCallback(() => {
        checkGameForUser({
            userId: id,
        }).then((data) => {
            const {status = "WAITING",gameParams} = data || {};
            setStatus(status)
            gameParams && setGameProps(gameParams)
        }).catch((response) =>{
            const{error, status} = response;
            if (status === 403){
                router.push("/");
                toastError(error)
            }else{
                setError(response.error)
            }
        })
    }, [id])

    useEffect(() => {
        checkGameStatus();
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            checkGameStatus();
        }, 1000);
        return () => clearInterval(interval);
    }, [id])

    return (
        <div className="container mx-auto my-20 p-5 border-1">
            <h1>GAME</h1>
            {!id && <p>Wrong game ID</p>}
            {id && <p>{status}</p>}
            {error && <p>{error}</p>}
            {status === "STARTED" && <Meeting gameProps={gameProps}/>}
        </div>
    );
};

export default Game
