import React, { useState, useEffect, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  getMethodsOfPrevention,
  addAMethodOfPrevention,
  deleteACategoryOfMethodsOfPrevention,
} from "../../../actions/methodsOfPrevention";
import bin from "../../../images/bin.png";
import info from "../../../images/info.png";
import Method from "./Method/index.js";

const MethodsOfPrevention = ({
  roles,
  methodsOfPrevention,
  getMethodsOfPrevention,
  addAMethodOfPrevention,
  deleteACategoryOfMethodsOfPrevention,
  isAuthenticated,
}) => {
  const categoryInput = useRef(null);
  const methodInput = useRef(null);

  const [modalData, setModalData] = useState({
    categoryForModal: "",
    methodsForModal: [],
  });
  const { categoryForModal, methodsForModal } = modalData;

  const [formData, setFormData] = useState({
    category: "",
    method: "",
  });
  const { category, method } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addAMethodOfPrevention({ category, method });
    categoryInput.current.value = "";
    methodInput.current.value = "";
  };

  const admin = roles.includes("admin");

  useEffect(() => {
    getMethodsOfPrevention();
  }, [getMethodsOfPrevention]);

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="methodsOfPreventionContainer containerMargin">
      {!categoryForModal && <h2>{t("methodsOfPrevention")}</h2>}
      {admin && !categoryForModal && (
        <form onSubmit={onSubmit}>
          <input
            ref={categoryInput}
            type="text"
            name="category"
            onChange={onChange}
            placeholder={t("enterCategory")}
            aria-label="Category"
            required
          />
          <input
            ref={methodInput}
            type="text"
            name="method"
            onChange={onChange}
            placeholder={t("enterMethod")}
            aria-label="A method of prevention"
            required
          />
          <button>{t("add")}</button>
        </form>
      )}
      <div className="methodsOfPrevention">
        {methodsOfPrevention.length > 0 &&
          !categoryForModal &&
          methodsOfPrevention.map(({ category, methods }, i) => (
            <div key={i} className="category">
              <span className={!admin && "fullWidth"}>{category}</span>
              <button
                onClick={() =>
                  setModalData({
                    categoryForModal: category,
                    methodsForModal: methods,
                  })
                }
              >
                <img src={info} />
              </button>
              {admin && (
                <button
                  onClick={() =>
                    window.confirm(
                      t("wouldYouLikeToDeleteCategory", {
                        category,
                      })
                    ) && deleteACategoryOfMethodsOfPrevention(category)
                  }
                >
                  <img src={bin} />
                </button>
              )}
            </div>
          ))}
        {categoryForModal && (
          <Method
            categoryForModal={categoryForModal}
            methodsForModal={methodsForModal}
            setModalData={setModalData}
          />
        )}
      </div>
    </div>
  );
};

MethodsOfPrevention.propTypes = {
  roles: PropTypes.array,
  methodsOfPrevention: PropTypes.array.isRequired,
  getMethodsOfPrevention: PropTypes.func.isRequired,
  addAMethodOfPrevention: PropTypes.func.isRequired,
  deleteACategoryOfMethodsOfPrevention: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  roles: state.users.roles,
  methodsOfPrevention: state.methodsOfPrevention.methodsOfPrevention,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getMethodsOfPrevention,
  addAMethodOfPrevention,
  deleteACategoryOfMethodsOfPrevention,
})(MethodsOfPrevention);
