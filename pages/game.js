import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {checkGameForUser} from "../api/game";
import {toastError} from "../helpers/toast";

const Game = () => {
    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const router = useRouter()
    const {query = {}} = router
    const {id} = query

    useEffect(() => {
        const interval = setInterval(() => {
            checkGameForUser({
                userId: id,
            }).then((data) => {
                const {status = "WAITING"} = data || {};
                setStatus(status)
            }).catch((response) =>{
                const{error, status} = response;
                if (status === 403){
                    router.push("/");
                    toastError(error)
                }else{
                    setError(response.error)
                }
            })
        }, 1000);
        return () => clearInterval(interval);
    }, [id])

    return (
        <div className="container mx-auto my-20 p-5 border-1">
            <h1>GAME</h1>
            {!id && <p>Wrong game ID</p>}
            {id && <p>{status}</p>}
            {error && <p>{error}</p>}
        </div>
    );
};

export default Game
