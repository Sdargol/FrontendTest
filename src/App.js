import React from 'react';
import { connect } from 'react-redux';

import {urlParamsToObject} from './url/urlControl';
import {startApp, addElementRender} from './redux/actionMainCreator';
import Header from './container/Header';
import Viewer from './container/Viewer';

class App extends React.Component {
  constructor(props){
    super(props);

    this.handlerScroll = this.handlerScroll.bind(this);
  }

  handlerScroll() {
    if(this.props.countRenderElement < this.props.content.length){
      if((document.documentElement.scrollHeight - document.documentElement.clientHeight) === window.pageYOffset) this.props.dispatch(addElementRender());
    }
  }
  
  componentDidMount() {
    fetch('/data.json').then(response => response.json()).then(content => this.props.dispatch(startApp(content, urlParamsToObject(window.location.href))));

    window.addEventListener('scroll', this.handlerScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handlerScroll);
  }

  
  render() { 
    return (
      <div className = "app">
        <div className = "container">
          <Header/>
          <Viewer/>
        </div> 
      </div>
    );
  }
}


const mapStateToProps = state => ({
  content: state.main.content,
  countRenderElement : state.main.countRenderElement
})


export default connect(mapStateToProps)(App);
