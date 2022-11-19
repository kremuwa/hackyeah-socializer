export const WaitingRoom = ({id, error, playersCount,status}) => {
    return <div>
        <h1>GAME</h1>
        {!id && <p>Wrong game ID</p>}
        {id && <p>{status}</p>}
        {error && <p>{error}</p>}
        {playersCount && <p>Players: {playersCount}</p>}
    </div>
}
