import Header from '../Header/Header';
import News from '../News/News';
import ExploreMmo from '../ExploreMoo/ExploreMoo';
import GameList from '../GameList/GameList';
import SpecificGame from '../SpecificGame/SpecificGame';
import NewsList from '../NewsList/NewsList';

function App() {
  return (
    <div className="App">
      <Header />

      <News />
      <ExploreMmo />
      <NewsList />

      {/* <GameList /> */}
      {/* <SpecificGame /> */}
    </div>
  );
}

export default App;
