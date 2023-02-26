import { Component } from 'react';
import PortalService from '../../services/services';
import '../GameList/gameList.scss';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesList: [],
      loading: true,
      error: false,
    };

    this.portalService = new PortalService();
  }

  componentDidMount() {
    this.getAllGames();
  }

  onGamesLoaded = (games) => {
    const game = games.slice(10, 19);
    this.setState({ gamesList: game, loading: false });
  };
  onError = () => {
    this.setState({ error: true });
  };

  getAllGames = () => {
    this.portalService
      .getAllGames()
      .then(this.onGamesLoaded)
      .catch(this.onError);
  };

  renderItems = (arr) => {
    const item = arr.map(({ id, title, thumbnail, genre }) => {
      return (
        <li className="gameList__item" key={id}>
          <a href="#" className="gameList__link">
            <img src={thumbnail} alt="" className="gameList__img" />
            <div className="gameList__text">{title}</div>
          </a>
        </li>
      );
    });

    return item;
  };

  render() {
    const { error, loading, gamesList } = this.state;

    const content = this.renderItems(gamesList);

    console.log(gamesList);

    return (
      <div className="gameList">
        <ul className="gameList__inner">{content}</ul>
      </div>
    );
  }
}

export default GameList;
