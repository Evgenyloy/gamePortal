import './popup.scss';

const Popup = (props) => {
  const popupClassName = props.popup ? 'popup open' : 'popup';
  return (
    <div className={popupClassName}>
      <nav className="popup__nav">
        <a href="#" className="popup__link">
          pc games
        </a>
        <a href="#" className="popup__link">
          browser games
        </a>
        <a href="#" className="popup__link">
          news
        </a>
      </nav>
    </div>
  );
};

export default Popup;
