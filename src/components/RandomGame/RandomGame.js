import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import usePortalService from '../../services/services';
import { transitionStyles, defaultStyle, duration } from '../../data/data';

import './randomGame.scss';

const RandomGame = (props) => {
  const { loading, error, getCategory } = usePortalService();

  const [randomGames, setRandomGames] = useState([]);

  useEffect(() => {
    getRandomGame();
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

  const renderItems = (arr) => {
    const item = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map(({ title, id, thumbnail, short_description }) => {
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
                    onClick={() => props.onGameSelected(id)}
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
