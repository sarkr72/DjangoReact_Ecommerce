import { thunk } from "redux-thunk";
import { createStore, combineReducers, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
import { composeWithDevTools } from "@redux-devtools/extension";
import productListReducer from "./reducers/productReducers";
import { productdetailsReducer } from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducer";
import { userLoginReducer, userRegisterReducer } from "./reducers/userReduces";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productdetailsReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  cart: { cartItems: cartItemsFromStorage },
  userLogin: { userInfo: userInfoFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
