import { Component } from 'react';
import PortalService from '../../services/services';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RandomGame from '../RandomGame/RandomGame';

import './newsList.scss';

class NewsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newsList: [],
      error: false,
      loading: true,
      itemPerPage: 10,
      totalCoutn: 0,
    };
    this.newsService = new PortalService();
  }

  componentDidMount() {
    this.getNews();
    document.addEventListener('scroll', this.scrollHandler);
  }

  getNews = () => {
    this.newsService.getNews().then(this.onNewsLoading).catch(this.onError);
  };

  scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) === 0 &&
      this.state.newsList.length < 50
    ) {
      this.setState(() => ({
        itemPerPage: this.state.itemPerPage + 10,
      }));

      this.getNews();
    }
  };

  onNewsLoading = (news) => {
    const newsList = news.slice(0, this.state.itemPerPage);

    this.setState({ newsList, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  renderItems = (arr) => {
    const item = arr.map(({ short_description, title, thumbnail, id }) => {
      return (
        <li className="news-list__item" key={id}>
          <div className="news-list__img-cont">
            <img src={thumbnail} alt={title} className="news-list__img" />
          </div>
          <div className="news-list__content-cont">
            <h3 className="news-list__title">{title}</h3>
            <a className="news-list__desc" href="">
              {short_description}
            </a>
          </div>
        </li>
      );
    });
    return item;
  };

  render() {
    const { newsList, loading, error } = this.state;
    const items = this.renderItems(newsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    console.log(newsList);

    return (
      <div className="news-list">
        <div className="container">
          <div className="news-list__wrapper">
            <div className="news-list__col-1">
              <ul className="news-list__inner">
                {spinner}
                {errorMessage}
                {content}
              </ul>
            </div>
            <div className="news-list__col-2">
              <div className="container">
                <RandomGame />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsList;
