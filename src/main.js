import {generateFilters} from './mock/filter.js';
import generateFilms from './mock/films.js';

import {renderElement, RenderPosition} from './utils.js';

import SiteListEmptyVeiw from './view/list-empty.js';
import SiteFilterStats from './view/filter-stats.js';
import SiteFilmListView from './view/film-list.js';
import SiteCardFilmView from './view/card-film.js';
import SiteUserRatingView from './view/user-rating.js';
import SiteShowMoreView from './view/show-more.js';
import SitePopupFilmDetailsView from './view/popup-film-details.js';
import siteFooterElementView from './view/footer-stats';


export const COUNT_FILMS_LIST = 22;


const body = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');

const renderListEpmty = () => {
  if (COUNT_FILMS_LIST === 0) {
    body.innerHTML = '';

    return renderElement(body, new SiteListEmptyVeiw().getElement(), RenderPosition.BEFOREEND);
  }
};


const films = generateFilms(COUNT_FILMS_LIST);

renderElement(siteMainElement,new SiteFilterStats(generateFilters()).getElement(), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SiteFilmListView().getElement(), RenderPosition.BEFOREEND);
//Отрисовываем общий список фильмов
const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

//Отрисовываем кнопку "загузиьть еще"
renderElement(filmsList, new SiteShowMoreView().getElement(), RenderPosition.BEFOREEND);
const showMoreButton = document.querySelector('.films-list__show-more');


const renderFilm = (container, film) => {
  const filmComponent = new SiteCardFilmView(film);
  const filmPopupComponent = new SitePopupFilmDetailsView(film);

  const openPopupFilm = () => {
    body.classList.add('hide-overflow');
    renderElement(body, filmPopupComponent.getElement(), RenderPosition.BEFOREEND);
    const closeButtom = document.querySelector('.film-details__close-btn');
    const popup = document.querySelector('.film-details');

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        body.classList.remove('hide-overflow');
        popup.remove();
        filmPopupComponent.remuveElement();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onClickButton = () => {
      body.classList.remove('hide-overflow');
      popup.remove();
      filmPopupComponent.remuveElement();
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

  renderElement(container, filmComponent.getElement(), RenderPosition.BEFOREEND);

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', ()=> {
    replacePopup();
  });
  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', ()=> {
    replacePopup();
  });
  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', (evt)=> {
    evt.preventDefault();
    replacePopup();
  });

};


//Отрисовка карточек фильмов
const renderFilms = () => {
  let filmsCount = 5;
  let filmsRenders = films.slice(0, filmsCount);

  for (let i = 0; i < filmsRenders.length; i++){
    renderFilm(filmsListContainer, filmsRenders[i]);
  }

  const renderFilmsMore = () => {
    filmsCount +=5;
    filmsRenders = films.slice(0, filmsCount);
    filmsListContainer.innerHTML = '';

    for (let i = 0; i < filmsRenders.length; i++){
      renderFilm(filmsListContainer, filmsRenders[i]);
    }

    if(filmsCount >= COUNT_FILMS_LIST) {
      showMoreButton.remove();
    }
  };

  showMoreButton.addEventListener('click', () => {
    renderFilmsMore();
  });
};

//Отрисовываем звание пользователя
renderElement(siteHeaderElement, new SiteUserRatingView().getElement(), RenderPosition.BEFOREEND);


//Отрисовываем кол-во фильмов в футере
renderElement(siteFooterElement, new siteFooterElementView(COUNT_FILMS_LIST).getElement(), RenderPosition.BEFOREEND);

renderFilms();
renderListEpmty();
