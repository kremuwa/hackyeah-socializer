import {sendPostRequest} from "./http";

const API_URL_JOIN_GAME = "game/join";

export const joinGame = (data) => {
    return sendPostRequest({
        url: API_URL_JOIN_GAME,
        data
    })
}
