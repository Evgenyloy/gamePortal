import { Component } from 'react';
import NewsService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
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
    let num = 1;
    const items = arr.map(
      ({ thumbnail, title, short_description, id, main_image }) => {
        let className = `news__item news__item${num++}`;

        return (
          <div className={className} key={id}>
            <a href="#">
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

    const items = this.renderItems(newsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    const className = spinner || error ? 'news__spinner' : 'news__inner';
    return (
      <div className="news">
        <div className="container">
          <h2 className="news__last">Last news</h2>
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

export default News;
