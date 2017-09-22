import { addClass, removeClass } from './createElement';

export default class Messanger {
  constructor() {
    this.el = null;
  }

  addEl = el => {
    this.el = el;
    addClass(this.el, 'hidden');
  };

  show = (msg, type = 'success') => {
    if (this.el != null) {
      this.el.textContent = msg;
      addClass(this.el, type);
      addClass(this.el, 'show');
      removeClass(this.el, 'hidden');

      window.setTimeout(() => {
        removeClass(this.el, type);
        removeClass(this.el, 'show');
        addClass(this.el, 'hidden');
      }, 3000);
    }
  }
}
