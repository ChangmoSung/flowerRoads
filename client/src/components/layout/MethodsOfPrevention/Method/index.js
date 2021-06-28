import React, { Fragment } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { deleteAMethodOfPrevention } from "../../../../actions/methodsOfPrevention";
import close from "../../../../images/close.png";
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
    <Fragment>
      <h2 className="modalTitle">{categoryForModal}</h2>
      <div className="methodsForModal">
        {methodsForModal.map(({ _id, method }) => (
          <p>
            {method}
            {admin && (
              <button
                onClick={() => {
                  if (
                    window.confirm(
                      t("wouldYouLikeToDeleteMethod", {
                        method,
                      })
                    )
                  ) {
                    deleteAMethodOfPrevention({
                      category: categoryForModal,
                      methodId: _id,
                    });
                    setModalData({ category: "", methods: [] });
                  }
                }}
              >
                <img src={bin} />
              </button>
            )}
          </p>
        ))}
      </div>
      <button
        className="closeModalButton"
        onClick={() => setModalData({ category: "", methods: [] })}
      >
        <img src={close} />
      </button>
    </Fragment>
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
