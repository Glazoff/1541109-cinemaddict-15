import {createElement} from '../utils.js';

const createFooterStats = (COUNT_FILMS_LIST) => (
  `<section class="footer__statistics">
    <p>${COUNT_FILMS_LIST} movies inside</p>
  </section>`
);

export default class SiteFooterStats {
  constructor() {
    this._element = null;
  }

  getTemplate(COUNT_FILMS_LIST) {
    return createFooterStats(COUNT_FILMS_LIST);
  }

  getElement(COUNT_FILMS_LIST) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(COUNT_FILMS_LIST));
    }
    return this._element;
  }

  remuveElement() {
    this._element = null;
  }
}
