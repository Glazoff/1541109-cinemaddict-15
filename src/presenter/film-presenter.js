import {render, RenderPosition} from '../utils/render.js';

import generateFilms from '../mock/films.js';

import SiteUserRatingView from '../view/user-rating.js';
import SiteFilterStatsView from '../view/filter-stats.js';
import SiteStatsView from '../view/stats-film.js';
import SiteFilmListView from '../view/film-list.js';
import SiteFooterElementView from '../view/footer-stats';
import SiteShowMoreView from '../view/show-more.js';
import SiteCardFilmView from '../view/card-film.js';
import SitePopupFilmDetailsView from '../view/popup-film-details.js';

const COUNT_FILMS_LIST = 7;

export default class MoviePresenter {
  constructor() {
    this._filmsData = generateFilms(COUNT_FILMS_LIST);
    this._filmsCountRenders = 5;
    this._filmSort = [];
    this._result;

    this._body = document.querySelector('body');
    this._siteHeaderElement = document.querySelector('.header');
    this._siteMainElement = document.querySelector('.main');
    this._siteFooterElement = document.querySelector('.footer');

    this._userRatingView = new SiteUserRatingView();
    this._flterStatsView = new SiteFilterStatsView(this._filmsData);
    this._statsView =new SiteStatsView();
    this._filmContainerView = new SiteFilmListView();
    this._footerElementView = new SiteFooterElementView(this._filmsData);
    this._showMoreView = new SiteShowMoreView();
  }

  init() {
    this._renderUserRating();
    this._renderFilterStats();
    this._renderStats();
    this._renderFooter();
    this._renderFilms(this._filmsCountRenders, this._filmsData);
  }

  _renderUserRating() {
    //Отрисовка рейтинга пользователя.
    render(this._siteHeaderElement, this._userRatingView, RenderPosition.BEFOREEND);
  }

  _renderFilterStats() {
    //Отрисовка фильтров и статистики.
    const oldFilters = document.querySelector('.main-navigation');
    if (oldFilters) {
      this._flterStatsView.removeElement();
      oldFilters.remove();
    }

    render(this._siteMainElement, this._flterStatsView, RenderPosition.AFTERBEGIN);
  }

  _renderSortByData() {
    const newFilmSort = this._filmsData.slice();

    const filmsSortData = newFilmSort.sort((a, b) => {
      if (a.releaseDate > b.releaseDate) {
        return 1;
      }
      if (a.releaseDate < b.releaseDate) {
        return -1;
      }

      return 0;
    });

    this._result = true;

    for(let i = 0; i < newFilmSort.length; i++) {
      if(filmsSortData[i] === this._filmSort[i]) {
        this._result = false;
      }
    }

    if (this._result) {
      this._renderFilms(this._filmsCountRenders, filmsSortData);
    }

    this._result = true;
    this._filmSort = filmsSortData.slice();
  }

  _renderSortRating() {
    const newFilmSort = this._filmsData.slice(0);

    const filmsSortRating = newFilmSort.sort((a, b) => {
      if (a.rating > b.rating) {
        return -1;
      }
      if (a.rating < b.rating) {
        return 1;
      }

      return 0;
    });

    this._result = true;

    for(let i = 0; i < newFilmSort.length; i++) {
      if(filmsSortRating[i] === this._filmSort[i]) {
        this._result = false;
      }
    }

    if (this._result) {
      this._renderFilms(this._filmsCountRenders, filmsSortRating);
    }

    this._result = true;
    this._filmSort = filmsSortRating.slice();
  }

  _renderStats() {
    render(this._siteMainElement, this._statsView, RenderPosition.BEFOREEND);

    this._statsView.setEditClickSortByData(() => {
      const buttonActive = this._statsView.getElement().querySelector('.sort__button--active');
      buttonActive.classList.remove('sort__button--active');
      this._statsView.getElement().querySelector('.sort__button_date').classList.add('sort__button--active');
      this._renderSortByData();
    });

    this._statsView.setEditClickSortRating(() => {
      const buttonActive = this._statsView.getElement().querySelector('.sort__button--active');
      buttonActive.classList.remove('sort__button--active');
      this._statsView.getElement().querySelector('.sort__button_rating').classList.add('sort__button--active');
      this._renderSortRating();
    });

    this._statsView.setEditClickSortDefault(() => {
      const buttonActive = this._statsView.getElement().querySelector('.sort__button--active');
      buttonActive.classList.remove('sort__button--active');
      this._statsView.getElement().querySelector('.sort__button_default').classList.add('sort__button--active');
      this._renderFilms(this._filmsCountRenders, this._filmsData);
    });
  }

  _renderFilmCointainer() {
    //Отрисовка контейнера для фильмов.
    render(this._siteMainElement, this._filmContainerView, RenderPosition.BEFOREEND);
  }

