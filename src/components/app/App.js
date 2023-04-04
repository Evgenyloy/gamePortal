import { useState, useEffect } from 'react';
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

const App = () => {
  const [selectedNews, setSelectedNews] = useState(
    localStorage.getItem('news') ? JSON.parse(localStorage.getItem('news')) : {}
  );
  const [selectedGame, setSelectedGame] = useState(
    localStorage.getItem('selectedGame')
      ? localStorage.getItem('selectedGame') === 'undefined'
        ? {}
        : JSON.parse(localStorage.getItem('selectedGame'))
      : {}
  );
  const [gameId, setGameId] = useState(
    localStorage.getItem('gameId')
      ? JSON.parse(localStorage.getItem('gameId'))
      : {}
  );

  const [platformSelected, setPlatformSelected] = useState('all');
  const [categorySelected, setCategorySelected] = useState('mmorpg');
  const [sortBy, setSortBy] = useState('relevance');
  const [popupVisible, setPopupVisible] = useState(false);

  const setGame = (selectedGame) => {
    setSelectedGame(selectedGame);
    localStorage.setItem('selectedGame', JSON.stringify(selectedGame));
  };

  const onTagClick = (categorySelected) => {
    setCategorySelected(categorySelected);
  };

  const onMainLinkClick = (platformSelected) => {
    setPlatformSelected(platformSelected);
    document.body.classList.remove('noscroll');
  };

  const onNewsSelected = (selectedNews) => {
    setSelectedNews(selectedNews);
    localStorage.setItem('news', JSON.stringify(selectedNews));
  };

  const onGameSelected = (gameId) => {
    setGameId(gameId);
    localStorage.setItem('gameId', JSON.stringify(gameId));
  };

  const onBurgerClick = () => {
    setPopupVisible(!popupVisible);
  };

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 650) {
        document.body.classList.remove('noscroll');
        setPopupVisible(false);
      }
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header
          onBurgerClick={onBurgerClick}
          popupVisible={popupVisible}
          onMainLinkClick={onMainLinkClick}
          onTagClick={onTagClick}
        />

        <Switch>
          <Route exact path="/">
            <NewsBlock onNewsSelected={onNewsSelected} />
            <ExploreMmo onGameSelected={onGameSelected} />
            <NewsList
              onNewsSelected={onNewsSelected}
              onGameSelected={onGameSelected}
            />
          </Route>

          <Route exact path="/news">
            <CertainNews news={selectedNews} />
          </Route>
          <Route exact path="/game-:gameId">
            <SpecificGame
              gameId={gameId}
              onGameSelected={onGameSelected}
              setGame={setGame}
              selectedGame={selectedGame}
            />
          </Route>
          <Route exact path="/news-list">
            <NewsList
              onNewsSelected={onNewsSelected}
              onGameSelected={onGameSelected}
            />
          </Route>
          <Route exact path="/game_list">
            <GameList
              onGameSelected={onGameSelected}
              platformSelected={platformSelected}
              categorySelected={categorySelected}
              sortBy={sortBy}
              setPlatformSelected={setPlatformSelected}
              setCategorySelected={setCategorySelected}
              setSortBy={setSortBy}
            />
          </Route>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
        <Popup
          popup={popupVisible}
          onMainLinkClick={onMainLinkClick}
          onBurgerClick={onBurgerClick}
        />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
