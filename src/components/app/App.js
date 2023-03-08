import { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../Header/Header';
import NewsBlock from '../NewsBlock/NewsBlock';
import ExploreMmo from '../ExploreMoo/ExploreMoo';
import GameList from '../GameList/GameList';
import SpecificGame from '../SpecificGame/SpecificGame';
import NewsList from '../NewsList/NewsList';
import CertainNews from '../CertainNews/CertainNews';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNews: {},
      selectedGame: {},
    };
  }

  onSelectedNews = (selectedNews) => {
    this.setState({ selectedNews });
  };

  onGameSelected = (selectedGame) => {
    this.setState({ selectedGame });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <NewsBlock onSelectedNews={this.onSelectedNews} />
              <ExploreMmo onGameSelected={this.onGameSelected} />
              <NewsList
                onSelectedNews={this.onSelectedNews}
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
              <GameList />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
