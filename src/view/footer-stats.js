import {createElement} from '../utils.js';

const createFooterStats = (COUNT_FILMS_LIST) => (
  `<section class="footer__statistics">
    <p>${COUNT_FILMS_LIST} movies inside</p>
  </section>`
);

export default class SiteFooterStats {
  constructor(filmsCount) {
    this._element = null;
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStats(this._filmsCount);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
