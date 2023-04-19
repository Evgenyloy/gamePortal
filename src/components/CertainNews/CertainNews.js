import React, { useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
import './certainNews.scss';

const CertainNews = () => {
  const selectedNews = useSelector((state) => state.selectedItems.selectedNews);

  const myRef = React.createRef();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    myRef.current.innerHTML = selectedNews.article_content;
    // eslint-disable-next-line
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
              <h3 className="certain-news__title"> {selectedNews.title}</h3>
              <p className="certain-news__desc">
                {selectedNews.short_description}
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
