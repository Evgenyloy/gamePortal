import { Component } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { Transition } from 'react-transition-group';

import PortalService from '../../services/services';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RandomGame from '../RandomGame/RandomGame';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
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
      scroll: false,
    };
    this.newsService = new PortalService();
  }

  componentDidMount() {
    this.getNews();
    document.addEventListener('scroll', this.scrollHandler);
    window.addEventListener('scroll', this.scrollUphandler);
  }
  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler);
    window.removeEventListener('scroll', this.scrollUphandler);
  }
  scrollUphandler = () => {
    const scrollY = window.scrollY;
    if (scrollY > 1000) {
      this.setState({ scroll: true });
    }
    if (scrollY === 0) {
      this.setState({ scroll: false });
    }
    if (scrollY < 1000) {
      this.setState({ scroll: false });
    }
  };
  getNews = () => {
    this.newsService.getNews().then(this.onNewsLoading).catch(this.onError);
  };

  scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 150 &&
      this.state.newsList.length < 45
    ) {
      this.setState(() => ({
        itemPerPage: this.state.itemPerPage + 10,
      }));

      this.getNews();
    }
  };

  onNewsLoading = (news) => {
    const filteredNews = news.filter(
      (news) => !news.article_content.includes('&lt')
    );
    const newsList = filteredNews.slice(0, this.state.itemPerPage);

    this.setState({ newsList, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  onNewsClick = (item) => {
    this.props.onNewsSelected(item);
  };

  onBtnUpClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  renderItems = (arr) => {
    const item = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map((item) => {
            const { short_description, title, thumbnail, id } = item;
            return (
              <li
                className="news-list__item"
                key={id}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <div className="news-list__img-cont">
                  <img src={thumbnail} alt={title} className="news-list__img" />
                </div>
                <div className="news-list__content-cont">
                  <h3 className="news-list__title">{title}</h3>
                  <Link
                    className="news-list__desc"
                    to="/news"
                    onClick={() => this.onNewsClick(item)}
                  >
                    {short_description}
                  </Link>
                </div>
              </li>
            );
          })
        }
      </Transition>
    );

    return item;
  };

  render() {
    const { newsList, loading, error, scroll } = this.state;
    const items = this.renderItems(newsList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = !(loading || error) ? items : null;

    const className =
      loading || error ? 'news-list__spinner ' : 'news-list__inner';
    const btnUpClassName = scroll ? 'btn-up' : 'btn-up btn-up_hide';
    return (
      <div className="news-list">
        <div className="container">
          <div className="news-list__wrapper">
            <div className="news-list__col-1">
              <ul className={className}>
                {spinner}
                {errorMessage}
                {content}
              </ul>
            </div>
            <div className="news-list__col-2">
              <div className="container">
                <RandomGame onGameSelected={this.props.onGameSelected} />
              </div>
            </div>
            <div className={btnUpClassName} onClick={this.onBtnUpClick}>
              <BsFillArrowUpCircleFill />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsList;
