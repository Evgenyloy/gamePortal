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
    const filteredNews = news.filter(
      (news) => !news.article_content.includes('&lt')
    );
    let newsArr = filteredNews.slice(0, 4);

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
    const items = arr.map((item) => {
      let className = `news__item news__item${newsItemNum++}`;

      const { title, id, main_image } = item;

      return (
        <div className={className} key={id}>
          <Link
            className="news__link"
            to="/news"
            onClick={() => {
              this.props.onNewsSelected(item);
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

    return (
      <div className="news">
        <div className="container">
          <div className="news__top">
            <div className="news__info">Last news</div>
            <div className="news__button button">
              <Link to="/all-news">browse all</Link>
            </div>
          </div>
          <div className={className}>
            {errorMessage}
            {spinner}
            {content}
          </div>
        </div>
      </div>
    );
  }
}

export default NewsBlock;
