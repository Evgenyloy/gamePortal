import React, { Component } from 'react';

import PortalService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import SpecificGameRequirements from './SpecificGameRequirements';
import SpecificGameInfo from './SpecificGameInfo';
import SpecificGameScreenshots from './SpecificGameScreenshots';
import SpecificGamePopup from './SpecificGamePopup';

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
    /* document.documentElement.scrollTop = 0; */
    this.getGame();
  }

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
    this.setState({ popUp: true, popUpImgSrc: e.target.src });
  };

  closePopUp = () => {
    this.setState({ popUp: false });
  };

  createMarkup = () => {
    return { __html: this.props.selectedGame.description };
  };

  renderItem = (props) => {
    const { thumbnail, title } = props;

    const content = (
      <>
        <h3 className="game__title">{title}</h3>

        <div className="game__wrapper">
          <div className="game__col-1">
            <div className="game__img-cont">
              <img src={thumbnail} alt="" className="game__img" />
            </div>
            <SpecificGameScreenshots
              selectedGame={this.props.selectedGame}
              onImageClick={this.onImageClick}
            />
          </div>
          <div className="game__col-2">
            <div
              className="game__description"
              ref={this.myRef}
              dangerouslySetInnerHTML={this.createMarkup()}
            />
            <SpecificGameInfo selectedGame={this.props.selectedGame} />
            <SpecificGameRequirements selectedGame={this.props.selectedGame} />
          </div>
        </div>
      </>
    );
    return content;
  };

  render() {
    const { error, loading, popUpImgSrc, popUp } = this.state;

    const item = this.renderItem(this.props.selectedGame);

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error) ? item : null;

    let className = loading || error ? 'game__spinner' : 'game';

    return (
      <div className={className}>
        {spinner}
        {errorMessage}
        {content}
        <SpecificGamePopup
          popUpImgSrc={popUpImgSrc}
          popUp={popUp}
          closePopUp={this.closePopUp}
        />
      </div>
    );
  }
}

export default SpecificGame;
