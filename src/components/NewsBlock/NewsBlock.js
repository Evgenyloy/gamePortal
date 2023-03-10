import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import NewsService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './newsBlock.scss';

class NewsBlock extends Component {
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

  onNewsLoaded = (news) => {
    const news2 = news.filter((news) => !news.article_content.includes('&lt'));
    let newsArr = news2.slice(0, 4);

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
    const items = arr.map((item) => {
      let className = `news__item news__item${newsItemNum++}`;

      const {
        thumbnail,
        title,
        short_description,
        id,
        main_image,
        article_content,
      } = item;

      return (
        <div className={className} key={id} tabIndex={tabIndex++}>
          <Link
            className="news__link"
            to="/news"
            onClick={() => {
              this.props.onSelectedNews(item);
            }}
          >
            <img className="news__img" src={main_image} alt="thumbnail" />
          </Link>
          <div className="news__title">{title}</div>
        </div>
      );
    });

    return items;
  };

  render() {
    const { newsList, loading, error } = this.state;

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
              <Link to="/all-news">browse all</Link>
            </div>
          </div>

          {news}
        </div>
      </div>
    );
  }
}

export default NewsBlock;
