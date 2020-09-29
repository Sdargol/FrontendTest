import React from 'react';
import { connect } from 'react-redux';

import { PREVIEW, TABLE } from '../redux/type';
import { selectFavorites } from '../redux/actionMainCreator';
import { RowViewer } from '../component/RowViewer';
import { PreviewViewer } from '../component/PreviewViewer';
import PreviewVideoViewer from '../component/PreviewVideoViewer';

class Viewer extends React.Component {
    constructor(props) {
        super(props);

        this.flterEnter = this.flterEnter.bind(this);
        this.printOutArray = this.printOutArray.bind(this);
        this.handleClickPlay = this.handleClickPlay.bind(this);
        this.setRefPlayVideo = this.setRefPlayVideo.bind(this);
        this.handleClickFavourite = this.handleClickFavourite.bind(this);
        this.favoritesFilter = this.favoritesFilter.bind(this);

        this.state = {
            autoplay: true,
            displayPlayBtn: true,
            displayControls: false,
            refPlayVideo: null
        }
    }

    handleClickFavourite(event, id) {
        this.props.dispatch(selectFavorites(id));
    }

    handleClickPlay() {
        this.setState({ displayControls: true, autoplay: false, displayPlayBtn: false });
    }

    setRefPlayVideo(value) {
        if (value) {
            //console.log(value);
            this.setState({ refPlayVideo: value });
        }
    }

    //на входе принимаем массив из state, на выходе возращаем массив, удовлетворяющий фильтру
    flterEnter(arrIn, _filter) {
        let _arrOut = [];

        _filter = _filter.toLowerCase();

        let separator = ' ';
        let arrayOfStrings = _filter.split(separator);
        let filterInputArr = [];

        arrayOfStrings.forEach(element => {
            if ((element !== separator) && (element !== "")) {
                filterInputArr.push(element);
                //console.log(filterInputArr);
            }
        });

        if (!filterInputArr.length) {
            return arrIn;
        }

        let flag = 0;

        arrIn.forEach((element) => { // цикл 1

            flag = 0;
            let inName = element.name.replace(/\s/g, '').toLowerCase();

            for (let i = 0; i < filterInputArr.length; i++) {
                if (inName.includes(filterInputArr[i])) {
                    flag++;
                }
            }

            if ((flag / filterInputArr.length) === 1) {
                _arrOut.push(element);
            }

            //console.log(inName);

        }); // цикл 1 конец

        return _arrOut;
    }

    // на входе массив и значение отображения избранного из state
    favoritesFilter(arrIn, favorites) {
        let _arrOut = [];

        if (favorites) {
            arrIn.forEach(element => { if (element.favourite) _arrOut.push(element); });

            return _arrOut;
        } else {
            return arrIn;
        }
    }

