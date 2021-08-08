import {createFilterStatsTemplate} from './view/filter-stats.js';
import {createFilмListTemplate} from './view/film-list.js';
import {createCardFilmTemplate} from './view/card-film.js';
import {createUserRatingTemplate} from './view/user-rating.js';
import {createShowMoreTemplate} from './view/show-more.js';
import {createPopupFilmDetailsTemplate} from './view/popup-film-details.js';

const COUNT_FILMS_LIST = 5;
const body = document.querySelector('body');

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};


render(siteMainElement, createFilterStatsTemplate(), 'afterbegin');

render(siteMainElement, createFilмListTemplate(), 'beforeend');

//Отрисовываем общий список фильмов
const filmsList = document.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
for (let i = 0; i < COUNT_FILMS_LIST; i++){
  render(filmsListContainer, createCardFilmTemplate(), 'afterbegin');
}


//Отрисовываем звание пользователя
render(siteHeaderElement, createUserRatingTemplate(), 'beforeend');

//Отрисовываем кнопку "загузиьть еще"
render(filmsListContainer, createShowMoreTemplate(), 'afterend');

//Отрисовываем подробную информацию о фильме
render(body, createPopupFilmDetailsTemplate(), 'beforeend');
