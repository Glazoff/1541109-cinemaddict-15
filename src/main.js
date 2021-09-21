import generateFilms from './mock/films.js';

import Movies from './model/movies.js';
import Filters from './model/filter.js';
import MoviePresenter from './presenter/film-presenter.js';
import FilterPresenter from './presenter/filter-presentor.js';

const COUNT_FILMS_LIST = 6;

const films = generateFilms(COUNT_FILMS_LIST);

const movieModel = new Movies();
movieModel.setFilms(films);

const filterModel = new Filters();
filterModel.setFilters(films);

const appMovie = new MoviePresenter(movieModel, filterModel);
appMovie.init();


const filter = new FilterPresenter(filterModel, movieModel);
filter.init();
