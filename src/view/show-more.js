import {createElement} from '../utils.js';


const createShowMoreTemplate = () => (
  `<button class="films-list__show-more">Show more</button>
`);

export default class SiteShowMore {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  remuveElement() {
    this._element = null;
  }
}
