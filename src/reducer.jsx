export const initialState = {
  showModal: false,
  modalType: null,
  user: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_USER":
      return {
        ...state,
        user: action.user,
      };

    default:
      return {
        ...state,
      };
  }
};

export default reducer;
