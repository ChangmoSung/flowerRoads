import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import {
  getChemotherapyList,
  addChemotherapy,
  deleteChemotherapy,
} from "../../../actions/users";
import eraser from "../../../images/eraser.png";

const Chemotherapy = ({
  getChemotherapyList,
  chemotherapyList,
  addChemotherapy,
  deleteChemotherapy,
  isAuthenticated,
}) => {
  const chemotherapyInput = useRef(null);
  const [formData, setFormData] = useState({ chemotherapy: "" });
  const { chemotherapy } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    chemotherapyInput.current.value = "";
    addChemotherapy({ _id: `${chemotherapy}-${uuidv4()}`, chemotherapy });
  };

  useEffect(() => {
    getChemotherapyList();
  }, [getChemotherapyList]);

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="chemotherapyContainer">
      <h2>{t("chemotherapyList")}</h2>
      <form onSubmit={onSubmit}>
        <input
          ref={chemotherapyInput}
          type="text"
          name="chemotherapy"
          onChange={onChange}
          placeholder={t("chemotherapy")}
          aria-label="Chemotherapy"
          required
        />
        <button>{t("add")}</button>
      </form>
      <div className="chemotherapies">
        {chemotherapyList.length > 0 &&
          chemotherapyList.map(({ _id, chemotherapy }, i) => (
            <div key={i} className="chemotherapy">
              <span>{chemotherapy}</span>
              <div className="buttonsContainer">
                <button
                  onClick={() =>
                    window.confirm(
                      t("wouldYouLikeToDeleteChemotherapy", { chemotherapy })
                    ) && deleteChemotherapy(_id)
                  }
                >
                  <img src={eraser} />
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

Chemotherapy.propTypes = {
  getChemotherapyList: PropTypes.func.isRequired,
  chemotherapyList: PropTypes.array,
  addChemotherapy: PropTypes.func.isRequired,
  deleteChemotherapy: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  chemotherapyList: state.users.chemotherapyList,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getChemotherapyList,
  addChemotherapy,
  deleteChemotherapy,
})(Chemotherapy);
