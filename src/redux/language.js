import { EN, RU, SELECT_LANGUAGE } from './type';

const initLanguageState = {
    en: {
        id: "id",
        name: "name",
        age: "years old",
        favorites: "favorites",
        minmax: "ascending",
        maxmin: "descending",
        year: "year",
        years: "years",
        ot_year: "years",
        en: "English",
        ru: "Russia",
        filter: "Name Surname",
        table: "table",
        preview: "preview"
    },

    ru: {
        id: "id",
        name: "имя",
        age: "возраст",
        favorites: "избранное",
        minmax: "возрастанию",
        maxmin: "убыванию",
        year: "год",
        years: "лет",
        ot_year: "года",
        en: "Английский",
        ru: "Русский",
        filter: "Имя Фамилия",
        table: "таблица",
        preview: "превью"
    },

    selectLanguage: {
        en: false,
        ru: true
    },

    select: RU
};


const language = (state = initLanguageState, action) => {
    switch (action.type) {

        case SELECT_LANGUAGE:
            let _radioSelectLanguage = Object.assign({}, { en: false, ru: false });
            _radioSelectLanguage[action.value] = true;

            let _select = RU;
            switch (action.value) {
                case RU: _select = RU;
                    break;

                case EN: _select = EN;
                    break;

                default:
                    _select = RU;
                    break;
            }

            return { ...state, selectLanguage: _radioSelectLanguage, select: _select }

        default:
            return state
    }
}

export default language