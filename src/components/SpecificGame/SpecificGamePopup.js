import { ImCross } from 'react-icons/im';

import '../SpecificGame/specificGame.scss';

const SpecificGamePopup = (props) => {
  let popUpClassName = props.popUp ? 'pop-up' : 'pop-up hidden';
  return (
    <div className={popUpClassName} onClick={props.closePopUp}>
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
  );
};

export default SpecificGamePopup;
