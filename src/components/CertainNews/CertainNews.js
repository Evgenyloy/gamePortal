import React, { Component } from 'react';

import './certainNews.scss';

class CertainNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certainNews: this.props.news.article_content,
      title: this.props.news.title,
      description: this.props.news.short_description,
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;

    this.myRef.current.innerHTML = this.state.certainNews;
  }

  render() {
    return (
      <div className="certain-news">
        <div className="container">
          <div className="certain-news__header">
            <h3 className="certain-news__title"> {this.state.title}</h3>
            <p className="certain-news__desc">{this.state.description}</p>
          </div>
          <div className="certain-news__content" ref={this.myRef}></div>
        </div>
      </div>
    );
  }
}
export default CertainNews;
