import React, { Component } from 'react';
import PortalService from '../../services/services';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Spinner from '../Spinner/Spinner';
import '../SpecificGame/specificGame.scss';

class SpecificGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: localStorage.getItem('game')
        ? JSON.parse(localStorage.getItem('game'))
        : {},
      loading: true,
      error: false,
      description: localStorage.getItem('description')
        ? JSON.parse(localStorage.getItem('description'))
        : '',
      gameId: this.props.game,
    };

    this.gameIdd = this.props.game;
    this.myRef = React.createRef();

    this.portalService = new PortalService();
  }

  componentDidMount() {
    this.getGame();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.description !== prevState.description) {
      this.myRef.current.innerHTML = this.state.description;
    }
  }
  componentWillUnmount() {
    localStorage.clear('description');
    localStorage.clear('game');
  }

  onGameLoaded = (game) => {
    this.setState({
      game,
      loading: false,
      description: game.description,
    });
    localStorage.setItem('game', JSON.stringify(game));
    localStorage.setItem('description', JSON.stringify(game.description));
  };

  onError = () => {
    this.setState({ error: true });
  };

  getGame = () => {
    this.portalService
      .getSpecificGame(this.props.game)
      .then(this.onGameLoaded)
      .catch(this.onError);
  };

  render() {
    const { error, game, loading } = this.state;
    const {
      developer,
      genre,
      platform,
      publisher,
      release_date,
      thumbnail,
      minimum_system_requirements,
      title,
    } = this.state.game;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    let className = loading || error ? 'gamelist__spinner' : 'gamelist__inner';

    return (
      <div className="game">
        <h3 className="game__title">{title}</h3>

        <div className="game__wrapper">
          <div className="game__col-1">
            <div className="game__img-cont">
              <img src={thumbnail} alt="" className="game__img" />
            </div>
          </div>
          <div className="game__col-2">
            <div className="game__description" ref={this.myRef}></div>

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
      </div>
    );
  }
}

export default SpecificGame;
