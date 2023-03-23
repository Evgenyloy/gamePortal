import React, { Component } from 'react';
import { Transition } from 'react-transition-group';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
import './certainNews.scss';

class CertainNews extends Component {
  constructor(props) {
    super(props);

    this.myRef = React.createRef();
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    this.myRef.current.innerHTML = this.props.news.article_content;
  }

  render() {
    return (
      <Transition in timeout={duration} appear mountOnEnter>
        {(state) => (
          <div
            className="certain-news"
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <div className="container">
              <div className="certain-news__header">
                <h3 className="certain-news__title">
                  {' '}
                  {this.props.news.title}
                </h3>
                <p className="certain-news__desc">
                  {this.props.news.short_description}
                </p>
              </div>
              <div className="certain-news__content" ref={this.myRef}></div>
            </div>
          </div>
        )}
      </Transition>
    );
  }
}
export default CertainNews;
