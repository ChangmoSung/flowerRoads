import {
  CHEMOTHERAPY_LOADED,
  CHEMOTHERAPY_LOADED_ERROR,
  ADD_CHEMOTHERAPY,
  ADD_CHEMOTHERAPY_ERROR,
  DELETE_CHEMOTHERAPY,
  DELETE_CHEMOTHERAPY_ERROR,
  UPDATE_CHEMOTHERAPY,
  UPDATE_CHEMOTHERAPY_ERROR,
} from "../actions/types";

const initialState = {
  chemotherapies: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case CHEMOTHERAPY_LOADED:
    case ADD_CHEMOTHERAPY:
    case DELETE_CHEMOTHERAPY:
    case UPDATE_CHEMOTHERAPY:
      return {
        ...state,
        chemotherapies: payload,
        loading: false,
      };
    case CHEMOTHERAPY_LOADED_ERROR:
    case ADD_CHEMOTHERAPY_ERROR:
    case DELETE_CHEMOTHERAPY_ERROR:
    case UPDATE_CHEMOTHERAPY_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
