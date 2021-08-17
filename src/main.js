import SiteListEmptyVeiw from './view/list-empty.js';
import SiteFilterStats from './view/filter-stats.js';
import SiteFilmListView from './view/film-list.js';
import SiteCardFilmView from './view/card-film.js';
import SiteUserRatingView from './view/user-rating.js';
import SiteShowMoreView from './view/show-more.js';
import SitePopupFilmDetailsView from './view/popup-film-details.js';
import SiteCommentsView from './view/comment-card.js';
import siteFooterElementView from './view/footer-stats';
import {generateFilm, generateFilmPopup} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {getRandomInteger, renderElement, RenderPosition} from './utils.js';


export const COUNT_FILMS_LIST = 17;


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


const films = new Array(COUNT_FILMS_LIST).fill().map(generateFilm);
renderElement(siteMainElement,new SiteFilterStats().getElement(generateFilters()), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SiteFilmListView().getElement(), RenderPosition.BEFOREEND);

//Отрисовываем общий список фильмов
const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

//Отрисовываем кнопку "загузиьть еще"
renderElement(filmsList, new SiteShowMoreView().getElement(), RenderPosition.BEFOREEND);
const showMoreButton = document.querySelector('.films-list__show-more');

const renderFilm = (container, film) => {
  const filmComponent = new SiteCardFilmView();
  const filmPopupComponent = new SitePopupFilmDetailsView();
  const countComments = getRandomInteger(1,5);

  const createComments = () => {
    const commentList = document.querySelector('.film-details__comments-list');

    for (let i = 0; i < countComments; i++) {
      renderElement(commentList, new SiteCommentsView().getElement(generateFilmPopup()), RenderPosition.BEFOREEND);
    }
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      const commentList = document.querySelector('.film-details__comments-list');
      const popup = document.querySelector('.film-details');

      body.classList.remove('hide-overflow');

      if (commentList === null) {
        return;
      }
      commentList.innerHTML = '';
      popup.remove();
      {true;}
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const openPopupFilm = () => {
    body.classList.add('hide-overflow');

    renderElement(body, filmPopupComponent.getElement(generateFilmPopup(), countComments), RenderPosition.BEFOREEND);
    createComments();
    const closeButtom = document.querySelector('.film-details__close-btn');

    document.addEventListener('keydown', onEscKeyDown);

    closeButtom.addEventListener('click', () => {
      body.classList.remove('hide-overflow');
      const commentList = document.querySelector('.film-details__comments-list');
      const popup = document.querySelector('.film-details');
      if (commentList === null) {
        return;
      }
      commentList.innerHTML = '';
      popup.remove();
      {true;}
    });
  };

  const replacePopup = () => {
    const popup = document.querySelector('.film-details');

    if (!popup) {
      return openPopupFilm();
    }

    const commentList = document.querySelector('.film-details__comments-list');
    commentList.innerHTML = '';
    popup.remove();
    openPopupFilm();
  };

  renderElement(container, filmComponent.getElement(film), RenderPosition.BEFOREEND);

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
let filmsCount = 5;

if (COUNT_FILMS_LIST < 5) {
  showMoreButton.remove();
  for (let i = 0; i < COUNT_FILMS_LIST; i++){
    renderFilm(filmsListContainer, films[i]);
  }
} else {
  for (let i = 0; i < filmsCount; i++){
    renderFilm(filmsListContainer, films[i]);
  }
}


const createFilms = () => {
  filmsCount +=5;

  filmsListContainer.innerHTML = '';

  if (filmsCount > COUNT_FILMS_LIST ) {
    for (let i = 0; i < COUNT_FILMS_LIST; i++){
      renderFilm(filmsListContainer, films[i]);
    }
  } else {
    for (let i = 0; i < filmsCount; i++){
      renderFilm(filmsListContainer, films[i]);
    }
  }

  if(filmsCount >= COUNT_FILMS_LIST) {
    showMoreButton.remove();
  }
};

showMoreButton.addEventListener('click', ()=> {
  createFilms();
});


//Отрисовываем звание пользователя
renderElement(siteHeaderElement, new SiteUserRatingView().getElement(), RenderPosition.BEFOREEND);


//Отрисовываем кол-во фильмов в футере
renderElement(siteFooterElement, new siteFooterElementView().getElement(COUNT_FILMS_LIST), RenderPosition.BEFOREEND);

renderListEpmty();