    printOutArray(_view) {
        let _filteringArray = this.favoritesFilter(this.flterEnter(this.props.content, this.props.filterInput), this.props.favorites);

        let _outFilteringArray = [];


        switch (_view) {
            case TABLE:
                //_outFilteringArray = _filteringArray.map((value, index) => <RowViewer {...value} key={index} handleClickFavourite = {this.handleClickFavourite}/>);

                if (this.props.filterInput || this.props.favorites) { //проверка для того, чтобы при включеном фильтре или избранном не рендерить пустые элементы
                    let _index = 0;
                    _filteringArray.forEach(element => {
                        let O_o = 0.8 + _index * 0.02 + "s";
                        let _objClassAnim = Object.assign({}, { animationName: this.props.classAnimationRow, animationDuration: O_o });
                        _outFilteringArray.push(<RowViewer __animation={_objClassAnim} {...element} key={_index} handleClickFavourite={this.handleClickFavourite} language={this.props.language} />);
                        _index++;

                    });
                } else {

                    for (let i = 0; i < this.props.countRenderElement; i++) {
                        let O_o = "1s";
                        if (!this.props.isAddScroll) O_o = 0.8 + i * 0.02 + "s";

                        let _objClassAnim = Object.assign({}, { animationName: this.props.classAnimationRow, animationDuration: O_o });
                        _outFilteringArray.push(<RowViewer __animation={_objClassAnim} {..._filteringArray[i]} key={i} handleClickFavourite={this.handleClickFavourite} language={this.props.language} />);
                    }
                }

                return <div className="mainContainer_viewer">{_outFilteringArray}</div>;

            case PREVIEW:
                if (this.props.filterInput || this.props.favorites) { //проверка для того, чтобы при включеном фильтре или избранном не рендерить пустые элементы 
                    let _i = 0;
                    _filteringArray.forEach(element => {
                        let _animationDuration = 0.8 + _i * 0.02 + "s";
                        let _objClassCard = Object.assign({}, { animationName: this.props.classAnimationRow, animationDuration: _animationDuration });
                        let _objClassAnimName = Object.assign({}, { animationName: this.props.classAnimationName, animationDuration: _animationDuration });
                        let _objClassAnimPhrase = Object.assign({}, { animationName: this.props.classAnimationPhrase, animationDuration: _animationDuration });
                        let _objClassAnimText = Object.assign({}, { animationName: this.props.classAnimationText, animationDuration: _animationDuration });
                        if (element.video) {
                            _outFilteringArray.push(
                                <PreviewVideoViewer {...element}
                                    key={_i}
                                    handleClick={this.handleClickPlay}
                                    {...this.state}
                                    setRef={this.setRefPlayVideo}
                                    handleClickFavourite={this.handleClickFavourite}
                                    _objClassAnimName={_objClassAnimName}
                                    _objClassAnimPhrase={_objClassAnimPhrase}
                                    _objClassAnimText={_objClassAnimText}
                                    _objClassCard={_objClassCard} 
                                    language={this.props.language}/>
                            );
                        } else {
                            _outFilteringArray.push(<PreviewViewer {...element}
                                key={_i}
                                handleClickFavourite={this.handleClickFavourite}
                                _objClassAnimName={_objClassAnimName}
                                _objClassAnimPhrase={_objClassAnimPhrase}
                                _objClassAnimText={_objClassAnimText}
                                _objClassCard={_objClassCard} 
                                language={this.props.language}/>
                            );
                        }
                        _i++;
                    });
                } else { 
                    for (let i = 0; i < this.props.countRenderElement; i++) {
                        let _animationDuration = "1s";
                        if (!this.props.isAddScroll) _animationDuration = 0.8 + i * 0.02 + "s";

                        let _objClassCard = Object.assign({}, { animationName: this.props.classAnimationRow, animationDuration: _animationDuration });
                        let _objClassAnimName = Object.assign({}, { animationName: this.props.classAnimationName, animationDuration: _animationDuration });
                        let _objClassAnimPhrase = Object.assign({}, { animationName: this.props.classAnimationPhrase, animationDuration: _animationDuration });
                        let _objClassAnimText = Object.assign({}, { animationName: this.props.classAnimationText, animationDuration: _animationDuration });

                        if (_filteringArray[i].video) { 
                            _outFilteringArray.push(
                                <PreviewVideoViewer {..._filteringArray[i]}
                                    key={i}
                                    handleClick={this.handleClickPlay}
                                    {...this.state}
                                    setRef={this.setRefPlayVideo}
                                    handleClickFavourite={this.handleClickFavourite}
                                    _objClassAnimName={_objClassAnimName}
                                    _objClassAnimPhrase={_objClassAnimPhrase}
                                    _objClassAnimText={_objClassAnimText}
                                    _objClassCard={_objClassCard} 
                                    language={this.props.language}/>
                            );
                        } else {
                            _outFilteringArray.push(<PreviewViewer {..._filteringArray[i]}
                                key={i}
                                handleClickFavourite={this.handleClickFavourite}
                                _objClassAnimName={_objClassAnimName}
                                _objClassAnimPhrase={_objClassAnimPhrase}
                                _objClassAnimText={_objClassAnimText}
                                _objClassCard={_objClassCard} 
                                language={this.props.language}/>
                            );
                        }
                    } //end for
                }//end else

                return <div className="PreviewViewer">{_outFilteringArray}</div>; 
                //end PREVIEW

            default:
                _outFilteringArray = _filteringArray.map((value, index) => <RowViewer  {...value} key={index} handleClickFavourite={this.handleClickFavourite} language={this.props.language} />);
                return <div className="mainContainer_viewer">{_outFilteringArray}</div>;
        }

    }

    render() {
        let _view_mode = TABLE;

        for (let key in this.props.view) {
            if (this.props.view[key]) _view_mode = key;
        }

        return this.printOutArray(_view_mode);
    }
}

const mapStateToProps = state => ({
    content: state.main.content,
    filterInput: state.main.filter,
    view: state.main.radioView,
    language: state.language,
    favorites: state.main.favorites,
    classAnimationRow: state.main.classAnimationRow,
    classAnimationName: state.main.classAnimationPreviewName,
    classAnimationText: state.main.classAnimationPreviewText,
    classAnimationPhrase: state.main.classAnimationPreviewPhrase,
    countRenderElement: state.main.countRenderElement,
    isAddScroll: state.main.isAddScroll
})

export default connect(mapStateToProps)(Viewer);