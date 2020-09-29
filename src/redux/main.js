import { START_APP, SORT, INPUT_FILTER, RADIO_SORT, RADIO_ORDER, FAVORITES, RADIO_VIEW, TABLE, PREVIEW, FAVORITES_VIEW, ADD_ELEMENT_RENDER } from './type';
import { getSortArray } from "./sortArray";

const initMainState = {
  content: [],

  filter: "",

  radioSort: {
    id: true,
    name: false,
    age: false
  },

  radioOrder: {
    minmax: true,
    maxmin: false
  },

  radioView: {
    table: true,
    preview: false
  },

  favorites: false,

  classAnimationRow: "rowAnimKey",
  classAnimationPreviewName: "PreviewNameAnimationKey",
  classAnimationPreviewPhrase: "PreviewPhraseAnimationKey",
  classAnimationPreviewText: "PreviewTextAnimationKey",

  countRenderElement : 15,
  isAddScroll : false

};

// принимаем название анимации из state, исходное название анимации (как в initMainState), и фразу, которую добавим, что бы установить другую анимацию
const switchClassAnimation = (state_classAnimation, value_classAnimation, T) => {
  if(state_classAnimation === value_classAnimation){
    return value_classAnimation + T;
  }else{
    return value_classAnimation;
  }
}

const main = (state = initMainState, action) => {
  switch (action.type) {
    case START_APP: // START_APP
      let _content = getSortArray(action.content, action.urlParams);
      let _radioSortStart = Object.assign({}, { id: true, name: false, age: false });
      let _radioOrderStart = Object.assign({}, { minmax: true, maxmin: false });
      let _radioView_s = Object.assign({}, { table: false, preview: false});
      let _filter = "";

      if (action.urlParams.sort) {
        _radioSortStart.id = false;
        _radioSortStart[action.urlParams.sort] = true;
      }

      if (action.urlParams.order) {
        _radioOrderStart.minmax = false;
        _radioOrderStart[action.urlParams.order] = true;
      }

      if (action.urlParams.filter) {
        _filter = action.urlParams.filter;
      }

      if (action.urlParams.view === TABLE || action.urlParams.view === PREVIEW) {
        _radioView_s[action.urlParams.view] = true;
      } else {
        _radioView_s[TABLE] = true;
      }

      return (
        { ...state, content: [..._content], filter: _filter, radioSort: _radioSortStart, radioView: _radioView_s, radioOrder: _radioOrderStart }
      ) // ~START_APP

    case SORT:
      let _arrContent = getSortArray(state.content, action.urlParams);
      return (
        { ...state, content: [..._arrContent] }
      )

    case INPUT_FILTER:
      return { ...state, filter: action.text }

    case RADIO_SORT: // при переключении radio с типом сортировки меняем radioSort(установить активное значение) и сортируем массив
      let _radioSort = Object.assign({}, { id: false, name: false, age: false });
      _radioSort[action.value] = true;
      console.log(action.urlParams);

      let _getArrContent = getSortArray(state.content, action.urlParams);

      let __animName = switchClassAnimation(state.classAnimationRow, "rowAnimKey", "T");
      let __animNamePreviewName = switchClassAnimation(state.classAnimationPreviewName, "PreviewNameAnimationKey", "T");
      let __animNamePreviewPhrase = switchClassAnimation(state.classAnimationPreviewPhrase, "PreviewPhraseAnimationKey", "T");
      let __animNamePreviewText = switchClassAnimation(state.classAnimationPreviewText, "PreviewTextAnimationKey", "T");
      
      return { ...state, content: [..._getArrContent], radioSort: _radioSort, 
        classAnimationRow: __animName, 
        classAnimationPreviewName: __animNamePreviewName, 
        classAnimationPreviewPhrase: __animNamePreviewPhrase, 
        classAnimationPreviewText: __animNamePreviewText,
        isAddScroll : false
      }

    case RADIO_ORDER: // при переключении radio с порядком меняем radioOrder(установить активное значение) и сортируем массив
      let _radioOrder = Object.assign({}, { minmax: false, maxmin: false });
      _radioOrder[action.value] = true;
     
      let _getArrContentOrder = getSortArray(state.content, action.urlParams);

      let __animName_o = switchClassAnimation(state.classAnimationRow, "rowAnimKey", "T");
      let __animNamePreviewName_o = switchClassAnimation(state.classAnimationPreviewName, "PreviewNameAnimationKey", "T");
      let __animNamePreviewPhrase_o = switchClassAnimation(state.classAnimationPreviewPhrase, "PreviewPhraseAnimationKey", "T");
      let __animNamePreviewText_o = switchClassAnimation(state.classAnimationPreviewText, "PreviewTextAnimationKey", "T");
      
      return { ...state, content: [..._getArrContentOrder], radioOrder: _radioOrder,
        classAnimationRow: __animName_o, 
        classAnimationPreviewName: __animNamePreviewName_o, 
        classAnimationPreviewPhrase: __animNamePreviewPhrase_o, 
        classAnimationPreviewText: __animNamePreviewText_o,
        isAddScroll : false }

    case FAVORITES:
      let _searchIndexToID = 0;
      let _tmpArr = state.content.slice();

      for (let i = 0; i < _tmpArr.length; i++) {
        if (_tmpArr[i].id === action.id) {
          _searchIndexToID = i;
        }
      }

      _tmpArr[_searchIndexToID].favourite = !_tmpArr[_searchIndexToID].favourite;

      return { ...state, content: _tmpArr }

    case RADIO_VIEW:
      let _radioView = Object.assign({}, { table: false, preview: false});
      _radioView[action.view] = true;
      return {...state,  radioView : _radioView, isAddScroll : false}

    case FAVORITES_VIEW:
      let favoritesMode = !state.favorites;
      return {...state, favorites: favoritesMode, isAddScroll : false}
      
    case ADD_ELEMENT_RENDER:
      return {...state, countRenderElement: state.countRenderElement + 1, isAddScroll: true} 

    default:
      return state
  }
}

export default main