import {render, RenderPosition} from '../utils/render.js';

import SiteUserRatingView from '../view/user-rating.js';
import SiteStatsView from '../view/stats-film.js';
import SiteFilmListView from '../view/film-list.js';
import SiteFooterElementView from '../view/footer-stats';
import SiteShowMoreView from '../view/show-more.js';
import SiteCardFilmView from '../view/card-film.js';
import SitePopupFilmDetailsView from '../view/popup-film-details.js';
import SiteListEmpty from '../view/list-empty.js';

const USER_ACTIONS = {
  DELETE: 'DELETE',
};

export default class MoviePresenter {
  constructor(modelFilms, filterModel) {
    this._modelFilms = modelFilms;
    this._filterModel = filterModel;

    this.sort = this.sort.bind(this);

    this._filmsData = this._modelFilms.getFilms();
    this._filmsDataCurrent = this._filmsData.slice();
    this._filmsCountRenders = 5;

    this._filterModel.filterChanges.subscribe((films) => this._renderFilms(this._filmsCountRenders, films));

    this._body = document.querySelector('body');
    this._siteHeaderElement = document.querySelector('.header');
    this._siteMainElement = document.querySelector('.main');
    this._siteFooterElement = document.querySelector('.footer');

    this._userRatingView = new SiteUserRatingView();
    this._statsView =new SiteStatsView();
    this._filmContainerView = new SiteFilmListView();
    this._footerElementView = new SiteFooterElementView(this._filmsData);
    this._showMoreView = new SiteShowMoreView();
    this._listEmpty = new SiteListEmpty();
  }

  init() {
    this._renderUserRating();
    this._renderStats();
    this._renderFooter();
    this._renderFilms(this._filmsCountRenders, this._filmsData);
  }

  _renderUserRating() {
    //Отрисовка рейтинга пользователя.
    render(this._siteHeaderElement, this._userRatingView, RenderPosition.BEFOREEND);
  }

  sort (type) {
    switch (type) {
      case 'default':
        this._filmsDataCurrent = this._filmsData.slice();
        break;
      case 'rating':
        this._filmsDataCurrent = this._filmsData.slice().sort((a, b) => (+b.rating - +a.rating));
        break;
      case 'data':
        this._filmsDataCurrent = this._filmsData.slice().sort((a, b) => (+b.releaseDate - +a.releaseDate));
        break;
    }
  }

  _renderStats() {
    render(this._siteMainElement, this._statsView, RenderPosition.BEFOREEND);

    this._statsView.setEditClickSortByData(() => {
      this.sort('data');
      this._renderFilms(this._filmsCountRenders, this._filmsDataCurrent);
    });

    this._statsView.setEditClickSortRating(() => {
      this.sort('rating');
      this._renderFilms(this._filmsCountRenders, this._filmsDataCurrent);
    });

    this._statsView.setEditClickSortDefault(() => {
      this.sort('default');
      this._renderFilms(this._filmsCountRenders, this._filmsDataCurrent);
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
    const newPopup = this._modelFilms.filmUpdate(filmPopup);

    if (oldPopup) {
      oldPopup.remove();
      this._renderPopupFilm(newPopup);
      return;
    }

    this._renderPopupFilm(newPopup);
  }

  _handelUserAction(action) {

    switch (action) {
      case USER_ACTIONS.DELETE:

        break;

      default:
        break;
    }
  }

  _deleteComment(filmId, commentId) {
    const film = this._filmsData.find((filmChange) => filmChange.id === filmId);
    const newFilm = {...film,comments:film.comments.filter((comment) => comment.id !== commentId)};
    this._modelFilms.filmUpdate(newFilm);
  }

  _replaceCardFilm(filmData) {
    const oldCardFilm = document.getElementById(filmData.id);
    const newCardFilm = this._modelFilms.filmUpdate(filmData); //Вот тут обновил модель

    const container = document.createElement('div');
    container.classList.add('deiete-dev');
    this._renderCardFilm(newCardFilm, container);

    const changeCard = container.firstChild;
    oldCardFilm.after(changeCard);

    oldCardFilm.remove();
    container.remove();
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
    this._filmsCountRenders = 5;
    this._filmContainerView.clearFilmList();
    this._renderFilmCointainer();
    this._filmContiner = this._filmContainerView.getElement().querySelector('.films-list__container');
    const filmsRenders = filmData.slice(0, filmsCount);

    this._filmsData = this._filterModel.getFilter();

    if (filmData.length === 0) {
      this._renderListEmpty();
      return;
    }

    console.log(filmsCount);
    console.log(filmData);

    if (filmData.length <= filmsCount) {
      for (let i = 0; i < this._filmsData.length; i++) {
        this._renderCardFilm(filmsRenders[i], this._filmContiner);
      }
      this._showMoreView.deleteButton();
      return;
    }

    this._rendershowMore(filmData);
    for (let i = 0; i < filmsCount; i++) {
      this._renderCardFilm(filmsRenders[i], this._filmContiner);
    }
  }

  _rendershowMore(filmData) {
    //Отрисовка фильмов по нажатию кнопки "Загрузить еще".

    const filmsList = this._filmContainerView.getElement().querySelector('.films-list');
    render(filmsList, this._showMoreView, RenderPosition.BEFOREEND);//Рисуем кнопку "Загрузить еще"

    this._showMoreView.setEditClickHandler(() =>{
      this._filmContainerView.clearFilmList();
      this._filmsCountRenders += 5;
      this._renderFilms(this._filmsCountRenders, filmData);
    });
  }

  _renderFooter() {
    //Отрисовка футера и колличества фильмов.
    render(this._siteFooterElement, this._footerElementView, RenderPosition.BEFOREEND);
  }

  _renderListEmpty() {
    this._filmContiner = this._filmContainerView.getElement();
    this._filmContiner.innerHTML = '';

    render(this._filmContiner, this._listEmpty, RenderPosition.AFTERBEGIN);
  }
}
