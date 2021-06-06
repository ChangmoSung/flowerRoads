import {
  ROLES_LOADED,
  ROLES_LOADED_ERROR,
  FOODS_LOADED,
  FOODS_LOADED_ERROR,
  ADD_FOOD,
  ADD_FOOD_ERROR,
  DELETE_FOOD,
  DELETE_FOOD_ERROR,
  CHEMOTHERAPY_LOADED,
  CHEMOTHERAPY_LOADED_ERROR,
  ADD_CHEMOTHERAPY,
  ADD_CHEMOTHERAPY_ERROR,
  DELETE_CHEMOTHERAPY,
  DELETE_CHEMOTHERAPY_ERROR,
  SIDE_EFFECTS_BY_USER_LOADED,
  SIDE_EFFECTS_BY_USER_LOADED_ERROR,
  ADD_SIDE_EFFECT_BY_USER,
  ADD_SIDE_EFFECT_BY_USER_ERROR,
  DELETE_SIDE_EFFECT_BY_USER,
  DELETE_SIDE_EFFECT_BY_USER_ERROR,
} from "../actions/types";
import { deleteChemotherapy } from "../actions/users";

const initialState = {
  roles: [],
  foodsList: [],
  chemotherapyList: [],
  sideEffectsListByUser: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ROLES_LOADED:
      return {
        ...state,
        roles: payload,
        loading: false,
      };
    case FOODS_LOADED:
    case ADD_FOOD:
    case DELETE_FOOD:
      return {
        ...state,
        foodsList: payload,
        loading: false,
      };
    case CHEMOTHERAPY_LOADED:
    case ADD_CHEMOTHERAPY:
    case DELETE_CHEMOTHERAPY:
      return {
        ...state,
        chemotherapyList: payload,
        loading: false,
      };
    case SIDE_EFFECTS_BY_USER_LOADED:
    case ADD_SIDE_EFFECT_BY_USER:
    case DELETE_SIDE_EFFECT_BY_USER:
      return {
        ...state,
        sideEffectsListByUser: payload,
        loading: false,
      };
    case ROLES_LOADED_ERROR:
    case FOODS_LOADED_ERROR:
    case ADD_FOOD_ERROR:
    case DELETE_FOOD_ERROR:
    case SIDE_EFFECTS_BY_USER_LOADED_ERROR:
    case ADD_SIDE_EFFECT_BY_USER_ERROR:
    case DELETE_SIDE_EFFECT_BY_USER_ERROR:
    case CHEMOTHERAPY_LOADED_ERROR:
    case ADD_CHEMOTHERAPY_ERROR:
    case DELETE_CHEMOTHERAPY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
