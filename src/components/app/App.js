import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import NewsBlock from '../NewsBlock/NewsBlock';
import ExploreMmo from '../ExploreMoo/ExploreMoo';
import GameList from '../GameList/GameList';
import SpecificGame from '../SpecificGame/SpecificGame';
import NewsList from '../NewsList/NewsList';
import CertainNews from '../CertainNews/CertainNews';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNews: localStorage.getItem('news')
        ? JSON.parse(localStorage.getItem('news'))
        : {},
      selectedGame: localStorage.getItem('selectedGame')
        ? JSON.parse(localStorage.getItem('selectedGame'))
        : {},
      gameId: localStorage.getItem('gameId')
        ? JSON.parse(localStorage.getItem('gameId'))
        : {},
      platformSelected: 'all',
      categorySelected: 'mmorpg',
      sortBy: 'relevance',
      popupVisible: false,
      popupVisibleDelay: false,
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

    setTimeout(() => {
      this.setState({ popupVisibleDelay: !this.state.popupVisibleDelay });
    }, 200);
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 650) {
        document.body.classList.remove('noscroll');
        this.setState({ popupVisible: false, popupVisibleDelay: false });
      }
    });
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
              <CertainNews news={this.state.selectedNews} />
            </Route>
            <Route exact path="/game">
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
            <Route exact path="/games">
              <GameList
                exact
                path="/game"
                onGameSelected={this.onGameSelected}
                platformSelected={this.state.platformSelected}
                categorySelected={this.state.categorySelected}
                sortBy={this.state.sortBy}
                onFilterSelected={this.onFilterSelected}
              />
            </Route>
          </Switch>
          <Footer />

          <Popup
            popup={this.state.popupVisible}
            delay={this.state.popupVisibleDelay}
            onMainLinkClick={this.onMainLinkClick}
            onBurgerClick={this.onBurgerClick}
          />
        </div>
      </Router>
    );
  }
}

export default App;
