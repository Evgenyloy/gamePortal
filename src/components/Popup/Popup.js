import { Component } from 'react';
import { Link } from 'react-router-dom';
import Portal from '../Portal/Portal';

import './popup.scss';

class Popup extends Component {
  onClick = (e) => {
    this.props.onMainLinkClick(e.target.dataset.link);
    this.props.onBurgerClick();
  };

  render() {
    const popupClassName = this.props.popup ? 'popup open' : 'popup';
    if (!this.props.delay) return;
    return (
      <Portal props={this.props.popup}>
        <div className={popupClassName} tabIndex={0}>
          <nav className="popup__nav">
            <Link
              to="/games"
              className="popup__link"
              data-link="pc"
              onClick={this.onClick}
            >
              pc games
            </Link>
            <Link
              to="/games"
              className="popup__link"
              data-link="browser"
              onClick={this.onClick}
            >
              browser games
            </Link>
            <Link
              to="/all-news"
              className="popup__link"
              data-link="pc"
              onClick={this.onClick}
            >
              news
            </Link>
            <Link
              to="/"
              className="popup__link"
              data-link="pc"
              onClick={this.onClick}
            >
              home
            </Link>
          </nav>
        </div>
      </Portal>
    );
  }
}

export default Popup;
