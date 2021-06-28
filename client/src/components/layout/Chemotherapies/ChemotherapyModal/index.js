import React, { Fragment, useState } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { updateChemotherapy } from "../../../../actions/chemotherapies";
import update from "../../../../images/update.png";
import close from "../../../../images/close.png";
import back from "../../../../images/back.png";
import confirm from "../../../../images/confirm.png";

const ChemotherapyModal = ({
  roles,
  chemotherapyIdForModal,
  chemotherapyForModal,
  aboutChemotherapyForModal,
  setModalInfo,
  updateChemotherapy,
  updatedChemotherapy,
  isAuthenticated,
}) => {
  const [formVisible, toggleForm] = useState(false);
  const [formData, setFormData] = useState({
    aboutChemotherapy: "",
  });
  const { aboutChemotherapy } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateChemotherapy({
      _id: chemotherapyIdForModal,
      aboutChemotherapy,
    });
    toggleForm(false);
  };

  const updated = !!updatedChemotherapy._id;
  const admin = roles.includes("admin");

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="chemotherapyModal">
      {formVisible ? (
        <form onSubmit={onSubmit}>
          <p>{chemotherapyForModal}</p>
          <input
            type="text"
            name="aboutChemotherapy"
            onChange={onChange}
            placeholder={t("aboutChemotherapy")}
            aria-label="About chemotherapy"
            required
          />
          <div className="buttonsContainer">
            <button>
              <img src={confirm} />
            </button>
            <button onClick={() => toggleForm(false)}>
              <img src={back} />
            </button>
          </div>
        </form>
      ) : (
        <Fragment>
          <span>
            {updated ? updatedChemotherapy.chemotherapy : chemotherapyForModal}
          </span>
          <div className="underline"></div>
          <span>
            {updated
              ? updatedChemotherapy.aboutChemotherapy
              : aboutChemotherapyForModal}
          </span>
          <div className="underline"></div>
          <div className="buttonsContainer">
            {admin && (
              <button onClick={() => toggleForm(true)}>
                <img src={update} />
              </button>
            )}
            <button
              onClick={() =>
                setModalInfo({
                  chemotherapyIdForModal: "",
                  chemotherapyForModal: "",
                  aboutChemotherapyForModal: "",
                })
              }
            >
              <img src={close} />
            </button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

ChemotherapyModal.propTypes = {
  roles: PropTypes.array,
  updateChemotherapy: PropTypes.func.isRequired,
  chemotherapyIdForModal: PropTypes.string.isRequired,
  chemotherapyForModal: PropTypes.string.isRequired,
  aboutChemotherapyForModal: PropTypes.string.isRequired,
  setModalInfo: PropTypes.func.isRequired,
  updatedChemotherapy: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  roles: state.users.roles,
  updatedChemotherapy: state.chemotherapies.updatedChemotherapy,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  updateChemotherapy,
})(ChemotherapyModal);
