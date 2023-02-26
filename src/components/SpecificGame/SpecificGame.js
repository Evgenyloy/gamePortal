import { Component } from 'react';
import PortalService from '../../services/services';
import '../SpecificGame/specificGame.scss';

class SpecificGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      game: {},
      minimumSystemRequirements: {},
      loading: true,
      error: false,
    };

    this.portalService = new PortalService();
  }

  componentDidMount() {
    this.getGame();
  }

  onGameLoaded = (game) => {
    this.setState({
      game,
      loading: false,
      minimumSystemRequirements: game.minimum_system_requirements,
    });
  };

  onError = () => {
    this.setState({ error: true });
  };

  getGame = () => {
    this.portalService
      .getSpecificGame()
      .then(this.onGameLoaded)
      .catch(this.onError);
  };

  render() {
    const { error, game, loading, minimumSystemRequirements } = this.state;
    const {
      short_description,
      developer,
      genre,
      platform,
      publisher,
      release_date,
      thumbnail,
    } = game;

    const { os, memory, grapohics, processor, storage } =
      minimumSystemRequirements;
    console.log(game);

    console.log(minimumSystemRequirements);

    return (
      <div className="game">
        <div className="game__img-cont">
          <img src={thumbnail} alt="" className="game__img" />
        </div>
        <ul className="game__characteristics">
          <li className="game__description">{short_description}</li>
          <li className="game__description">platform: {platform}</li>
          <li className="game__description">genre: {genre}</li>
          <li className="game__description">developer: {developer}</li>
          <li className="game__description">publisher: {publisher}</li>
          <li className="game__description">release_date: {release_date}</li>
        </ul>
        <ul className="game__system-requirements">
          <li className="game__description">os: {os}</li>
          <li className="game__description">memory: {memory}</li>
          <li className="game__description">grapohics: {grapohics}</li>
          <li className="game__description">processor: {processor}</li>
          <li className="game__description">storage: {storage}</li>
        </ul>
      </div>
    );
  }
}

export default SpecificGame;
