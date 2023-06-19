export default class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._infoElement.textContent,
    };
  }

  setUserInfo({ Name, Profession }) {
    this._nameElement.textContent = Name;
    this._infoElement.textContent = Profession;
  }
}
