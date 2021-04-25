const INITIAL_STATE = {
  id: null,
  username: "",
  email: "",
  role: "",
  cart: [],
};
export const authReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      delete action.payload.password;
      return { ...state, ...action.payload };
    case "LOGOUT":
      return INITIAL_STATE;
    case "UPDATE_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
