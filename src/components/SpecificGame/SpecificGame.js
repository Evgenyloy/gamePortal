import React, { Component } from 'react';
import { ImCross } from 'react-icons/im';

import PortalService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';

import '../SpecificGame/specificGame.scss';

class SpecificGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: false,
      popUp: false,
      popUpImgSrc: '',
    };

    this.portalService = new PortalService();
  }

  componentDidMount() {
    document.documentElement.scrollTop = 0;
    this.getGame();
  }

  createMarkup = () => {
    return { __html: this.props.selectedGame.description };
  };

  onGameLoaded = (game) => {
    this.setState({
      loading: false,
    });
    this.props.setGame(game);
  };

  onError = () => {
    this.setState({ error: true });
  };

  getGame = () => {
    this.portalService
      .getSpecificGame(this.props.gameId)
      .then(this.onGameLoaded)
      .catch(this.onError);
  };

  onImageClick = (e) => {
    console.log(e.target.src);

    this.setState({ popUp: true, popUpImgSrc: e.target.src });
  };
  closePopUp = (e) => {
    this.setState({ popUp: false });
  };
  renderItem = () => {
    const {
      developer,
      genre,
      platform,
      publisher,
      release_date,
      thumbnail,
      minimum_system_requirements,
      title,
      screenshots,
    } = this.props.selectedGame;

    const content = (
      <>
        <h3 className="game__title">{title}</h3>

        <div className="game__wrapper">
          <div className="game__col-1">
            <div className="game__img-cont">
              <img src={thumbnail} alt="" className="game__img" />
            </div>
            <div className="game__img-cont">
              <img
                className="game__screenshots"
                src={screenshots[0].image}
                alt=""
                width="331px"
                height="186px"
                onClick={this.onImageClick}
              />
            </div>
            <div className="game__img-cont">
              {' '}
              <img
                className="game__screenshots"
                src={screenshots[1].image}
                alt=""
                width="331px"
                height="186px"
                onClick={this.onImageClick}
              />
            </div>
            <div className="game__img-cont">
              {' '}
              <img
                className="game__screenshots"
                src={screenshots[2].image}
                alt=""
                width="331px"
                height="186px"
                onClick={this.onImageClick}
              />
            </div>
          </div>
          <div className="game__col-2">
            <div
              className="game__description"
              ref={this.myRef}
              dangerouslySetInnerHTML={this.createMarkup()}
            />

            <h4 className="game__information-title">Additional Information</h4>
            <ul className="game__information-list">
              <li className="game__information">
                <span>platform:</span> {platform}
              </li>
              <li className="game__information">
                <span>genre:</span> {genre}
              </li>
              <li className="game__information">
                <span>developer:</span> {developer}
              </li>
              <li className="game__information">
                <span>publisher:</span> {publisher}
              </li>
              <li className="game__information">
                <span>release_date:</span> {release_date}
              </li>
            </ul>

            <h4 className="game__requirements-title">
              Minimum System Requirements (Windows)
            </h4>
            <ul className="game__requirements-list">
              <li className="game__requirements">
                <span>os:</span> {minimum_system_requirements?.os}
              </li>
              <li className="game__requirements">
                <span>memory:</span> {minimum_system_requirements?.memory}
              </li>
              <li className="game__requirements">
                <span>grapohics:</span> {minimum_system_requirements?.graphics}
              </li>
              <li className="game__requirements">
                <span>processor:</span> {minimum_system_requirements?.processor}
              </li>
              <li className="game__requirements">
                <span>storage:</span> {minimum_system_requirements?.storage}
              </li>
            </ul>
          </div>
        </div>
      </>
    );
    return content;
  };

  render() {
    const { error, loading, popUp } = this.state;

    const item = this.renderItem();

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? item : null;
    let className = loading || error ? 'game__spinner' : 'game';
    let popUpClassName = popUp ? 'pop-up' : 'pop-up hidden';
    return (
      <div className={className}>
        {spinner}
        {errorMessage}
        {content}
        <div className={popUpClassName} onClick={this.closePopUp}>
          <span>
            <ImCross onClick={this.closePopUp} />
          </span>
          <img
            className="pop-up__img"
            src={this.state.popUpImgSrc}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    );
  }
}

export default SpecificGame;
