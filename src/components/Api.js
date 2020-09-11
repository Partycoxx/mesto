export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('Произошла ошибка');
            }
        })
    }

    getCardList() {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'GET',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('Произошла ошибка');
            }
        })  
    }

    editUserInfo({newName, newOccupation}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newName,
                about: newOccupation
            })            
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('Произошла ошибка');
            }
        })
    }

    addNewCard({dataName, dataLink}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: dataName,
                link: dataLink
            })            
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return Promise.reject('Произошла ошибка');
            }
        })
    }
}