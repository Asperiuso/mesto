export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderedElement = this._renderer(item);
      this._container.append(this._renderedElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
