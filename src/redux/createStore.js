import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import autoMergeLevel1 from "redux-persist/es/stateReconciler/autoMergeLevel1";
import hardSet from "redux-persist/es/stateReconciler/hardSet";
import storage from 'redux-persist/lib/storage'

import rootReducer from './reducer';


const persistConfig = {
  key: "root",
  storage,
};
 
const persistedReducer = persistReducer(persistConfig,rootReducer);
    
export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() //for development
); 
    
export const persistor = persistStore(store);
