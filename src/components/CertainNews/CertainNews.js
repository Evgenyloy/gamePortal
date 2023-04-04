import React, { useEffect } from 'react';
import { Transition } from 'react-transition-group';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
import './certainNews.scss';

const CertainNews = (props) => {
  const myRef = React.createRef();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    myRef.current.innerHTML = props.news.article_content;
  }, []);

  return (
    <Transition in timeout={duration} appear mountOnEnter>
      {(state) => (
        <div
          className="certain-news"
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <div className="container">
            <div className="certain-news__header">
              <h3 className="certain-news__title"> {props.news.title}</h3>
              <p className="certain-news__desc">
                {props.news.short_description}
              </p>
            </div>
            <div className="certain-news__content" ref={myRef}></div>
          </div>
        </div>
      )}
    </Transition>
  );
};
export default CertainNews;
