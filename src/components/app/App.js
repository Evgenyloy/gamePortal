import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import NewsBlock from '../NewsBlock/NewsBlock';
import ExploreMmo from '../ExploreMoo/ExploreMoo';
import NewsList from '../NewsList/NewsList';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';

import GameList from '../GameList/GameList';
import SpecificGame from '../SpecificGame/SpecificGame';
import CertainNews from '../CertainNews/CertainNews';
import Page404 from '../Page404/Page404';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNews: localStorage.getItem('news')
        ? JSON.parse(localStorage.getItem('news'))
        : {},
      selectedGame: localStorage.getItem('selectedGame')
        ? localStorage.getItem('selectedGame') === 'undefined'
          ? {}
          : JSON.parse(localStorage.getItem('selectedGame'))
        : {},
      gameId: localStorage.getItem('gameId')
        ? JSON.parse(localStorage.getItem('gameId'))
        : {},
      platformSelected: 'all',
      categorySelected: 'mmorpg',
      sortBy: 'relevance',
      popupVisible: false,
    };
  }

  setGame = (selectedGame) => {
    this.setState({ selectedGame });
    localStorage.setItem('selectedGame', JSON.stringify(selectedGame));
  };

  onFilterSelected = (e) => {
    this.setState({ [e.target.id]: e.target.dataset.value });
  };

  onTagClick = (categorySelected) => {
    this.setState({ categorySelected });
  };

  onMainLinkClick = (platformSelected) => {
    this.setState({ platformSelected });
    document.body.classList.remove('noscroll');
  };

  onNewsSelected = (selectedNews) => {
    this.setState({ selectedNews });
    localStorage.setItem('news', JSON.stringify(selectedNews));
  };

  onGameSelected = (gameId) => {
    this.setState({ gameId });
    localStorage.setItem('gameId', JSON.stringify(gameId));
  };

  onBurgerClick = () => {
    this.setState({ popupVisible: !this.state.popupVisible });
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 650) {
        document.body.classList.remove('noscroll');
        this.setState({ popupVisible: false });
      }
    });
  }
  componentWillUnmount() {
    /* localStorage.clear(); */
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            onBurgerClick={this.onBurgerClick}
            popupVisible={this.state.popupVisible}
            onMainLinkClick={this.onMainLinkClick}
            onTagClick={this.onTagClick}
          />

          <Switch>
            <Route exact path="/">
              <NewsBlock onNewsSelected={this.onNewsSelected} />
              <ExploreMmo onGameSelected={this.onGameSelected} />
              <NewsList
                onNewsSelected={this.onNewsSelected}
                onGameSelected={this.onGameSelected}
              />
            </Route>

            <Route exact path="/news">
              <CertainNews news={this.state.selectedNews} on={this.state.on} />
            </Route>
            <Route exact path="/game/:gameId">
              <SpecificGame
                gameId={this.state.gameId}
                onGameSelected={this.onGameSelected}
                setGame={this.setGame}
                selectedGame={this.state.selectedGame}
              />
            </Route>
            <Route exact path="/all-news">
              <NewsList
                onNewsSelected={this.onNewsSelected}
                onGameSelected={this.onGameSelected}
              />
            </Route>
            <Route exact path="/game-list">
              <GameList
                exact
                path="/game-list"
                onGameSelected={this.onGameSelected}
                platformSelected={this.state.platformSelected}
                categorySelected={this.state.categorySelected}
                sortBy={this.state.sortBy}
                onFilterSelected={this.onFilterSelected}
              />
            </Route>
            <Route path="*">
              <Page404 />
            </Route>
          </Switch>
          <Popup
            popup={this.state.popupVisible}
            onMainLinkClick={this.onMainLinkClick}
            onBurgerClick={this.onBurgerClick}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
