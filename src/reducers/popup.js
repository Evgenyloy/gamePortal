const initialState = {
  popupVisible: false,
};

const popUp = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_POPUP_VISIBLE':
      return {
        ...state,
        popupVisible: action.payload === false ? false : !state.popupVisible,
      };

    default:
      return state;
  }
};

export default popUp;
