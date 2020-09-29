import React from 'react';
import { connect } from 'react-redux';

import { HeaderRadio } from '../component/HeaderRadio';
import { radioSort, radioOrder, inputFilter, selectView, favoritesMode } from '../redux/actionMainCreator';
import { selectLanguage } from '../redux/actionLanguageCreator';
import { urlParamsToObject, urlSetParams, urlCreateParamsObject } from '../url/urlControl';

class Header extends React.Component {
    constructor(props) {
        super(props);

        this.handleRadioSort = this.handleRadioSort.bind(this);
        this.handleChangeInput = this.handleChangeInput.bind(this);
        this.handleRadioOrder = this.handleRadioOrder.bind(this);
        this.handlerRadioLanguage = this.handlerRadioLanguage.bind(this);
        this.handlerRadioView = this.handlerRadioView.bind(this);
        this.handlerClickFavorites = this.handlerClickFavorites.bind(this);
    }

    handleRadioSort(event) {
        urlSetParams(window.location.href, urlCreateParamsObject('sort', event.target.value));
        this.props.dispatch(radioSort(event.target.value, urlParamsToObject(window.location.href)));
    }

    handleRadioOrder(event) {
        urlSetParams(window.location.href, urlCreateParamsObject('order', event.target.value));
        this.props.dispatch(radioOrder(event.target.value, urlParamsToObject(window.location.href)));
    }

    handleChangeInput(event) {
        urlSetParams(window.location.href, urlCreateParamsObject('filter', event.target.value)); 
        this.props.dispatch(inputFilter(event.target.value));
    }

    handlerRadioLanguage(event){
        this.props.dispatch(selectLanguage(event.target.value));
    }

    handlerRadioView(event){
        urlSetParams(window.location.href, urlCreateParamsObject('view', event.target.value));
        this.props.dispatch(selectView(event.target.value));
    }

    handlerClickFavorites(){
        this.props.dispatch(favoritesMode());
    }

    render() {
        return (
            <header>
                {/* handleRadio - обработчик изменения, valueItem - массив из состояния с названиями и значаниями, nameId - уникальный id, language - словарь */}
                <HeaderRadio handleRadio={this.handleRadioSort} valueItem={this.props.radioSort} nameId="radioSort" language = {this.props.language} />
                <HeaderRadio handleRadio={this.handleRadioOrder} valueItem={this.props.radioOrder} nameId="radioOrder" language = {this.props.language}/>
                <HeaderRadio handleRadio={this.handlerRadioLanguage} valueItem={this.props.language.selectLanguage} nameId="radioLanguage" language = {this.props.language}/>
                <div><button onClick={this.handlerClickFavorites} className="btn-header">{this.props.language[this.props.language.select].favorites}</button></div>
                <HeaderRadio handleRadio={this.handlerRadioView} valueItem={this.props.radioView} nameId="radioView" language = {this.props.language}/>
                <div><input className="header_input" onChange={this.handleChangeInput} placeholder={this.props.language[this.props.language.select].filter} name="text" autoComplete="off" value={this.props.filterInput} maxLength="400"></input> </div>
            </header>
        )
    }
}

const mapStateToProps = state => ({
    radioSort: state.main.radioSort,
    filterInput: state.main.filter,
    radioOrder: state.main.radioOrder,
    radioView: state.main.radioView,
    language: state.language
})

export default connect(mapStateToProps)(Header);