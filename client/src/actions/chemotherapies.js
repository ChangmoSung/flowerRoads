import axios from "axios";
import { setAlert } from "./alerts";
import {
  CHEMOTHERAPY_LOADED,
  CHEMOTHERAPY_LOADED_ERROR,
  ADD_CHEMOTHERAPY,
  ADD_CHEMOTHERAPY_ERROR,
  DELETE_CHEMOTHERAPY,
  DELETE_CHEMOTHERAPY_ERROR,
  UPDATE_CHEMOTHERAPY,
  UPDATE_CHEMOTHERAPY_ERROR,
} from "./types.js";

export const getChemotherapies = () => async (dispatch) => {
  try {
    const res = await axios.get("/chemotherapies/getChemotherapies");

    dispatch({
      type: CHEMOTHERAPY_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CHEMOTHERAPY_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addChemotherapy =
  (chemotherapyInfo = {}) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(chemotherapyInfo);
    try {
      const res = await axios.put(
        "/chemotherapies/addChemotherapy",
        body,
        config
      );

      dispatch({
        type: ADD_CHEMOTHERAPY,
        payload: res.data,
      });
      dispatch(setAlert({ msg: "chemotherapyAdded", alertType: "success" }));
    } catch (err) {
      dispatch({
        type: ADD_CHEMOTHERAPY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      dispatch(setAlert({ msg: "chemotherapyNotAdded", alertType: "danger" }));
    }
  };

export const deleteChemotherapy =
  (chemotherapyId = "") =>
  async (dispatch) => {
    try {
      const res = await axios.delete(
        `/chemotherapies/deleteChemotherapy/${chemotherapyId}`
      );

      dispatch({
        type: DELETE_CHEMOTHERAPY,
        payload: res.data,
      });
      dispatch(setAlert({ msg: "chemotherapyDeleted", alertType: "success" }));
    } catch (err) {
      dispatch({
        type: DELETE_CHEMOTHERAPY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      dispatch(
        setAlert({ msg: "chemotherapyNotDeleted", alertType: "danger" })
      );
    }
  };

export const updateChemotherapy =
  (chemotherapyInfo = {}) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body = JSON.stringify(chemotherapyInfo);

    try {
      const res = await axios.put(
        "/chemotherapies/updateChemotherapy",
        body,
        config
      );

      dispatch({
        type: UPDATE_CHEMOTHERAPY,
        payload: res.data,
      });
      dispatch(setAlert({ msg: "chemotherapyUpdated", alertType: "success" }));
    } catch (err) {
      dispatch({
        type: UPDATE_CHEMOTHERAPY_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
      dispatch(
        setAlert({ msg: "chemotherapyNotUpdated", alertType: "danger" })
      );
    }
  };
