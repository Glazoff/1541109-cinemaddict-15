import AbstractView from './abstract.js';

const createFooterStats = (COUNT_FILMS_LIST) => (
  `<section class="footer__statistics">
    <p>${COUNT_FILMS_LIST} movies inside</p>
  </section>`
);

export default class SiteFooterElement extends AbstractView {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFooterStats(this._filmsCount);
  }
}
