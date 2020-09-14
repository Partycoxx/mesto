export default class Api {
    constructor({baseUrl, headers}) {
        this._baseUrl = baseUrl;
        this._headers = headers;
    }

    _getUserData() {
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

    _getCardList() {
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

    getInitialData() {
        return Promise.all([this._getUserData(), this._getCardList()]);
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

    deleteCard({cardId}) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
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
}