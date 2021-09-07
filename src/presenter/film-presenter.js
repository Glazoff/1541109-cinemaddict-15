import {render, RenderPosition} from '../utils/render.js';

import generateFilms from '../mock/films.js';

import SiteUserRatingView from '../view/user-rating.js';
import SiteFilterStatsView from '../view/filter-stats.js';
import SiteFilmListView from '../view/film-list.js';
import SiteFooterElementView from '../view/footer-stats';
import SiteShowMoreView from '../view/show-more.js';
import SiteCardFilmView from '../view/card-film.js';
import SitePopupFilmDetailsView from '../view/popup-film-details.js';

const COUNT_FILMS_LIST = 17;

export default class MoviePresenter {
  constructor() {
    this._filmsData = generateFilms(COUNT_FILMS_LIST);
    this._filmsCountRenders = 5;

    this._body = document.querySelector('body');
    this._siteHeaderElement = document.querySelector('.header');
    this._siteMainElement = document.querySelector('.main');
    this._siteFooterElement = document.querySelector('.footer');

    this._userRatingView = new SiteUserRatingView();
    this._flterStatsView = new SiteFilterStatsView(this._filmsData);
    this._filmContainerView = new SiteFilmListView();
    this._footerElementView = new SiteFooterElementView(this._filmsData);
    this._showMoreView = new SiteShowMoreView();
  }

  init() {
    this._renderUserRating();
    this._renderFilterStats();
    this._renderFooter();

    this._renderFilms(this._filmsCountRenders);
  }

  _renderUserRating() {
    //Отрисовка рейтинга пользователя.
    render(this._siteHeaderElement, this._userRatingView, RenderPosition.BEFOREEND);
  }

  _renderFilterStats() {
    //Отрисовка фильтров и статистики.
    render(this._siteMainElement, this._flterStatsView, RenderPosition.AFTERBEGIN);
  }

  _renderFilmCointainer() {
    //Отрисовка контейнера для фильмов.
    render(this._siteMainElement, this._filmContainerView, RenderPosition.BEFOREEND);
  }

  _renderPopupFilm(film) {
    this._filmPopupComponent = new SitePopupFilmDetailsView(film);
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
  }

  _replacePopupFilm(film) {
    const oldPopup = document.querySelector('.film-details');

    if (oldPopup) {
      oldPopup.remove();
      this._renderPopupFilm(film);
      return;
    }

    this._renderPopupFilm(film);
  }

  _renderCardFilm(film) {
    //Отрисовка карточки фильма.
    this._filmComponent = new SiteCardFilmView(film);
    //this._filmPopupComponent = new SitePopupFilmDetailsView(film);
    this._filmContiner = this._filmContainerView.getElement().querySelector('.films-list__container');

    render(this._filmContiner, this._filmComponent, RenderPosition.BEFOREEND);

    this._filmComponent.setEditClickHandler(() => {
      this._replacePopupFilm(film);
    });
  }

  _renderFilms(filmsCount) {
    //Отрисовка списка фильмов.
    this._renderFilmCointainer();
    const filmsRenders = this._filmsData.slice(0, filmsCount);

    if (this._filmsData.length <= this._filmsCountRenders) {
      for (let i = 0; i < this._filmsData.length; i++) {
        this._renderCardFilm(filmsRenders[i]);
      }
      this._showMoreView.deleteButton();
      return;
    }

    this._rendershowMore();
    for (let i = 0; i < filmsCount; i++) {
      this._renderCardFilm(filmsRenders[i]);
    }
  }

  _rendershowMore() {
    //Отрисовка фильмов по нажатию кнопки "Загрузить еще".
    const filmsList = this._filmContainerView.getElement().querySelector('.films-list');
    render(filmsList, this._showMoreView, RenderPosition.BEFOREEND);//Рисуем кнопку "Загрузить еще"

    this._showMoreView.setEditClickHandler(() =>{
      this._filmContainerView.clearFilmList();
      this._filmsCountRenders += 5;
      this._renderFilms(this._filmsCountRenders);
    });
  }

  _renderFooter() {
    //Отрисовка футера и колличества фильмов.
    render(this._siteFooterElement, this._footerElementView, RenderPosition.BEFOREEND);
  }
}
