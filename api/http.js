const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://socialize.loca.lt/'

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
            return new Promise((resolve, reject) => {
                const {status, json} = response;
                switch (status) {
                    case 201:
                    case 200:
                        resolve(json)
                        break;
                    default:
                        const {error = "Unknown Error"} = json;
                        reject({error, status});
                }
            })
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
