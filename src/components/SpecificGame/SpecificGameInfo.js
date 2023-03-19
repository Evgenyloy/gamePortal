import '../SpecificGame/specificGame.scss';

const SpecificGameInfo = (props) => {
  const { developer, genre, platform, publisher, release_date } =
    props.selectedGame;

  return (
    <>
      <h4 className="game__information-title">Additional Information</h4>
      <ul className="game__information-list">
        <li className="game__information">
          <span>platform:</span> {platform}
        </li>
        <li className="game__information">
          <span>genre:</span> {genre}
        </li>
        <li className="game__information">
          <span>developer:</span> {developer}
        </li>
        <li className="game__information">
          <span>publisher:</span> {publisher}
        </li>
        <li className="game__information">
          <span>release_date:</span> {release_date}
        </li>
      </ul>
    </>
  );
};

export default SpecificGameInfo;
