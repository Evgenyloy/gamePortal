import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { useDispatch } from 'react-redux';

import { fetchGame } from '../../slices/selectedItemsSlice';
import Spinner from '../Spinner/Spinner';
import usePortalService from '../../services/services';
import { transitionStyles, defaultStyle, duration } from '../../data/data';
import { useGetMmoGamesQuery } from '../../api/apiSlice';

import '../ExploreMoo/exploreMoo.scss';

const ExploreMmo = () => {
  const { data: mmoList = [], isLoading, isError } = useGetMmoGamesQuery();

  const dispatch = useDispatch();

  const { getSpecificGame } = usePortalService();

  const onMMoLoaded = (arr) => {
    let randomNum = Math.floor(Math.random() * 15);
    const item = arr.slice(0 + randomNum, 4 + randomNum);
    return item;
  };

  const onGameClick = (item) => {
    dispatch(fetchGame(item, getSpecificGame));
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
                  onClick={() => onGameClick(item)}
                  onContextMenu={() => onGameClick(item)}
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

  const items = renderItems(onMMoLoaded(mmoList));
  const spinner = isLoading ? <Spinner /> : null;
  const errorMessage = isError ? (
    <div className="mmo__error-message">
      Something went wrong. Refresh the page or try again later
    </div>
  ) : null;
  const content = !(isLoading || isError) ? items : null;
  const className = isLoading || isError ? 'mmo__spinner' : 'mmo__inner';

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
