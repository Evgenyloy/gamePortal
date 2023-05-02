import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';
import { useDispatch } from 'react-redux';

import { fetchGame } from '../../slices/selectedItemsSlice';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import usePortalService from '../../services/services';
import { transitionStyles, defaultStyle, duration } from '../../data/data';

import './randomGame.scss';

const RandomGame = () => {
  const dispatch = useDispatch();
  const { loading, error, getCategory, getSpecificGame } = usePortalService();

  const [randomGames, setRandomGames] = useState([]);

  useEffect(() => {
    getRandomGame();
    // eslint-disable-next-line
  }, []);

  const getRandomGame = () => {
    const randomCategory = Math.floor(Math.random() * 4) + 1;
    let randomGenre;
    switch (randomCategory) {
      case 1:
        randomGenre = 'shooter';
        break;
      case 2:
        randomGenre = 'mmorpg';
        break;
      case 3:
        randomGenre = 'battle-royale';
        break;
      case 4:
        randomGenre = 'racing';
        break;

      default:
        randomGenre = 'mmo';
    }

    getCategory(randomGenre).then(onRandomGameLoad);
  };

  const onRandomGameLoad = (arr) => {
    let item = arr.slice(0, 8);
    setRandomGames(item);
  };
  const onGameClick = (item) => {
    dispatch(fetchGame(item, getSpecificGame));
  };
  const renderItems = (arr) => {
    const item = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map((item) => {
            const { title, id, thumbnail, short_description } = item;
            const desc = short_description.slice(0, 70) + '...';
            return (
              <li
                className="random-game__item"
                key={id}
                style={{
                  ...defaultStyle,
                  ...transitionStyles[state],
                }}
              >
                <div className="random-game__img-cont">
                  <img
                    src={thumbnail}
                    alt={title}
                    className="random-game__img"
                  />
                </div>
                <div className="random-game__content">
                  <Link
                    to={`/game-${id}`}
                    className="random-game__link"
                    onClick={() => onGameClick(item)}
                    onContextMenu={() => onGameClick(item)}
                  >
                    <p className="random-game__text line-clamp">{desc}</p>
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

  const items = renderItems(randomGames);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="random-game">
      <p className="random-game__headline">games for you</p>
      <ul className="random-game__list">
        {spinner}
        {errorMessage}
        {content}
      </ul>
    </div>
  );
};

export default RandomGame;
