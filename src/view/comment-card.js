import {createElement} from '../utils.js';

const createCommentsTemplate = (films) => {
  const {comments} = films;

  const {commentText, emoji, userName, commentData} = comments;

  return `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${emoji}" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${commentText}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${userName}</span>
        <span class="film-details__comment-day">${commentData}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

export default class SiteComments {
  constructor() {
    this._element = null;
  }

  getTemplate(films) {
    return createCommentsTemplate(films);
  }

  getElement(films) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(films));
    }
    return this._element;
  }

  remuveElement() {
    this._element = null;
  }
}
