import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import Spinner from '../Spinner/Spinner';
import usePortalService from '../../services/services';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
import '../ExploreMoo/exploreMoo.scss';

const ExploreMmo = (props) => {
  const { loading, error, getCategory } = usePortalService();
  const [mmoList, setMmoList] = useState([]);

  useEffect(() => {
    getMMo();
  }, []);

  const onMMoLoaded = (arr) => {
    let item = arr.slice(0, 4);
    setMmoList(item);
  };

  const getMMo = () => {
    getCategory('mmorpg').then(onMMoLoaded);
  };

  const renderItems = (arr) => {
    const items = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map((item) => {
            const { thumbnail, title, id } = item;

            return (
              <div
                className="mmo__item"
                key={id}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <Link
                  className="mmo__link"
                  to={`/game-${id}`}
                  onClick={() => props.onGameSelected(id)}
                >
                  <div className="mmo__img-cont">
                    <img className="mmo__img" src={thumbnail} alt={title} />
                  </div>
                  <div className="mmo__desc-inner">
                    <div className="mmo__desc">{title.toLowerCase()}</div>
                    <span className="mmo__free">free</span>
                  </div>
                </Link>
              </div>
            );
          })
        }
      </Transition>
    );

    return items;
  };

  const items = renderItems(mmoList);
  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? (
    <div className="mmo__error-message">
      Something went wrong. Refresh the page or try again later
    </div>
  ) : null;
  const content = !(loading || error) ? items : null;
  const className = loading || error ? 'mmo__spinner' : 'mmo__inner';
  return (
    <div className="mmo">
      <div className="container">
        <div className="mmo__top-side">
          <div className="mmo__title">Explore mmo games</div>
          <div className="mmo__button button">
            <Link to="/game_list">browse all </Link>
          </div>
        </div>

        <div className={className}>
          {spinner}
          {errorMessage}
          {content}
        </div>
      </div>
    </div>
  );
};

export default ExploreMmo;
