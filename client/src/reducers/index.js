import { combineReducers } from "redux";
import auth from "./auth";
import alerts from "./alerts";
import users from "./users";
import sideEffects from "./sideEffects";
import chemotherapies from "./chemotherapies";
import methodsOfPrevention from "./methodsOfPrevention";

export default combineReducers({
  auth,
  alerts,
  users,
  sideEffects,
  chemotherapies,
  methodsOfPrevention,
});
