import React, { useState } from 'react';
import SpinnerImg from '../Spinner/SpinnerImg';

import '../SpecificGame/specificGame.scss';

const SpecificGameScreenshots = ({ selectedGame, onImageClick }) => {
  const [imageLoading, setImage] = useState(false);

  const onload = () => {
    const screenshotCollection =
      document.querySelectorAll('.game__screenshots');
    screenshotCollection.forEach(() => {
      if (
        screenshotCollection[0].complete &&
        screenshotCollection[1].complete &&
        screenshotCollection[2].complete
      ) {
        setImage(true);
      }
    });
  };

  let imgClassName = imageLoading
    ? 'game__screenshots'
    : 'game__screenshots hidden';

  const screenshotItems = (imageLoading) => {
    const { screenshots } = selectedGame;
    let imageNum = 0;

    const item = selectedGame.screenshots.map((item) => {
      return (
        <div className="game__img-cont" key={item.id}>
          <img
            className={imgClassName}
            src={screenshots[imageNum++].image}
            alt="screenshot"
            onClick={onImageClick}
            onLoad={onload}
            id="image"
          />

          <SpinnerImg image={imageLoading} />
        </div>
      );
    });
    return item;
  };

  const screenshots = screenshotItems(imageLoading);

  return selectedGame.screenshots.length > 0 ? screenshots : null;
};

export default SpecificGameScreenshots;
