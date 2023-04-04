import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DiWindows } from 'react-icons/di';
import { TbBrowser } from 'react-icons/tb';
import { Transition } from 'react-transition-group';

import usePortalService from '../../services/services';
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
import '../GameList/gameList.scss';

const GameList = (props) => {
  const { error, loading, getFilterdGame } = usePortalService();

  const [gamesList, setGamesList] = useState([]);
  const [itemPerPage, setItemPerPage] = useState(12);
  const [currentArr, setCurrentArr] = useState(null);
  const [errorFilterNoMatches, setErrorFilterNoMatches] = useState(false);

  useEffect(() => {
    getAllGames();
    setErrorFilterNoMatches(false);
  }, [props.sortBy, props.categorySelected, props.platformSelected]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => document.removeEventListener('scroll', scrollHandler);
  });

  useEffect(() => {
    getAllGames();
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
    getFilterdGame(props.platformSelected, props.categorySelected, props.sortBy)
      .then(onGamesLoaded)
      .catch(onError);
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

  const renderItems = (arr) => {
    const item = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map(
            ({ id, title, thumbnail, genre, short_description, platform }) => {
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
                    <img
                      src={thumbnail}
                      alt={title}
                      className="gamelist__img"
                    />
                  </div>

                  <Link
                    className="gamelist__link"
                    to={`/game-${id}`}
                    onClick={() => props.onGameSelected(id)}
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
            }
          )
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
        <Filter
          platformSelected={props.platformSelected}
          categorySelected={props.categorySelected}
          sortBy={props.sortBy}
          errorReset={errorReset}
          setPlatformSelected={props.setPlatformSelected}
          setCategorySelected={props.setCategorySelected}
          setSortBy={props.setSortBy}
        />
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
