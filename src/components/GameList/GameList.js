import { Component } from 'react';
import { Link } from 'react-router-dom';
import { DiWindows } from 'react-icons/di';
import { TbBrowser } from 'react-icons/tb';
import { Transition } from 'react-transition-group';

import PortalService from '../../services/services';
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

import { transitionStyles, defaultStyle, duration } from '../../data/data';
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
      errorFilterNoMatches: false,
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
      this.setState({
        errorFilterNoMatches: false,
        error: false,
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.scrollHandler);
  }

  onGamesLoaded = (games) => {
    if (games.status === 0) {
      this.setState({ errorFilterNoMatches: games.status_message });
    }

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

  errorReset = () => {
    this.setState({ errorFilterNoMatches: false });
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
    const item = (
      <Transition in={true} timeout={duration} appear mountOnEnter>
        {(state) =>
          arr.map(
            ({ id, title, thumbnail, genre, short_description, platform }) => {
              const gif =
                platform === 'PC (Windows), Web Browser' ||
                platform === 'Web Browser' ? (
                  <TbBrowser />
                ) : (
                  <DiWindows />
                );

              return (
                <li
                  className="gamelist__item"
                  key={id}
                  style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                  }}
                >
                  <div className="gamelist__img-cont">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="gamelist__img"
                    />
                  </div>

                  <Link
                    className="gamelist__link"
                    to={`/game/${id}`}
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
          )
        }
      </Transition>
    );

    return item;
  };

  render() {
    const { error, loading, gamesList, errorFilterNoMatches } = this.state;

    const spinner = loading ? <Spinner /> : null;
    const errorMessage =
      error && !errorFilterNoMatches ? <ErrorMessage /> : null;
    const errorFilter = errorFilterNoMatches ? (
      <div className="gamelist__filterError">{errorFilterNoMatches}</div>
    ) : null;

    const content = !(loading || error) ? this.renderItems(gamesList) : null;
    let className = loading || error ? 'gamelist__spinner' : 'gamelist__inner';

    return (
      <div className="gamelist">
        <div className="container">
          <Filter
            onFilterSelected={this.props.onFilterSelected}
            platformSelected={this.props.platformSelected}
            categorySelected={this.props.categorySelected}
            sortBy={this.props.sortBy}
            errorReset={this.errorReset}
          />
          <ul className={className}>
            {spinner}
            {errorFilter}
            {errorMessage}
            {content}
          </ul>
        </div>
      </div>
    );
  }
}

export default GameList;
