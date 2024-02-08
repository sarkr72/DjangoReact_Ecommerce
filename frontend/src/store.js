import { combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { configureStore } from "@reduxjs/toolkit"
import {productDetailsReducer, productListReducers} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import logger from 'redux-logger';


const reducer = {
  productList: productListReducers,
  productDetails: productDetailsReducer,
  cart: cartReducer,
};

const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
    JSON.parse(localStorage.getItem('cartItems')) : []

    const sanitizedCartItems = cartItemsFromStorage.filter(item => item !== null);

    const initialState = {
  cart: {cartItems: sanitizedCartItems}
};
// const middleware = [...getDefaultMiddleware(), thunk];

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  preloadedState: initialState,
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;