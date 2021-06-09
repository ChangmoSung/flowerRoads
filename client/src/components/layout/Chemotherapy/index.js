import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  getChemotherapies,
  addChemotherapy,
  deleteChemotherapy,
} from "../../../actions/chemotherapies";
import eraser from "../../../images/eraser.png";

const Chemotherapy = ({
  roles,
  getChemotherapies,
  chemotherapies,
  addChemotherapy,
  deleteChemotherapy,
  isAuthenticated,
}) => {
  const chemotherapyInput = useRef(null);
  const aboutChemotherapyInput = useRef(null);
  const [formData, setFormData] = useState({
    chemotherapy: "",
    aboutChemotherapy: "",
  });
  const { chemotherapy, aboutChemotherapy } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    chemotherapyInput.current.value = "";
    aboutChemotherapyInput.current.value = "";
    addChemotherapy({ chemotherapy, aboutChemotherapy });
  };

  useEffect(() => {
    getChemotherapies();
  }, [getChemotherapies]);

  const admin = roles.includes("admin");

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="chemotherapyContainer">
      <h2>{t("chemotherapies")}</h2>
      {admin && (
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
          <input
            ref={aboutChemotherapyInput}
            type="text"
            name="aboutChemotherapy"
            onChange={onChange}
            placeholder={t("aboutChemotherapy")}
            aria-label="About chemotherapy"
            required
          />
          <button>{t("add")}</button>
        </form>
      )}
      <div className="chemotherapies">
        {chemotherapies.length > 0 &&
          chemotherapies.map(({ _id, chemotherapy, aboutChemotherapy }, i) => (
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
  roles: PropTypes.array,
  getChemotherapies: PropTypes.func.isRequired,
  chemotherapies: PropTypes.array,
  addChemotherapy: PropTypes.func.isRequired,
  deleteChemotherapy: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  roles: state.users.roles,
  chemotherapies: state.chemotherapies.chemotherapies,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getChemotherapies,
  addChemotherapy,
  deleteChemotherapy,
})(Chemotherapy);
