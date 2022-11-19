const API_URL = 'http://localhost:8000/'

export const sendRequest = ({url, method = "POST", data, query}) => {
    const options = {
        method,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json;charset=UTF-8",
        },
        body: data && JSON.stringify(data),
    };
    let fullUrl = `${API_URL}${url}`;
    if (query) {
        fullUrl += "?" + new URLSearchParams(query)
    }
    return fetch(fullUrl, options)
        .then((response) => {
            return new Promise((resolve) => response.json()
                .then((json) => resolve({
                    status: response.status,
                    ok: response.ok,
                    json,
                })));
        }).then((response) => {
            const {status, json} = response;
            switch (status) {
                case 201:
                case 200:
                    return json
                default:
                    const {error = "Unknown Error"} = json;
                    throw new Error(error);
            }
        })
}

export const sendGetRequest = ({url, data, query}) => {
    return sendRequest({
        url,
        method: "GET",
        data,
        query
    })
}

export const sendPostRequest = ({url, data}) => {
    return sendRequest({
        url,
        data
    })
}
