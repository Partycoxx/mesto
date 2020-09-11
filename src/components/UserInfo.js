export default class UserInfo {
    constructor({userName, userOccupation}) {
        this._userName = document.querySelector(userName);
        this._userOccupation = document.querySelector(userOccupation);
        this._avatar = document.querySelector('.profile__pic');
    }

    getUserInfo() {
        this._userData = {};

        this._userData.name = this._userName.textContent;
        this._userData.occupation = this._userOccupation.textContent;

        return this._userData;
    }

    setUserInfo({newName, newOccupation}) {
        this._userName.textContent = newName;
        this._userOccupation.textContent = newOccupation;
    }

    setUserAvatar({avatarLink}) {
        this._avatar.src = avatarLink;

    }
}