import '../SpecificGame/specificGame.scss';

const SpecificGameRequirements = (props) => {
  const { minimum_system_requirements } = props.selectedGame;

  return props.selectedGame.minimum_system_requirements ? (
    <>
      <h4 className="game__requirements-title">
        Minimum System Requirements (Windows)
      </h4>
      <ul className="game__requirements-list">
        <li className="game__requirements">
          <span>os:</span> {minimum_system_requirements?.os}
        </li>
        <li className="game__requirements">
          <span>memory:</span> {minimum_system_requirements?.memory}
        </li>
        <li className="game__requirements">
          <span>grapohics:</span> {minimum_system_requirements?.graphics}
        </li>
        <li className="game__requirements">
          <span>processor:</span> {minimum_system_requirements?.processor}
        </li>
        <li className="game__requirements">
          <span>storage:</span> {minimum_system_requirements?.storage}
        </li>
      </ul>
    </>
  ) : null;
};

export default SpecificGameRequirements;
