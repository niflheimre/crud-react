import { combineReducers } from "redux";
import Candidates from "./candidateReducer";

export default combineReducers({
  candidates:Candidates,
});
