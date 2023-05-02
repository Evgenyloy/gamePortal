import React, { useState, useEffect } from 'react';
import { Transition } from 'react-transition-group';
import { useSelector } from 'react-redux';

import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import SpecificGameRequirements from './SpecificGameRequirements';
import SpecificGameInfo from './SpecificGameInfo';
import SpecificGameScreenshots from './SpecificGameScreenshots';
import SpecificGamePopup from './SpecificGamePopup';
import { transitionStyles, defaultStyle, duration } from '../../data/data';

import '../SpecificGame/specificGame.scss';

const SpecificGame = () => {
  const { selectedGame, gameLoadingStatus } = useSelector((state) => {
    return state.selectedItems;
  });

  const [popUp, setPopUp] = useState(false);
  const [popUpImgSrc, setPopUpImgSrc] = useState('');

  useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  const onImageClick = (e) => {
    setPopUp(true);
    setPopUpImgSrc(e.target.src);
  };

  const closePopUp = () => {
    setPopUp(false);
  };

  const createMarkup = () => {
    return { __html: selectedGame.description };
  };

  const renderItem = (selectedGame) => {
    const { thumbnail, title } = selectedGame;

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
                  selectedGame={selectedGame}
                  onImageClick={onImageClick}
                />
              </div>
              <div className="game__col-2">
                <div
                  className="game__description"
                  dangerouslySetInnerHTML={createMarkup()}
                />
                <SpecificGameInfo selectedGame={selectedGame} />
                <SpecificGameRequirements selectedGame={selectedGame} />
              </div>
            </div>
          </div>
        )}
      </Transition>
    );
    return content;
  };

  const item = renderItem(selectedGame);

  const spinner = gameLoadingStatus === 'loading' ? <Spinner /> : null;
  const errorMessage = gameLoadingStatus === 'error' ? <ErrorMessage /> : null;
  const content = gameLoadingStatus === 'idle' ? item : null;
  const className =
    gameLoadingStatus === 'loading' || gameLoadingStatus === 'error'
      ? 'game__spinner'
      : 'game';

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
