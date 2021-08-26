import {generateFilters} from './mock/filter.js';
import generateFilms from './mock/films.js';

import {render, RenderPosition} from './utils/render.js';

import SiteListEmptyVeiw from './view/list-empty.js';
import SiteFilterStatsView from './view/filter-stats.js';
import SiteFilmListView from './view/film-list.js';
import SiteCardFilmView from './view/card-film.js';
import SiteUserRatingView from './view/user-rating.js';
import SiteShowMoreView from './view/show-more.js';
import SitePopupFilmDetailsView from './view/popup-film-details.js';
import SiteFooterElementView from './view/footer-stats';


export const COUNT_FILMS_LIST = 22;


const body = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');


const renderListEpmty = () => {
  if (COUNT_FILMS_LIST === 0) {
    body.innerHTML = '';

    return render(body, new SiteListEmptyVeiw(), RenderPosition.BEFOREEND);
  }
};


const films = generateFilms(COUNT_FILMS_LIST);


//Отрисовываем звание пользователя
render(siteHeaderElement, new SiteUserRatingView(), RenderPosition.BEFOREEND);


render(siteMainElement,new SiteFilterStatsView(generateFilters()), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SiteFilmListView(), RenderPosition.BEFOREEND);


//Отрисовываем общий список фильмов
const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');


const renderFilm = (container, film) => {
  const filmComponent = new SiteCardFilmView(film);
  const filmPopupComponent = new SitePopupFilmDetailsView(film);

  const openPopupFilm = () => {
    body.classList.add('hide-overflow');
    render(body, filmPopupComponent, RenderPosition.BEFOREEND);
    const closeButtom = document.querySelector('.film-details__close-btn');
    const popup = document.querySelector('.film-details');

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        body.classList.remove('hide-overflow');
        popup.remove();
        filmPopupComponent.removeElement();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onClickButton = () => {
      body.classList.remove('hide-overflow');
      popup.remove();
      filmPopupComponent.removeElement();
      closeButtom.removeEventListener('click', onClickButton);
    };

    document.addEventListener('keydown', onEscKeyDown);
    closeButtom.addEventListener('click', onClickButton);
  };

  const replacePopup = () => {
    const popup = document.querySelector('.film-details');

    if (!popup) {
      return openPopupFilm();
    }

    popup.remove();
    openPopupFilm();
  };

  render(container, filmComponent, RenderPosition.BEFOREEND);

  filmComponent.setEditClickHandler(() => {
    replacePopup();
  });
};


//Отрисовываем кнопку "загузиьть еще"
const showMoreButton = new SiteShowMoreView();
render(filmsList, showMoreButton, RenderPosition.BEFOREEND);


//Отрисовка карточек фильмов
const renderFilms = () => {
  let filmsCount = 5;
  let filmsRenders = films.slice(0, filmsCount);

  for (let i = 0; i < filmsRenders.length; i++){
    (filmsCount >= COUNT_FILMS_LIST)? showMoreButton.getElement().remove(): false;

    renderFilm(filmsListContainer, filmsRenders[i]);
  }

  const renderFilmsMore = () => {
    filmsCount +=5;
    filmsRenders = films.slice(0, filmsCount);
    filmsListContainer.innerHTML = '';

    for (let i = 0; i < filmsRenders.length; i++){
      (filmsCount >= COUNT_FILMS_LIST)? showMoreButton.getElement().remove(): false;

      renderFilm(filmsListContainer, filmsRenders[i]);
    }
  };


  showMoreButton.setEditClickHandler(() => {
    renderFilmsMore();
  });
};


//Отрисовываем кол-во фильмов в футере
render(siteFooterElement, new SiteFooterElementView(COUNT_FILMS_LIST), RenderPosition.BEFOREEND);


renderFilms();
renderListEpmty();
