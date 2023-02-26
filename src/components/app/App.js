import Header from '../Header/Header';
import News from '../News/News';
import ExploreMmo from '../ExploreMoo/ExploreMoo';
import GameList from '../GameList/GameList';
import SpecificGame from '../SpecificGame/SpecificGame';

function App() {
  return (
    <div className="App">
      <Header />
      <News />
      <ExploreMmo />
      <div className="container">
        <div className="game__content">
          <GameList />
          <SpecificGame />
        </div>
      </div>
    </div>
  );
}

export default App;
