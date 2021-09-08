import AbstractView from './abstract.js';


const createStatsTemplate = () => `<ul class="sort">
  <li><a href="#" class="sort__button sort__button_default sort__button--active">Sort by default</a></li>
  <li><a href="#" class="sort__button sort__button_date">Sort by date</a></li>
  <li><a href="#" class="sort__button sort__button_rating">Sort by rating</a></li>
</ul>`;

export default class SiteStats extends AbstractView {
  constructor() {
    super();

    this._editClickSortByData = this._editClickSortByData.bind(this);
    this._editClickSortRating = this._editClickSortRating.bind(this);
    this._editClickSortDefault = this._editClickSortDefault.bind(this);
  }

  getTemplate() {
    return createStatsTemplate();
  }

  _editClickSortDefault(evt) {
    evt.preventDefault();
    this._callback.editSortDefault();
  }

  _editClickSortByData(evt) {
    evt.preventDefault();
    this._callback.editSortByData();
  }

  _editClickSortRating(evt) {
    evt.preventDefault();
    this._callback.editSortRating();
  }

  setEditClickSortDefault(callback) {
    this._callback.editSortDefault = callback;
    this.getElement().querySelector('.sort__button_default').addEventListener('click', this._editClickSortDefault);
  }

  setEditClickSortByData(callback) {
    this._callback.editSortByData = callback;
    this.getElement().querySelector('.sort__button_date').addEventListener('click', this._editClickSortByData);
  }

  setEditClickSortRating(callback) {
    this._callback.editSortRating = callback;
    this.getElement().querySelector('.sort__button_rating').addEventListener('click', this._editClickSortRating);
  }
}
//
