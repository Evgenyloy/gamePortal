import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DiWindows } from 'react-icons/di';
import { TbBrowser } from 'react-icons/tb';
import { Transition } from 'react-transition-group';
import { useSelector, useDispatch } from 'react-redux';

import { fetchGame } from '../../slices/selectedItemsSlice';
import usePortalService from '../../services/services';
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { transitionStyles, defaultStyle, duration } from '../../data/data';

import '../GameList/gameList.scss';

const GameList = () => {
  const { platform, category, sort } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const { error, loading, getFilterdGame, getSpecificGame } =
    usePortalService();
  const [gamesList, setGamesList] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(12);
  const [currentArr, setCurrentArr] = useState(null);
  const [errorFilterNoMatches, setErrorFilterNoMatches] = useState(false);

  useEffect(() => {
    getAllGames();
    setErrorFilterNoMatches(false);
    // eslint-disable-next-line
  }, [sort, category, platform]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  });

  useEffect(() => {
    getAllGames();
    // eslint-disable-next-line
  }, [itemPerPage]);

  const onGamesLoaded = (games) => {
    if (games.status === 0) {
      setErrorFilterNoMatches(games.status_message);
    }
    const game = games.slice(0, itemPerPage);
    setGamesList(game);
    setCurrentArr(games.length);
  };

  const onError = () => {
    setGamesList([]);
  };

  const errorReset = () => {
    setErrorFilterNoMatches(false);
  };

  const getAllGames = () => {
    getFilterdGame(platform, category, sort).then(onGamesLoaded).catch(onError);
  };

  const scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 45 &&
      gamesList.length < currentArr
    ) {
      setItemPerPage(itemPerPage + 12);
    }
  };

  const onGameClick = (item) => {
    localStorage.setItem('selectedGame', JSON.stringify(item));

    dispatch(fetchGame(item, getSpecificGame));
  };

  const renderItems = (arr) => {
    const item = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map((item) => {
            const { id, title, thumbnail, genre, short_description, platform } =
              item;
            const gif =
              platform === 'PC (Windows), Web Browser' ||
              platform === 'Web Browser' ? (
                <TbBrowser />
              ) : (
                <DiWindows />
              );

            return (
              <li
                className="gamelist__item"
                key={id}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <div className="gamelist__img-cont">
                  <img src={thumbnail} alt={title} className="gamelist__img" />
                </div>

                <Link
                  className="gamelist__link"
                  to={`/game-${id}`}
                  onClick={() => onGameClick(item)}
                  onContextMenu={() => onGameClick(item)}
                >
                  <h3 className="gamelist__title">{title}</h3>
                </Link>

                <p className="gamelist__desc">{short_description}</p>

                <div className="gamelist__genre">
                  {genre}
                  {gif}
                </div>
              </li>
            );
          })
        }
      </Transition>
    );

    return item;
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error && !errorFilterNoMatches ? <ErrorMessage /> : null;
  const errorFilter = errorFilterNoMatches ? (
    <div className="gamelist__filterError">{errorFilterNoMatches}</div>
  ) : null;

  const content = !(loading || error) ? renderItems(gamesList) : null;
  const className =
    loading || error || errorFilterNoMatches
      ? 'gamelist__spinner'
      : 'gamelist__inner';

  return (
    <div className="gamelist">
      <div className="container">
        <Filter errorReset={errorReset} />
        <ul className={className}>
          {spinner}
          {errorFilter}
          {errorMessage}
          {content}
        </ul>
      </div>
    </div>
  );
};

export default GameList;
