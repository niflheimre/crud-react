import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { store,persistor } from "./redux/createStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

//   lib for date/time
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider, } from '@material-ui/pickers';



ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
         <App />
      </MuiPickersUtilsProvider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
