import { Component } from 'react';
import { Link } from 'react-router-dom';
import PortalService from '../../services/services';
import './randomGame.scss';

class RandomGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomGames: [],
      error: false,
      loading: true,
    };
    this.portaServis = new PortalService();
  }

  componentDidMount() {
    this.getRandomGame();
  }

  getRandomGame = () => {
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

    this.portaServis
      .getCategory(randomGenre)
      .then(this.onRandomGameLoad)
      .catch(this.onError);
  };

  onError = () => {
    this.setState({ loading: false, error: true });
  };

  onRandomGameLoad = (arr) => {
    let item = arr.slice(0, 8);

    this.setState({ randomGames: item, loading: false });
  };

  renderItems = (arr) => {
    const item = arr.map(({ title, id, thumbnail, short_description }) => {
      const desc = short_description.slice(0, 70) + '...';

      return (
        <li className="random-game__item" key={id}>
          <div className="random-game__img-cont">
            <img src={thumbnail} alt="" className="random-game__img" />
          </div>
          <div className="random-game__content">
            <Link
              to="/game"
              className="random-game__link"
              onClick={() => this.props.onGameSelected(id)}
            >
              <p className="random-game__text line-clamp">{desc}</p>
            </Link>
          </div>
        </li>
      );
    });
    return item;
  };

  render() {
    const { randomGames, error, loading } = this.state;

    const content = this.renderItems(randomGames);
    return (
      <div className="random-game">
        <p className="random-game__headline">games for you</p>
        <ul className="random-game__list">{content}</ul>
      </div>
    );
  }
}

export default RandomGame;
