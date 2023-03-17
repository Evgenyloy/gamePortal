import { Link } from 'react-router-dom';
import './popup.scss';

const Popup = (props) => {
  const popupClassName = props.popup ? 'popup open' : 'popup';

  const onClick = (e) => {
    props.onMainLinkClick(e.target.dataset.link);
    props.onBurgerClick();
  };

  return (
    <div className={popupClassName}>
      <nav className="popup__nav">
        <Link
          to="/games"
          className="popup__link"
          data-link="pc"
          onClick={onClick}
        >
          pc games
        </Link>
        <Link
          to="/games"
          className="popup__link"
          data-link="browser"
          onClick={onClick}
        >
          browser games
        </Link>
        <Link
          to="/news"
          className="popup__link"
          data-link="pc"
          onClick={onClick}
        >
          news
        </Link>
      </nav>
    </div>
  );
};

export default Popup;
