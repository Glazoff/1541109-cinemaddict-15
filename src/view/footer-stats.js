import AbstractView from './abstract.js';

const createFooterStats = (films) => (
  `<section class="footer__statistics">
    <p>${films.length} movies inside</p>
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
