const {


    message
} = require('antd');

export const base_url = 'http://localhost:9000';
export const APICall = (url, method = 'GET', data = null) => {
    let fetchData = {
        method: method,
        mode: "cors",
        cache: "no-cache",
        headers: {
            "Content-Type": "application/json; charset=utf-8",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: data ? JSON.stringify(data) : null
    }
    return fetch(base_url + url, fetchData).then(response => {
        return response.json()
    }).catch(err => {

        throw err;
    })
}