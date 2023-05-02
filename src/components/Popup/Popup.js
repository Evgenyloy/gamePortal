import { Transition } from 'react-transition-group';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { platformSelected } from '../../slices/filtersSlice';
import { changePopUp } from '../../slices/popupSlice';

import './popup.scss';

const Popup = () => {
  const popupVisible = useSelector((state) => state.popUp.popupVisible);
  const dispatch = useDispatch();
  const onClick = (e) => {
    dispatch(platformSelected(e.target.dataset.link));
    dispatch(changePopUp());
  };

  useEffect(() => {
    const closePopup = () => {
      if (!document.body.classList.contains('noscroll')) return;

      if (window.innerWidth > 650) {
        document.body.classList.remove('noscroll');
        dispatch(changePopUp(false));
      }
    };
    window.addEventListener('resize', closePopup);
    return () => window.removeEventListener('resize', closePopup);
    // eslint-disable-next-line
  }, []);

  const duration = 400;

  const defaultStyle = {
    transition: `all ${duration}ms linear 0s`,
  };

  const transitionStyles = {
    entering: { right: '-100%' },
    entered: { right: 0 },
    exiting: { right: '-100%' },
    exited: { right: '-100%' },
  };

  return (
    <Transition
      in={popupVisible}
      timeout={{
        appear: 10,
        enter: 0,
        exit: 450,
      }}
      mountOnEnter
      unmountOnExit
    >
      {(state) => (
        <div
          className="popup"
          tabIndex={0}
          style={{ ...defaultStyle, ...transitionStyles[state] }}
        >
          <nav className="popup__nav">
            <Link
              to="/game_list"
              className="popup__link"
              data-link="pc"
              onClick={onClick}
            >
              pc games
            </Link>
            <Link
              to="/game_list"
              className="popup__link"
              data-link="browser"
              onClick={onClick}
            >
              browser games
            </Link>
            <Link
              to="/news-list"
              className="popup__link"
              data-link="pc"
              onClick={onClick}
            >
              news
            </Link>
            <Link
              to="/"
              className="popup__link"
              data-link="pc"
              onClick={onClick}
            >
              home
            </Link>
          </nav>
        </div>
      )}
    </Transition>
  );
};

export default Popup;
