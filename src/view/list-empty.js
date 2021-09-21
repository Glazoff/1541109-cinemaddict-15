import AbstractView from './abstract.js';

const createListEmptyTemplate = () => (
  `<section class="films-list">
      <h2 class="films-list__title">There are no movies in our database</h2>
      <div class="films-list__container">
      </div>
  </section>
  `
);

export default class SiteListEmpty extends AbstractView {
  getTemplate() {
    return createListEmptyTemplate();
  }
}


