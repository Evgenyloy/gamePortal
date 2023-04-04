import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';

import usePortalService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import SpecificGameRequirements from './SpecificGameRequirements';
import SpecificGameInfo from './SpecificGameInfo';
import SpecificGameScreenshots from './SpecificGameScreenshots';
import SpecificGamePopup from './SpecificGamePopup';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
import '../SpecificGame/specificGame.scss';

const SpecificGame = (props) => {
  const { error, loading, getSpecificGame } = usePortalService();

  const [popUp, setPopUp] = useState(false);
  const [popUpImgSrc, setPopUpImgSrc] = useState('');

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    getGame();
  }, []);

  const onGameLoaded = (game) => {
    props.setGame(game);
  };

  const getGame = () => {
    getSpecificGame(props.gameId).then(onGameLoaded);
  };

  const onImageClick = (e) => {
    setPopUp(true);
    setPopUpImgSrc(e.target.src);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  const createMarkup = () => {
    return { __html: props.selectedGame.description };
  };

  const renderItem = (props) => {
    const { thumbnail, title } = props;

    const content = (
      <Transition in timeout={duration} mountOnEnter appear>
        {(state) => (
          <div
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            <h3 className="game__title">{title}</h3>

            <div className="game__wrapper">
              <div className="game__col-1">
                <div className="game__img-cont">
                  <img src={thumbnail} alt={title} className="game__img" />
                </div>
                <SpecificGameScreenshots
                  selectedGame={props}
                  onImageClick={onImageClick}
                />
              </div>
              <div className="game__col-2">
                <div
                  className="game__description"
                  dangerouslySetInnerHTML={createMarkup()}
                />
                <SpecificGameInfo selectedGame={props} />
                <SpecificGameRequirements selectedGame={props} />
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
    return content;
  };

  const item = renderItem(props.selectedGame);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? item : null;
  const className = loading || error ? 'game__spinner' : 'game';

  return (
    <div className={className}>
      {spinner}
      {errorMessage}
      {content}
      <SpecificGamePopup
        popUpImgSrc={popUpImgSrc}
        popUp={popUp}
        closePopUp={closePopUp}
      />
    </div>
  );
};

export default SpecificGame;
