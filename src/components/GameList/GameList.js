import { Component } from 'react';
import PortalService from '../../services/services';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import '../GameList/gameList.scss';
import { DiWindows } from 'react-icons/di';
import { TbBrowser } from 'react-icons/tb';

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
    const game = games.slice(20, 32);
    this.setState({ gamesList: game, loading: false });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  getAllGames = () => {
    this.portalService
      .getAllGames()
      .then(this.onGamesLoaded)
      .catch(this.onError);
  };

  renderItems = (arr) => {
    const item = arr.map(
      ({ id, title, thumbnail, genre, short_description, platform }) => {
        const gif = platform === 'Web Browser' ? <TbBrowser /> : <DiWindows />;

        return (
          <li className="gamelist__item" key={id}>
            <div className="gamelist__img-cont">
              <img src={thumbnail} alt="" className="gamelist__img" />
            </div>

            <a className="gamelist__link" href="#">
              <h3 className="gamelist__title">{title}</h3>
            </a>

            <p className="gamelist__desc">{short_description}</p>

            <div className="gamelist__genre">
              {genre}
              {gif}
            </div>
          </li>
        );
      }
    );

    return item;
  };

  render() {
    const { error, loading, gamesList } = this.state;

    const content = this.renderItems(gamesList);
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    const className = loading
      ? 'gamelist__spinner'
      : error
      ? null
      : 'gamelist__inner';

    return (
      <div className="gamelist">
        <div className="container">
          <div className="gamelist-filter">sdfsdfsfd</div>
          <ul className={className}>
            {spinner}
            {errorMessage}
            {content}
          </ul>
        </div>
      </div>
    );
  }
}

export default GameList;
