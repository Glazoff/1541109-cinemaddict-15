import AbstractView from './abstract.js';

const createFilterStatsTemplate = (films) => {

  let countWatchlistFilms = 0;
  let countHistoryFilms = 0;
  let countFavoritesFilm = 0;

  films.forEach((film) => {
    if(film.isAddToFavorites) {
      countWatchlistFilms = countWatchlistFilms + 1;
    }
    if(film.isAlreadyWatched) {
      countHistoryFilms = countHistoryFilms + 1;
    }
    if(film.isAddToFavorites) {
      countFavoritesFilm = countFavoritesFilm + 1;
    }
  });

  return `<div>
  <nav class="main-navigation">

    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${countWatchlistFilms}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${countHistoryFilms}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${countFavoritesFilm}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>

  <ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>
  </div>`;
};

export default class SiteFilterStats extends AbstractView {
  constructor(films) {
    super();
    this._films = films;
  }

  getTemplate() {
    return createFilterStatsTemplate(this._films);
  }
}


