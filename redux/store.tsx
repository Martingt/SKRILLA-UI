import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./LoginReducer";

export default configureStore({
  reducer: {
    login: loginReducer,
  },
});
