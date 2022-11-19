import {useRouter} from "next/router";

const Game = () => {
    const router = useRouter()
    const {query = {}} = router
    const {id} = query
    return (
        <div className="container mx-auto my-20 p-5 border-1">
            {!id && <p>Wrong game ID</p>}
            {id && <p>This is your game!</p>}
        </div>
    );
};

export default Game
