import { configureStore } from '@reduxjs/toolkit'
import LoginReducer from './LoginReducer.tsx'

export default configureStore({
  reducer: {
    login: loginReducer
  }
})
