import { Component } from 'react';
import { Link } from 'react-router-dom';
import { DiWindows } from 'react-icons/di';
import { TbBrowser } from 'react-icons/tb';

import PortalService from '../../services/services';
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import '../GameList/gameList.scss';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gamesList: [],
      loading: true,
      error: false,
      itemPerPage: 12,
      currentArr: null,
    };

    this.portalService = new PortalService();
  }

  componentDidMount() {
    this.getAllGames();
    document.addEventListener('scroll', this.scrollHandler);
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.platformSelected !== prevProps.platformSelected ||
      this.props.categorySelected !== prevProps.categorySelected ||
      this.props.sortBy !== prevProps.sortBy
    ) {
      this.getAllGames();
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler);
  }

  onGamesLoaded = (games) => {
    const game = games.slice(0, this.state.itemPerPage);
    this.setState({
      gamesList: game,
      loading: false,
      currentArr: games.length,
      error: false,
    });
  };

  onError = () => {
    this.setState({ error: true, loading: false, gamesList: [] });
  };

  getAllGames = () => {
    this.portalService
      .getFilterdGame(
        this.props.platformSelected,
        this.props.categorySelected,
        this.props.sortBy
      )
      .then(this.onGamesLoaded)
      .catch(this.onError);
  };

  scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 45 &&
      this.state.gamesList.length < this.state.currentArr
    ) {
      this.setState(() => ({
        itemPerPage: this.state.itemPerPage + 12,
      }));

      this.getAllGames();
    }
  };

  renderItems = (arr) => {
    const item = arr.map(
      ({ id, title, thumbnail, genre, short_description, platform }) => {
        const gif =
          platform === 'PC (Windows), Web Browser' ||
          platform === 'Web Browser' ? (
            <TbBrowser />
          ) : (
            <DiWindows />
          );

        return (
          <li className="gamelist__item" key={id}>
            <div className="gamelist__img-cont">
              <img src={thumbnail} alt="" className="gamelist__img" />
            </div>

            <Link
              className="gamelist__link"
              to="/game"
              onClick={() => this.props.onGameSelected(id)}
            >
              <h3 className="gamelist__title">{title}</h3>
            </Link>

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

    let className = loading || error ? 'gamelist__spinner' : 'gamelist__inner';

    return (
      <div className="gamelist">
        <div className="container">
          <Filter
            onFilterSelected={this.props.onFilterSelected}
            platformSelected={this.props.platformSelected}
            categorySelected={this.props.categorySelected}
            sortBy={this.props.sortBy}
          />
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
