import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Popup from '../Popup/Popup';
import Footer from '../Footer/Footer';
import {
  MainPage,
  CertainNews,
  SpecificGame,
  NewsList,
  GameList,
  Page404,
} from '../pages';
//
//удалить
const option = {
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
};
const fetchh = fetch('http://localhost:8000/db', option);
fetchh.then((data) => data.json()).then((data) => console.log(data));
//
//
const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>

          <Route exact path="/news">
            <CertainNews />
          </Route>
          <Route exact path="/game-:gameId">
            <SpecificGame />
          </Route>
          <Route exact path="/news-list">
            <NewsList />
          </Route>
          <Route exact path="/game_list">
            <GameList />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
        <Popup />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
