import { configureStore } from '@reduxjs/toolkit'
import  loaderSlice  from '../Features/loaderSlice.js'
import  dialogSlice  from '../Features/dialogSlice.js'

export default configureStore({
  reducer: {
    loader:loaderSlice,
    dialog:dialogSlice
  }
})