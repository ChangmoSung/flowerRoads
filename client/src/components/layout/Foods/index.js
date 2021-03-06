import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import { getFoodsList, addFood, deleteFood } from "../../../actions/users";
import bin from "../../../images/bin.png";

const Foods = ({
  getFoodsList,
  foodsList,
  addFood,
  deleteFood,
  isAuthenticated,
}) => {
  const foodNameInput = useRef(null);
  const [formData, setFormData] = useState({ foodName: "" });
  const { foodName } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    foodNameInput.current.value = "";
    addFood({ _id: `${foodName}-${uuidv4()}`, foodName });
  };

  useEffect(() => {
    getFoodsList();
  }, [getFoodsList]);

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="foodsContainer containerMargin">
      <h2>{t("foodsList")}</h2>
      <form onSubmit={onSubmit}>
        <input
          ref={foodNameInput}
          type="text"
          name="foodName"
          onChange={onChange}
          placeholder={t("foodName")}
          aria-label="Food name"
          required
        />
        <button>{t("add")}</button>
      </form>
      <div className="foods">
        {foodsList.length > 0 &&
          foodsList.map(({ _id, foodName }, i) => (
            <div key={i} className="food">
              <span>{foodName}</span>
              <div className="buttonsContainer">
                <button
                  onClick={() =>
                    window.confirm(
                      t("wouldYouLikeToDeleteFood", { foodName })
                    ) && deleteFood(_id)
                  }
                >
                  <img src={bin} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

Foods.propTypes = {
  getFoodsList: PropTypes.func.isRequired,
  foodsList: PropTypes.array,
  addFood: PropTypes.func.isRequired,
  deleteFood: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  foodsList: state.users.foodsList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getFoodsList,
  addFood,
  deleteFood,
})(Foods);
