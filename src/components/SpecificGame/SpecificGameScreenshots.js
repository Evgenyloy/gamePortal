import React, { Component } from 'react';
import SpinnerImg from '../Spinner/SpinnerImg';

import '../SpecificGame/specificGame.scss';

class SpecificGameScreenshots extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image1: false,
      image2: false,
      image3: false,
    };
  }

  onload = (e) => {
    if (e.target.complete) {
      this.setState({ [e.target.id]: true });
    }
  };

  render() {
    const { screenshots } = this.props.selectedGame;

    let imgClassName1 = this.state.image1
      ? 'game__screenshots'
      : 'game__screenshots hidden';
    let imgClassName2 = this.state.image2
      ? 'game__screenshots'
      : 'game__screenshots hidden';
    let imgClassName3 = this.state.image3
      ? 'game__screenshots'
      : 'game__screenshots hidden';

    return screenshots.length > 0 ? (
      <>
        <div className="game__img-cont">
          <img
            className={imgClassName1}
            src={screenshots[0].image}
            alt="screenshot"
            onClick={this.props.onImageClick}
            onLoad={this.onload}
            id="image1"
          />

          <SpinnerImg image={this.state.image1} />
        </div>
        <div className="game__img-cont">
          <img
            className={imgClassName2}
            src={screenshots[1].image}
            alt="screenshot"
            onClick={this.props.onImageClick}
            onLoad={this.onload}
            id="image2"
          />
          <SpinnerImg image={this.state.image2} />
        </div>
        <div className="game__img-cont">
          <img
            className={imgClassName3}
            src={screenshots[2].image}
            alt="screenshot"
            onClick={this.props.onImageClick}
            onLoad={this.onload}
            id="image3"
          />
          <SpinnerImg image={this.state.image3} />
        </div>
      </>
    ) : null;
  }
}

export default SpecificGameScreenshots;
