import {render, RenderPosition} from '../utils/render.js';
import SiteFilterStatsView from '../view/filter-stats.js';


export default class FilterPesentor {
  constructor(modelFilter, movieModel) {
    this._modelFilter = modelFilter;
    this._movieModel = movieModel;
    this._movieModel.filmsChanges.subscribe((films) => this._renderFilter(films));

    this._filterData = this._modelFilter.getFilter();

    this._mainElement = document.querySelector('.main');

  }

  init() {
    this._renderFilter(this._filterData);
  }

  filter(type) {
    switch(type) {
      case 'default':
        this._modelFilter.setFilters(this._filterData);
        break;
      case 'watchlist':
        this._filterDataWatchlist = this._filterData.filter((film) => film.isAlreadyWatched === true);
        this._modelFilter.setFilters(this._filterDataWatchlist);
        break;
      case 'addWatchlist':
        this._filterDataAddToWatchlist = this._filterData.filter((film) => film.isAddToWatchlist === true);
        this._modelFilter.setFilters(this._filterDataAddToWatchlist);
        break;
      case 'favorites':
        this._filterDataFavorites = this._filterData.filter((film) => film.isAddToFavorites === true);
        this._modelFilter.setFilters(this._filterDataFavorites);
        break;
    }
  }

  _renderFilter(filmData) {
    this._flterView = new SiteFilterStatsView(filmData);

    render(this._mainElement, this._flterView, RenderPosition.AFTERBEGIN);

    this._flterView.setEditChangeAllMovies(() => {
      this.filter('default');
    });

    this._flterView.setEditChangeWatchlist(() => {
      this.filter('addWatchlist');
    });

    this._flterView.setEditChangeAddToWatchlist(() => {
      this.filter('watchlist');
    });

    this._flterView.setEditChangeFavorites(() => {
      this.filter('favorites');
    });
  }

  _filterFilms() {

  }
}

