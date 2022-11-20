import {sendPostRequest} from "./http";

const API_URL_VERIFY_CODE = "game/verify";

export const verifyCode = (data) => {
    return sendPostRequest({
        url: API_URL_VERIFY_CODE,
        data
    })
}
