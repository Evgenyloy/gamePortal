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
    };
  }
  onSelectedNews = (selectedNews) => {
    this.setState({ selectedNews });
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/">
              <NewsBlock onSelectedNews={this.onSelectedNews} />
              <ExploreMmo />
              <NewsList onSelectedNews={this.onSelectedNews} />
            </Route>

            <Route exact path="/news">
              {/* починить расположение блока на экране */}
              <CertainNews news={this.state.selectedNews} />
            </Route>
          </Switch>

          {/* <GameList />
        <SpecificGame /> */}
        </div>
      </Router>
    );
  }
}

export default App;
