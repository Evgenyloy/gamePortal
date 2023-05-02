import React from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { useDispatch } from 'react-redux';

import { selectNews } from '../../slices/selectedItemsSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import { transitionStyles, defaultStyle, duration } from '../../data/data';
import { useGetNewsListQuery } from '../../api/apiSlice';

import './newsBlock.scss';

const NewsBlock = () => {
  const { data: news = [], isLoading, isError } = useGetNewsListQuery();

  const dispatch = useDispatch();

  const onNewsLoaded = (news) => {
    const filteredNews = news.filter(
      (news) => !news.article_content.includes('&lt')
    );
    const newsArr = filteredNews.slice(0, 4);
    return newsArr;
  };

  const onNewsClick = (item) => {
    dispatch(selectNews(item));
    localStorage.setItem('news', JSON.stringify(item));
  };

  const renderItems = (arr) => {
    let newsItemNum = 1;

    const items = (
      <Transition in timeout={duration} appear mountOnEnter enter>
        {(state) => (
          <>
            {arr.map((item) => {
              let className = `news__item news__item${newsItemNum++}`;
              const { title, id, main_image } = item;
              return (
                <div
                  className={className}
                  key={id}
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                >
                  <Link
                    className="news__link"
                    to="/news"
                    onClick={() => {
                      onNewsClick(item);
                    }}
                    onContextMenu={() => {
                      onNewsClick(item);
                    }}
                  >
                    <img
                      className="news__img"
                      src={main_image}
                      alt="thumbnail"
                    />
                  </Link>
                  <div className="news__title">{title}</div>
                </div>
              );
            })}
          </>
        )}
      </Transition>
    );

    return items;
  };

  const content = renderItems(onNewsLoaded(news));
  const errorMessage = isError ? <ErrorMessage /> : null;
  const spinner = isLoading ? <Spinner /> : null;
  const className = isLoading || isError ? 'news__spinner' : 'news__inner';

  return (
    <div className="news">
      <div className="container">
        <div className="news__top">
          <div className="news__info">Last news</div>
          <div className="news__button button">
            <Link to="/news-list">browse all</Link>
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
};

export default NewsBlock;
