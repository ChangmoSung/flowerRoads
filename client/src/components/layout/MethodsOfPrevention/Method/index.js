import React from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { deleteAMethodOfPrevention } from "../../../../actions/methodsOfPrevention";
import bin from "../../../../images/bin.png";

const MethodsOfPrevention = ({
  roles,
  categoryForModal,
  methodsForModal,
  setModalData,
  deleteAMethodOfPrevention,
  isAuthenticated,
}) => {
  const admin = roles.includes("admin");
  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="methodsOfPreventionContainer">
      <h2>{categoryForModal}</h2>
      <div className="methods">
        {methodsForModal.map(({ _id, method }) => (
          <p>
            {method}
            {admin && (
              <button
                onClick={() =>
                  window.confirm(
                    t("wouldYouLikeToDeleteMethod", {
                      method,
                    })
                  ) &&
                  deleteAMethodOfPrevention({
                    category: categoryForModal,
                    methodId: _id,
                  })
                }
              >
                <img src={bin} />
              </button>
            )}
          </p>
        ))}
      </div>
      <button onClick={() => setModalData({ category: "", methods: [] })}>
        Close
      </button>
    </div>
  );
};

MethodsOfPrevention.propTypes = {
  roles: PropTypes.array,
  categoryForModal: PropTypes.string.isRequired,
  methodsForModal: PropTypes.array.isRequired,
  setModalData: PropTypes.func.isRequired,
  deleteAMethodOfPrevention: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  roles: state.users.roles,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  deleteAMethodOfPrevention,
})(MethodsOfPrevention);
