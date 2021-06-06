import axios from "axios";
import { setAlert } from "./alerts";
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
} from "./types.js";

export const getRoles = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getRoles");

    dispatch({
      type: ROLES_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ROLES_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const getFoodsList = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getFoodsList");

    dispatch({
      type: FOODS_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: FOODS_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addFood = (foodInfo = {}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(foodInfo);
  try {
    const res = await axios.put("/users/addFood", body, config);

    dispatch({
      type: ADD_FOOD,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "foodAdded", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: ADD_FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "foodNotAdded", alertType: "danger" }));
  }
};

export const deleteFood = (foodId = "") => async (dispatch) => {
  try {
    const res = await axios.delete(`/users/deleteFood/${foodId}`);

    dispatch({
      type: DELETE_FOOD,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "foodDeleted", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: DELETE_FOOD_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "foodNotDeleted", alertType: "danger" }));
  }
};

export const getChemotherapyList = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getChemotherapyList");

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

export const addChemotherapy = (foodInfo = {}) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(foodInfo);
  try {
    const res = await axios.put("/users/addChemotherapy", body, config);

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

export const deleteChemotherapy = (chemotherapyId = "") => async (dispatch) => {
  try {
    const res = await axios.delete(
      `/users/deleteChemotherapy/${chemotherapyId}`
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
    dispatch(setAlert({ msg: "chemotherapyNotDeleted", alertType: "danger" }));
  }
};

export const getSideEffectsListByUser = () => async (dispatch) => {
  try {
    const res = await axios.get("/users/getSideEffectsListByUser");

    dispatch({
      type: SIDE_EFFECTS_BY_USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: SIDE_EFFECTS_BY_USER_LOADED_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

export const addSideEffectByUser = (sideEffectInfo = {}) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(sideEffectInfo);
  try {
    const res = await axios.put("/users/addSideEffectByUser", body, config);

    dispatch({
      type: ADD_SIDE_EFFECT_BY_USER,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "sideEffectAdded", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: ADD_SIDE_EFFECT_BY_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "sideEffectNotAdded", alertType: "danger" }));
  }
};

export const deleteSideEffectByUser = (sideEffectId = "") => async (
  dispatch
) => {
  try {
    const res = await axios.delete(
      `/users/deleteSideEffectByUser/${sideEffectId}`
    );

    dispatch({
      type: DELETE_SIDE_EFFECT_BY_USER,
      payload: res.data,
    });
    dispatch(setAlert({ msg: "sideEffectDeleted", alertType: "success" }));
  } catch (err) {
    dispatch({
      type: DELETE_SIDE_EFFECT_BY_USER_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
    dispatch(setAlert({ msg: "sideEffectNotDeleted", alertType: "danger" }));
  }
};
