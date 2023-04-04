import React, { useState } from 'react';
import SpinnerImg from '../Spinner/SpinnerImg';

import '../SpecificGame/specificGame.scss';

const SpecificGameScreenshots = (props) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);

  const onload1 = (e) => {
    if (e.target.complete) {
      setImage1(true);
    }
  };

  const onload2 = (e) => {
    if (e.target.complete) {
      setImage2(true);
    }
  };

  const onload3 = (e) => {
    if (e.target.complete) {
      setImage3(true);
    }
  };

  const { screenshots } = props.selectedGame;

  let imgClassName1 = image1 ? 'game__screenshots' : 'game__screenshots hidden';
  let imgClassName2 = image2 ? 'game__screenshots' : 'game__screenshots hidden';
  let imgClassName3 = image3 ? 'game__screenshots' : 'game__screenshots hidden';

  return screenshots.length > 0 ? (
    <>
      <div className="game__img-cont">
        <img
          className={imgClassName1}
          src={screenshots[0].image}
          alt="screenshot"
          onClick={props.onImageClick}
          onLoad={onload1}
          id="image1"
        />

        <SpinnerImg image={image1} />
      </div>
      <div className="game__img-cont">
        <img
          className={imgClassName2}
          src={screenshots[1].image}
          alt="screenshot"
          onClick={props.onImageClick}
          onLoad={onload2}
          id="image2"
        />
        <SpinnerImg image={image2} />
      </div>
      <div className="game__img-cont">
        <img
          className={imgClassName3}
          src={screenshots[2].image}
          alt="screenshot"
          onClick={props.onImageClick}
          onLoad={onload3}
          id="image3"
        />
        <SpinnerImg image={image3} />
      </div>
    </>
  ) : null;
};

export default SpecificGameScreenshots;
