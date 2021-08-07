import {createFilterStatsTemplate} from './view/filter-stats.js';
import {createFilmListTemplate} from './view/film-list.js';
import {createCardFilmTemplate} from './view/card-film.js';
import {createUserRatingTemplate} from './view/user-rating.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createPopupFilmDetailsTemplate} from './view/popup-film-details.js';
import {createCommentsTemplate} from './view/comment-card.js';
import {generateFilm, generateFilmPopup} from './mock/film.js';
import {generateFilters} from './mock/filter.js';
import {getRandomInteger} from './util.js';


const COUNT_FILMS_LIST = 17;
const countComments = getRandomInteger(1,5);

const body = document.querySelector('body');

const films = new Array(COUNT_FILMS_LIST).fill().map(generateFilm);
const filters = generateFilters;

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteMainElement, createFilterStatsTemplate(filters()), 'afterbegin');

render(siteMainElement, createFilmListTemplate(), 'beforeend');

//Отрисовываем общий список фильмов
const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');

//Отрисовываем кнопку "загузиьть еще"
render(filmsListContainer, createShowMoreTemplate(), 'afterend');


const showMoreButton = document.querySelector('.films-list__show-more');

let filmsCount = 5;

for (let i = 0; i < filmsCount; i++){
  render(filmsListContainer, createCardFilmTemplate(films[i]), 'beforeend');
}

const createFilms = () => {
  filmsCount +=5;

  filmsListContainer.innerHTML = '';

  if (filmsCount > COUNT_FILMS_LIST ) {
    for (let i = 0; i < COUNT_FILMS_LIST; i++){
      render(filmsListContainer, createCardFilmTemplate(films[i]), 'beforeend');
    }
  } else {
    for (let i = 0; i < filmsCount; i++){
      render(filmsListContainer, createCardFilmTemplate(films[i]), 'beforeend');
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
render(siteHeaderElement, createUserRatingTemplate(), 'beforeend');


//Отрисовываем подробную информацию о фильме
render(body, createPopupFilmDetailsTemplate(generateFilmPopup(), countComments), 'beforeend');

//Отрисовка комментариев
const commentList = document.querySelector('.film-details__comments-list');
for (let i = 0; i < countComments; i++) {
  render(commentList, createCommentsTemplate(generateFilmPopup([0])), 'beforeend');
}


