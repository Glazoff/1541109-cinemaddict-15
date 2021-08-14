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
const countComments = getRandomInteger(1,5);

const body = document.querySelector('body');
const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');
const siteFooterElement = document.querySelector('.footer');


const films = new Array(COUNT_FILMS_LIST).fill().map(generateFilm);
//renderTemplate(siteMainElement, createFilterStatsTemplate(generateFilters()), 'afterbegin');
renderElement(siteMainElement,new SiteFilterStats().getElement(generateFilters()), RenderPosition.AFTERBEGIN);
renderElement(siteMainElement, new SiteFilmListView().getElement(), RenderPosition.BEFOREEND);

//Отрисовываем общий список фильмов
const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

//Отрисовываем кнопку "загузиьть еще"
renderElement(filmsList, new SiteShowMoreView().getElement(), RenderPosition.BEFOREEND);


const showMoreButton = document.querySelector('.films-list__show-more');

let filmsCount = 5;

for (let i = 0; i < filmsCount; i++){
  renderElement(filmsListContainer, new SiteCardFilmView().getElement(films[i]), RenderPosition.BEFOREEND);
}

const createFilms = () => {
  filmsCount +=5;

  filmsListContainer.innerHTML = '';

  if (filmsCount > COUNT_FILMS_LIST ) {
    for (let i = 0; i < COUNT_FILMS_LIST; i++){
      renderElement(filmsListContainer, new SiteCardFilmView().getElement(films[i]), RenderPosition.BEFOREEND);
    }
  } else {
    for (let i = 0; i < filmsCount; i++){
      renderElement(filmsListContainer, new SiteCardFilmView().getElement(films[i]), RenderPosition.BEFOREEND);
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


//функция открытия/закрытия подробной инфомрации о фильме
const showAndClosePopupFilm = () => {
  //Отрисовываем подробную информацию о фильме
  renderElement(body, new SitePopupFilmDetailsView().getElement(generateFilmPopup([0]), countComments), RenderPosition.BEFOREEND);


  //Отрисовка комментариев
  const commentList = document.querySelector('.film-details__comments-list');
  for (let i = 0; i < countComments; i++) {
    renderElement(commentList, new SiteCommentsView().getElement(generateFilmPopup([0])), RenderPosition.BEFOREEND);
  }
};

//Отрисовываем кол-во фильмов в футере
renderElement(siteFooterElement, new siteFooterElementView().getElement(COUNT_FILMS_LIST), RenderPosition.BEFOREEND);

