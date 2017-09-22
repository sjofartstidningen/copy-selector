import { addClass, removeClass } from './createElement';

export default class Selection {
  constructor() {
    this.el = null;
  }

  addEl = el => {
    this.el = el;
    addClass(this.el, 'hidden');
  };

  show = box => {
    if (this.el != null) {
      addClass(this.el, 'show');
      removeClass(this.el, 'hidden');

      this.el.style.top = `${box.top}px`;
      this.el.style.left = `${box.left}px`;
      this.el.style.width = `${box.width}px`;
      this.el.style.height = `${box.height}px`;
    }
  };

  hide = () => {
    if (this.el != null) {
      removeClass(this.el, 'show');
      addClass(this.el, 'hidden');
    }
  };
}
