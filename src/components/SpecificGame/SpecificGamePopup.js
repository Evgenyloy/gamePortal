import { Transition } from 'react-transition-group';
import { ImCross } from 'react-icons/im';

import '../SpecificGame/specificGame.scss';

const SpecificGamePopup = (props) => {
  const duration = 100;

  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  const transitionStyles = {
    entering: { opacity: 1 },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0 },
  };

  return (
    <Transition
      in={props.popUp}
      timeout={duration}
      mountOnEnter={true}
      unmountOnExit={true}
    >
      {(state) => (
        <div
          className="pop-up"
          onClick={props.closePopUp}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
        >
          <span>
            <ImCross onClick={props.closePopUp} />
          </span>
          <img
            className="pop-up__img"
            src={props.popUpImgSrc}
            alt=""
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </Transition>
  );
};

export default SpecificGamePopup;
