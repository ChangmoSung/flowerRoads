import React, { Fragment, useState } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { updateChemotherapy } from "../../../../actions/chemotherapies";

const ChemotherapyModal = ({
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
    chemotherapy: "",
    aboutChemotherapy: "",
  });
  const { chemotherapy, aboutChemotherapy } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    updateChemotherapy({
      _id: chemotherapyIdForModal,
      chemotherapy,
      aboutChemotherapy,
    });
    toggleForm(false);
  };

  const updated = !!updatedChemotherapy._id;

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div>
      {formVisible ? (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="chemotherapy"
            onChange={onChange}
            placeholder={t("chemotherapy")}
            aria-label="Chemotherapy"
            required
          />
          <input
            type="text"
            name="aboutChemotherapy"
            onChange={onChange}
            placeholder={t("aboutChemotherapy")}
            aria-label="About chemotherapy"
            required
          />
          <button>{t("update")}</button>
          <button onClick={() => toggleForm(false)}>뒤로</button>
        </form>
      ) : (
        <Fragment>
          <Fragment>
            <span>
              {updated
                ? updatedChemotherapy.chemotherapy
                : chemotherapyForModal}
            </span>
            <span>
              {updated
                ? updatedChemotherapy.aboutChemotherapy
                : aboutChemotherapyForModal}
            </span>
            <button onClick={() => toggleForm(true)}>{t("update")}</button>
          </Fragment>
          <button
            onClick={() =>
              setModalInfo({
                chemotherapyIdForModal: "",
                chemotherapyForModal: "",
                aboutChemotherapyForModal: "",
              })
            }
          >
            닫기
          </button>
        </Fragment>
      )}
    </div>
  );
};

ChemotherapyModal.propTypes = {
  updateChemotherapy: PropTypes.func.isRequired,
  chemotherapyIdForModal: PropTypes.string.isRequired,
  chemotherapyForModal: PropTypes.string.isRequired,
  aboutChemotherapyForModal: PropTypes.string.isRequired,
  setModalInfo: PropTypes.func.isRequired,
  updatedChemotherapy: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  updatedChemotherapy: state.chemotherapies.updatedChemotherapy,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  updateChemotherapy,
})(ChemotherapyModal);
