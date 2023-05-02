import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';
import { Transition } from 'react-transition-group';
import { useDispatch } from 'react-redux';

import { selectNews } from '../../slices/selectedItemsSlice';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import RandomGame from '../RandomGame/RandomGame';
import { transitionStyles, defaultStyle, duration } from '../../data/data';
import { useGetNewsListQuery } from '../../api/apiSlice';
import './newsList.scss';

const NewsList = () => {
  const {
    data: news = [],
    isLoading,
    isError,
    isSuccess,
  } = useGetNewsListQuery();

  const dispatch = useDispatch();

  const [itemPerPage, setItemPerPage] = useState(10);
  const [scrollUp, setScrollUp] = useState(false);

  let newsList2;
  const onNewsLoading = (news) => {
    const filteredNews = news.filter(
      (news) => !news.article_content.includes('&lt')
    );
    const newsList = filteredNews.slice(0, itemPerPage);
    newsList2 = newsList;
    return newsList;
  };

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    window.addEventListener('scroll', scrollUphandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('scroll', scrollUphandler);
    };
  });

  const scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 150 &&
      newsList2.length < 45
    ) {
      setItemPerPage(itemPerPage + 10);
    }
  };

  const scrollUphandler = () => {
    const scrollY = window.scrollY;
    scrollY > 700 ? setScrollUp(true) : setScrollUp(false);
  };

  const onBtnUpClick = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const onNewsClick = (item) => {
    localStorage.setItem('news', JSON.stringify(item));
    dispatch(selectNews(item));
  };

  const renderItems = (arr) => {
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
                    onClick={() => onNewsClick(item)}
                    onContextMenu={() => onNewsClick(item)}
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
  const items = renderItems(onNewsLoading(news));
  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const content = isSuccess ? items : null;

  const className =
    isLoading || isError ? 'news-list__spinner ' : 'news-list__inner';
  const btnUpClassName = scrollUp ? 'btn-up' : 'btn-up btn-up_hide';
  return (
    <div className="news-list">
      <div className="container">
        <div className="news-list__wrapper">
          <div className="news-list__col-1">
            <ul className={className}>
              {spinner}
              {errorMessage}
              {items}
            </ul>
          </div>
          <div className="news-list__col-2">
            <div className="container">
              <RandomGame />
            </div>
          </div>
          <div className={btnUpClassName} onClick={onBtnUpClick}>
            <BsFillArrowUpCircleFill />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsList;
