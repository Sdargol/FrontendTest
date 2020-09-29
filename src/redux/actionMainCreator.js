import { START_APP, SORT, INPUT_FILTER, RADIO_SORT, RADIO_ORDER, FAVORITES, RADIO_VIEW, FAVORITES_VIEW, ADD_ELEMENT_RENDER } from './type';

export function startApp(content, urlParams) {
    return { type: START_APP, content, urlParams }
}

export function sortContent(urlParams) {
    return { type: SORT, urlParams }
}

export function inputFilter(text) {
    return { type: INPUT_FILTER, text }
}

export function radioSort(value, urlParams) {
    return { type: RADIO_SORT, value, urlParams }
}

export function radioOrder(value, urlParams) {
    return { type: RADIO_ORDER, value, urlParams }
}

export function selectFavorites(id) {
    return { type: FAVORITES, id }
}

export function selectView(view) {
    return { type: RADIO_VIEW, view }
}

export function favoritesMode() {
    return { type: FAVORITES_VIEW }
}

export function addElementRender() {
    return { type: ADD_ELEMENT_RENDER }
}