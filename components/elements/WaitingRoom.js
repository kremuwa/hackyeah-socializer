import {GAME_STATE} from "../../helpers/constants";
import styled from "styled-components";
import {GameLoadingAnimation} from "@/elements/GameLoadingAnimation";

const WaitingRoomWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  flex: 1;
  align-items: center;
  height: 100%;

  p {
    text-align: center;
    margin: 2vh auto;
  }
`

export const WaitingRoom = ({id, error, playersCount, status}) => {
    return <WaitingRoomWrapper>
        <h1>Waiting Room</h1>
        {!id && <p>Wrong game ID</p>}
        {error && <p>{error}</p>}
        {status === GAME_STATE.NOT_STARTED && <div>
            <GameLoadingAnimation>
                <img src="/images/lemur_sleeping.png" width={256} height={162}/>
            </GameLoadingAnimation>
            <p>Game not started yet</p>
            {playersCount && <p>Waiting Players: {playersCount}</p>}
        </div>}
    </WaitingRoomWrapper>
}
