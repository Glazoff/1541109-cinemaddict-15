import AbstractView from './abstract.js';

const createFilterTemplate = (films) => {

  let countWatchlistFilms = 0;
  let countHistoryFilms = 0;
  let countFavoritesFilm = 0;

  films.forEach((film) => {
    if(film.isAddToWatchlist) {
      countWatchlistFilms = countWatchlistFilms + 1;
    }
    if(film.isAlreadyWatched) {
      countHistoryFilms = countHistoryFilms + 1;
    }
    if(film.isAddToFavorites) {
      countFavoritesFilm = countFavoritesFilm + 1;
    }
  });

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item_all-movies main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item main-navigation__item_watchlist">Watchlist <span class="main-navigation__item-count">${countWatchlistFilms}</span></a>
      <a href="#history" class="main-navigation__item main-navigation__item_history">History <span class="main-navigation__item-count">${countHistoryFilms}</span></a>
      <a href="#favorites" class="main-navigation__item main-navigation__item_favorites">Favorites <span class="main-navigation__item-count">${countFavoritesFilm}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>
  `;
};

export default class SiteFilterStats extends AbstractView {
  constructor(films) {
    super();
    this._films = films;


    this._selectFilterWatchlist = this._selectFilterWatchlist.bind(this);
    this._selectFilterAddToWatchlist = this._selectFilterAddToWatchlist.bind(this);
    this._selectFilterFavorites = this._selectFilterFavorites.bind(this);
    this._selectFilterAllMovies = this._selectFilterAllMovies.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._films);
  }

  _selectFilterAllMovies(evt) {
    evt.preventDefault();
    this._callback.editChangeAllMovies();
  }

  _selectFilterWatchlist(evt) {
    evt.preventDefault();
    this._callback.editChangeWatchlist();
  }

  _selectFilterAddToWatchlist(evt) {
    evt.preventDefault();
    this._callback.editChangeAddToWatchlist();
  }

  _selectFilterFavorites(evt) {
    evt.preventDefault();
    this._callback.editChangeFavorites();
  }

  setEditChangeAllMovies (callback) {
    this._callback.editChangeAllMovies = callback;
    this.getElement().querySelector('.main-navigation__item_all-movies').addEventListener('click', this._selectFilterAllMovies);
  }

  setEditChangeWatchlist(callback) {
    this._callback.editChangeWatchlist = callback;
    this.getElement().querySelector('.main-navigation__item_watchlist').addEventListener('click', this._selectFilterWatchlist);
  }

  setEditChangeAddToWatchlist(callback) {
    this._callback.editChangeAddToWatchlist = callback;
    this.getElement().querySelector('.main-navigation__item_history').addEventListener('click', this._selectFilterAddToWatchlist);
  }

  setEditChangeFavorites(callback) {
    this._callback.editChangeFavorites = callback;
    this.getElement().querySelector('.main-navigation__item_favorites').addEventListener('click', this._selectFilterFavorites);
  }
}


