import {Observable} from '../utils/common.js';


export default class Filters {
  constructor() {
    this._filter;
    this.filterChanges = new Observable();
  }

  setFilters(films) {
    this._filter = films.slice();
    this.filterChanges.next(this._filter);
  }

  getFilter() {
    return this._filter;
  }
}

