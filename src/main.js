import {createFilterStatsTemplate} from './view/filter-stats.js';
import {createFilmList} from './view/film-list.js';
import {createCardFilm} from './view/card-film.js';
import {createUserRating} from './view/user-rating.js';
import {createShowMore} from './view/show-more.js';
import {createPopupFilmDetails} from './view/popup-film-details.js';
import {generateFilm, generateFilmPopup} from './mock/film.js';
import {createComments} from './view/comment-card.js';

const COUNT_FILMS_LIST = 5;
const body = document.querySelector('body');
console.log(generateFilmPopup());

const films = new Array(COUNT_FILMS_LIST).fill().map(generateFilm);

const siteMainElement = document.querySelector('.main');
const siteHederElement = document.querySelector('.header');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


render(siteMainElement, createFilterStatsTemplate(), 'afterbegin');

render(siteMainElement, createFilmList(), 'beforeend');

//Отрисовываем общий список фильмов
const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
for (let i = 0; i < COUNT_FILMS_LIST; i++){
  render(filmsListContainer, createCardFilm(films[i]), 'afterbegin');
}


//Отрисовываем звание пользователя
render(siteHederElement, createUserRating(), 'beforeend');

//Отрисовываем кнопку "загузиьть еще"
render(filmsListContainer, createShowMore(), 'afterend');

//Отрисовываем подробную информацию о фильме
render(body, createPopupFilmDetails(generateFilmPopup()), 'beforeend');


const commentList = document.querySelector('.film-details__comments-list');
render(commentList, createComments(), 'beforeend');
