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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNews: {},
      selectedGame: {},
      popupTogler: false,
    };
  }

  onNewsSelected = (selectedNews) => {
    this.setState({ selectedNews });
  };

  onGameSelected = (selectedGame) => {
    this.setState({ selectedGame });
  };

  componentDidMount() {
    window.addEventListener('resize', (e) => {
      if (window.innerWidth > 650) {
        this.setState({ popupTogler: false });
        document.body.classList.remove('noscroll');
      }
    });
  }

  onBurgerClick = () => {
    this.setState({ popupTogler: !this.state.popupTogler });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header
            onBurgerClick={this.onBurgerClick}
            popupTogler={this.state.popupTogler}
          />
          <Popup popup={this.state.popupTogler} />
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
              <SpecificGame game={this.state.selectedGame} />
            </Route>
            <Route exact path="/all-news">
              <NewsList />
            </Route>
            <Route exact path="/games">
              <GameList
                exact
                path="/game"
                onGameSelected={this.onGameSelected}
              />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
