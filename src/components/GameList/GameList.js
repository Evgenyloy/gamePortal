import { Component } from 'react';
import { Link } from 'react-router-dom';

import PortalService from '../../services/services';
import Filter from '../Filter/Filter';
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
      itemPerPage: 12,
      currentArr: null,
      platformSelected: 'all',
      categorySelected: 'mmorpg',
      sortBy: 'relevance',
    };

    this.portalService = new PortalService();
  }

  componentDidMount() {
    this.getAllGames();
    document.addEventListener('scroll', this.scrollHandler);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.platformSelected !== prevState.platformSelected ||
      this.state.categorySelected !== prevState.categorySelected ||
      this.state.sortBy !== prevState.sortBy
    ) {
      this.getAllGames();
    }
  }

  onGamesLoaded = (games) => {
    const game = games.slice(0, this.state.itemPerPage);
    this.setState({
      gamesList: game,
      loading: false,
      currentArr: games.length,
    });
  };

  onError = () => {
    this.setState({ error: true, loading: false });
  };

  getAllGames = () => {
    this.portalService
      .getFilterdGame(
        this.state.platformSelected,
        this.state.categorySelected,
        this.state.sortBy
      )

      .then(this.onGamesLoaded)
      .catch(this.onError);
  };

  onFilterSelected = (e) => {
    this.setState({ [e.target.id]: e.target.dataset.value });
  };

  scrollHandler = (e) => {
    const scrollHeight = e.target.documentElement.scrollHeight;
    const scrollTop = e.target.documentElement.scrollTop;
    const innerHeight = window.innerHeight;

    if (
      scrollHeight - (scrollTop + innerHeight) < 50 &&
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
          <Filter onFilterSelected={this.onFilterSelected} />
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