  _renderPopupFilm(filmPopup) {
    this._filmPopupComponent = new SitePopupFilmDetailsView(filmPopup);
    this._body.classList.add('hide-overflow');
    render(this._body, this._filmPopupComponent, RenderPosition.BEFOREEND);
    this._closeButtom = this._filmPopupComponent.getElement().querySelector('.film-details__close-btn');
    this._popup = this._filmPopupComponent.getElement();

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        this._body.classList.remove('hide-overflow');
        this._filmPopupComponent.getElement().remove();
        this._filmPopupComponent.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onClickButton = () => {
      this._body.classList.remove('hide-overflow');
      this._filmPopupComponent.getElement().remove();
      this._filmPopupComponent.removeElement();
      this._closeButtom.removeEventListener('click', onClickButton);
    };

    document.addEventListener('keydown', onEscKeyDown);
    this._closeButtom.addEventListener('click', onClickButton);

    this._filmPopupComponent.setEditClickWatchlist(() => {
      this._editChangeAddWatchlist(filmPopup);
    });

    this._filmPopupComponent.setEditClickWatched(() => {
      this._editChangeWatched(filmPopup);
    });

    this._filmPopupComponent.setEditClickFavorites(() => {
      this._editChangeFavorites(filmPopup);
    });
  }

  _replacePopupFilm(filmPopup) {
    const oldPopup = document.querySelector('.film-details');

    if (oldPopup) {
      oldPopup.remove();
      this._renderPopupFilm(filmPopup);
      return;
    }

    this._renderPopupFilm(filmPopup);
  }

  _replaceCardFilm(filmData) {
    const oldCardFilm = document.getElementById(filmData.id);

    const container = document.createElement('div');
    container.classList.add('deiete-dev');
    this._renderCardFilm(filmData, container);

    const newCardFilm = container.firstChild;
    oldCardFilm.after(newCardFilm);

    oldCardFilm.remove();
    container.remove();

    this._renderFilterStats();
  }

  _editChangeAddWatchlist(filmData) {
    if (filmData.isAddToWatchlist) {
      filmData.isAddToWatchlist = false;
    } else {
      filmData.isAddToWatchlist = true;
    }

    if (document.querySelector('.film-details')) {
      this._replacePopupFilm(filmData);
    }
    this._replaceCardFilm(filmData);
  }

  _editChangeWatched(filmData) {
    if (filmData.isAlreadyWatched) {
      filmData.isAlreadyWatched = false;
    } else {
      filmData.isAlreadyWatched = true;
    }

    if (document.querySelector('.film-details')) {
      this._replacePopupFilm(filmData);
    }
    this._replaceCardFilm(filmData);
  }

  _editChangeFavorites(filmData) {
    if (filmData.isAddToFavorites) {
      filmData.isAddToFavorites = false;
    } else {
      filmData.isAddToFavorites = true;
    }

    if (document.querySelector('.film-details')) {
      this._replacePopupFilm(filmData);
    }
    this._replaceCardFilm(filmData);
  }

  _renderCardFilm(filmData, cointainer) {
    //Отрисовка карточки фильма.
    this._filmComponent = new SiteCardFilmView(filmData);
    this._filmContiner = this._filmContainerView.getElement().querySelector('.films-list__container');

    render(cointainer, this._filmComponent, RenderPosition.BEFOREEND);

    this._filmComponent.setEditClickHandler(() => {
      this._replacePopupFilm(filmData);
    });

    this._filmComponent.setEditClickWatchlist(() => {
      this._editChangeAddWatchlist(filmData);
    });

    this._filmComponent.setEditClickWatched(() => {
      this._editChangeWatched(filmData);
    });

    this._filmComponent.setEditClickFavorites(() => {
      this._editChangeFavorites(filmData);
    });
  }

  _renderFilms(filmsCount, filmData) {
    //Отрисовка списка фильмов.
    this._filmContainerView.clearFilmList();
    this._renderFilmCointainer();
    this._filmContiner = this._filmContainerView.getElement().querySelector('.films-list__container');
    const filmsRenders = filmData.slice(0, filmsCount);

    if (this._filmsData.length <= filmsCount) {
      for (let i = 0; i < this._filmsData.length; i++) {
        this._renderCardFilm(filmsRenders[i], this._filmContiner);
      }
      this._showMoreView.deleteButton();
      return;
    }

    this._rendershowMore();
    for (let i = 0; i < filmsCount; i++) {
      this._renderCardFilm(filmsRenders[i], this._filmContiner);
    }
  }

  _rendershowMore() {
    //Отрисовка фильмов по нажатию кнопки "Загрузить еще".
    const filmsList = this._filmContainerView.getElement().querySelector('.films-list');
    render(filmsList, this._showMoreView, RenderPosition.BEFOREEND);//Рисуем кнопку "Загрузить еще"

    this._showMoreView.setEditClickHandler(() =>{
      this._filmContainerView.clearFilmList();
      this._filmsCountRenders += 5;
      this._renderFilms(this._filmsCountRenders, this._filmsData);
    });
  }

  _renderFooter() {
    //Отрисовка футера и колличества фильмов.
    render(this._siteFooterElement, this._footerElementView, RenderPosition.BEFOREEND);
  }
}
