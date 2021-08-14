import {createElement} from '../utils.js';

const createCardFilmTemplate = (films) => {
  const {poster, title, rating, releaseDate, runTime, genre, description, comments, isAddToWatchlist, isAlreadyWatched, isAddToFavorites} = films;


  const addToWatchlistClassName = isAddToWatchlist
    ? 'film-card__controls-item--active'
    : '';

  const alreadyWatchedClassName = isAlreadyWatched
    ? 'film-card__controls-item--active'
    : '';

  const addToFavoritesClassName = isAddToFavorites
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>

    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${runTime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addToWatchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${addToFavoritesClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class SiteCardFilm {
  constructor() {
    this._element = null;
  }

  getTemplate(films) {
    return createCardFilmTemplate(films);
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
