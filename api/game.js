import {sendGetRequest} from "./http";

const API_URL_JOIN_GAME = "game/status";

export const checkGameForUser = (query) => {
    return sendGetRequest({
        url: API_URL_JOIN_GAME,
        query
    })
}
