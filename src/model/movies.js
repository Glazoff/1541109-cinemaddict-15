import {Observable} from '../utils/common.js';


export default class Movies {
  constructor() {
    this._films = [];
    this.filmsChanges = new Observable();
  }

  setFilms(films) {
    this._films = films.slice();
    this.filmsChanges.next(this._films);
  }

  getFilms() {
    return this._films;
  }

  filmUpdate(changeFilm) {
    const films = this._films.map((film) => changeFilm.id === film.id  ? film = changeFilm : film);
    this.setFilms(films);
    return changeFilm;
  }
}
