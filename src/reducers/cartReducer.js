const jsonToApi = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : 0;

const numOfCart = Object.values(jsonToApi).reduce((acc, qty) => acc + qty, 0);
const initialState = {
  count: numOfCart,
};
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART": {
      return {
        ...state,
        count: state.count + 1,
      };
    }
    case "REMOCE_CART": {
      return {
        ...state,
        count: state.count - 1,
      };
    }
    default:
      return state;
  }
};
export default cartReducer;
