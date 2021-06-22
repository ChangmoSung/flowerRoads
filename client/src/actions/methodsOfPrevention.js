import axios from "axios";
import { setAlert } from "./alerts";
import {
  METHODS_OF_PREVENTION_LOADED,
  METHODS_OF_PREVENTION_LOADED_ERROR,
  ADD_A_METHOD_OF_PREVENTION,
  ADD_A_METHOD_OF_PREVENTION_ERROR,
  DELETE_A_METHOD_OF_PREVENTION,
  DELETE_A_METHOD_OF_PREVENTION_ERROR,
  DELETE_A_CATEGORY_OF_METHODS_OF_PREVENTION,
  DELETE_A_CATEGORY_OF_METHODS_OF_PREVENTION_ERROR,
} from "./types.js";

export const getMethodsOfPrevention = () => async (dispatch) => {
  try {
    const res = await axios.get("/methodsOfPrevention/getMethodsOfPrevention");

    dispatch({
      type: METHODS_OF_PREVENTION_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: METHODS_OF_PREVENTION_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addAMethodOfPrevention =
  (methodInfo = {}) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(methodInfo);
    try {
      const res = await axios.put(
        "/methodsOfPrevention/addAMethodOfPrevention",
        body,
        config
      );

      dispatch({
        type: ADD_A_METHOD_OF_PREVENTION,
        payload: res.data,
      });
      dispatch(setAlert({ msg: "methodAdded", alertType: "success" }));
    } catch (err) {
      dispatch({
        type: ADD_A_METHOD_OF_PREVENTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      dispatch(setAlert({ msg: "methodNotAdded", alertType: "danger" }));
    }
  };

export const deleteAMethodOfPrevention =
  ({ category, methodId }) =>
  async (dispatch) => {
    try {
      const res = await axios.delete(
        `/methodsOfPrevention/deleteAMethodOfPrevention/${category}/${methodId}`
      );

      dispatch({
        type: DELETE_A_METHOD_OF_PREVENTION,
        payload: res.data,
      });
      dispatch(setAlert({ msg: "methodDeleted", alertType: "success" }));
    } catch (err) {
      dispatch({
        type: DELETE_A_METHOD_OF_PREVENTION_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      dispatch(setAlert({ msg: "methodNotDeleted", alertType: "danger" }));
    }
  };

export const deleteACategoryOfMethodsOfPrevention =
  (category) => async (dispatch) => {
    try {
      const res = await axios.delete(
        `/methodsOfPrevention/deleteACategoryOfMethodsOfPrevention/${category}`
      );

      dispatch({
        type: DELETE_A_CATEGORY_OF_METHODS_OF_PREVENTION,
        payload: res.data,
      });
      dispatch(setAlert({ msg: "categoryDeleted", alertType: "success" }));
    } catch (err) {
      dispatch({
        type: DELETE_A_CATEGORY_OF_METHODS_OF_PREVENTION_ERROR,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
      dispatch(setAlert({ msg: "categoryNotDeleted", alertType: "danger" }));
    }
  };
