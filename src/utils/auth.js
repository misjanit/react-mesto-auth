export const baseUrl = 'https://auth.nomoreparties.co';

const checkStatus = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}

export const registration = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email, password})
    })
        .then(checkStatus)
};

export const authorization = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",             
        },
        body: JSON.stringify({email, password})
    })
        .then(checkStatus)
}

export const checkTokenValidity = (jwt) => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },          
    })
        .then(checkStatus)
}