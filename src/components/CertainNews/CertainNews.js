import React, { Component } from 'react';

import './certainNews.scss';

class CertainNews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      certainNews: localStorage.getItem('certainNews')
        ? JSON.parse(localStorage.getItem('certainNews'))
        : this.props.news.article_content,
      title: localStorage.getItem('title')
        ? JSON.parse(localStorage.getItem('title'))
        : this.props.news.title,
      description: localStorage.getItem('description')
        ? JSON.parse(localStorage.getItem('description'))
        : this.props.news.short_description,
    };

    this.myRef = React.createRef();
  }

  componentDidMount() {
    localStorage.setItem('certainNews', JSON.stringify(this.state.certainNews));
    localStorage.setItem('title', JSON.stringify(this.state.title));
    localStorage.setItem('description', JSON.stringify(this.state.description));

    this.myRef.current.innerHTML = this.state.certainNews;
  }
  componentWillUnmount() {
    localStorage.clear('certainNews');
    localStorage.clear('title');
    localStorage.clear('description');
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
