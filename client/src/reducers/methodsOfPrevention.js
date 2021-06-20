  import {
  METHODS_OF_PREVENTION_LOADED,
  METHODS_OF_PREVENTION_LOADED_ERROR,
  ADD_A_METHOD_OF_PREVENTION,
  ADD_A_METHOD_OF_PREVENTION_ERROR,
  DELETE_A_METHOD_OF_PREVENTION,
  DELETE_A_METHOD_OF_PREVENTION_ERROR,
} from "../actions/types";

const initialState = {
  methodsOfPrevention: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case METHODS_OF_PREVENTION_LOADED:
    case ADD_A_METHOD_OF_PREVENTION:
    case DELETE_A_METHOD_OF_PREVENTION:
      return {
        ...state,
        methodsOfPrevention: payload,
        loading: false,
      };
    case METHODS_OF_PREVENTION_LOADED_ERROR:
    case ADD_A_METHOD_OF_PREVENTION_ERROR:
    case DELETE_A_METHOD_OF_PREVENTION_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}
