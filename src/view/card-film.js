import AbstractView from './abstract.js';

const createCardFilmTemplate = (films) => {
  const {id, poster, title, rating, releaseDate, runTime, genre, description, comments, isAddToWatchlist, isAlreadyWatched, isAddToFavorites} = films;

  const addToWatchlistClassName = isAddToWatchlist
    ? 'film-card__controls-item--active'
    : '';

  const alreadyWatchedClassName = isAlreadyWatched
    ? 'film-card__controls-item--active'
    : '';

  const addToFavoritesClassName = isAddToFavorites
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card" id="${id}">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>

    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${runTime}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src=${poster} alt="" class="film-card__poster">
    <p class="film-card__description">${description}</p>
    <a class="film-card__comments">${comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${addToWatchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${addToFavoritesClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class SiteCardFilm extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._editClickWatchlist = this._editClickWatchlist.bind(this);
    this._editClickWatched = this._editClickWatched.bind(this);
    this._editClickFavorites = this._editClickFavorites.bind(this);
  }

  getTemplate() {
    return createCardFilmTemplate(this._films);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._editClickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._editClickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._editClickHandler);
  }

  _editClickWatchlist(evt) {
    evt.preventDefault();
    this._callback.editChangeWatchlist();
  }

  _editClickWatched(evt) {
    evt.preventDefault();
    this._callback.editChangeWatched();
  }

  _editClickFavorites(evt) {
    evt.preventDefault();
    this._callback.editChangeFavorites();
  }

  setEditClickWatchlist(callback) {
    this._callback.editChangeWatchlist = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._editClickWatchlist);
  }

  setEditClickWatched(callback) {
    this._callback.editChangeWatched = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._editClickWatched);
  }

  setEditClickFavorites(callback) {
    this._callback.editChangeFavorites = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._editClickFavorites);
  }
}

