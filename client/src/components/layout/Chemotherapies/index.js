import React, { Fragment, useState, useEffect, useRef } from "react";
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
import ChemotherapyModal from "./ChemotherapyModal/index.js";
import bin from "../../../images/bin.png";
import info from "../../../images/info.png";

const Chemotherapies = ({
  roles,
  getChemotherapies,
  chemotherapies,
  addChemotherapy,
  deleteChemotherapy,
  isAuthenticated,
}) => {
  const chemotherapyInput = useRef(null);
  const aboutChemotherapyInput = useRef(null);
  const [modalInfo, setModalInfo] = useState({
    chemotherapyIdForModal: "",
    chemotherapyForModal: "",
    aboutChemotherapyForModal: "",
  });
  const {
    chemotherapyIdForModal,
    chemotherapyForModal,
    aboutChemotherapyForModal,
  } = modalInfo;
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
    <div className="chemotherapyContainer containerMargin">
      <h2>{t("chemotherapies")}</h2>
      {chemotherapyIdForModal ? (
        <ChemotherapyModal
          chemotherapyIdForModal={chemotherapyIdForModal}
          chemotherapyForModal={chemotherapyForModal}
          aboutChemotherapyForModal={aboutChemotherapyForModal}
          setModalInfo={setModalInfo}
        />
      ) : (
        <Fragment>
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
              <button className="addChemotherapyButton">{t("add")}</button>
            </form>
          )}
          <div className="chemotherapies">
            {chemotherapies.length > 0 &&
              chemotherapies.map(
                ({ _id, chemotherapy, aboutChemotherapy }, i) => (
                  <div key={i} className="chemotherapy">
                    <span className={!admin && "fullWidth"}>
                      {chemotherapy}
                    </span>
                    {admin && (
                      <button
                        onClick={() =>
                          window.confirm(
                            t("wouldYouLikeToDeleteChemotherapy", {
                              chemotherapy,
                            })
                          ) && deleteChemotherapy(_id)
                        }
                      >
                        <img src={bin} />
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setModalInfo({
                          chemotherapyIdForModal: _id,
                          chemotherapyForModal: chemotherapy,
                          aboutChemotherapyForModal: aboutChemotherapy,
                        })
                      }
                    >
                      <img src={info} />
                    </button>
                  </div>
                )
              )}
          </div>
        </Fragment>
      )}
    </div>
  );
};

Chemotherapies.propTypes = {
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
})(Chemotherapies);
