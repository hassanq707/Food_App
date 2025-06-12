import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/CartSlice";
import foodReducer from "./slices/FoodSlice";
import tokenSlice from './slices/TokenSlice'
import userSlice from './slices/userSlice'


const store = configureStore({
  reducer: {
    auth : tokenSlice,
    user : userSlice,
    cart: cartReducer,
    foods: foodReducer,
  },
});
export default store
