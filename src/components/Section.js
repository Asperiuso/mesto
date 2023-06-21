export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach(item => {
      const renderedElement = this._renderer(item);
      this._container.append(renderedElement);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}