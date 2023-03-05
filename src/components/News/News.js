import React, { Component } from 'react';

import Slider from 'react-slick';
import NewsService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './news.scss';

class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      loading: true,
      error: false,
    };

    this.newsService = new NewsService();
  }

  componentDidMount() {
    this.newsList();
  }

  onClick = () => {
    console.log('sd');
  };
  onNewsLoaded = (news) => {
    let newsArr = news.slice(0, 4);

    this.setState({ newsList: newsArr, loading: false });
  };

  onError = () => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  newsList = () => {
    this.newsService.getNews().then(this.onNewsLoaded).catch(this.onError);
  };

  renderItems = (arr) => {
    let newsItemNum = 1;
    let tabIndex = 1;
    const items = arr.map(
      ({ thumbnail, title, short_description, id, main_image }) => {
        let className = `news__item news__item${newsItemNum++}`;

        return (
          <div className={className} key={id} tabIndex={tabIndex++}>
            <a className="news__link" href="#">
              <img className="news__img" src={main_image} alt="thumbnail" />
            </a>
            <div className="news__title">{title}</div>
          </div>
        );
      }
    );

    return items;
  };

  render() {
    const { newsList, loading, error } = this.state;
    console.log(newsList);

    const items = this.renderItems(newsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    const className = spinner || error ? 'news__spinner' : 'news__inner';

    const news = (
      <>
        <div className={className}>
          {errorMessage}
          {spinner}
          {content}
        </div>
      </>
    );

    return (
      <div className="news">
        <div className="container">
          <div className="news__top">
            <div className="news__info">Last news</div>
            <div className="news__button button" tabIndex={5}>
              <a href="">browse all</a>
            </div>
          </div>

          {news}
        </div>
      </div>
    );
  }
}

export default News;
