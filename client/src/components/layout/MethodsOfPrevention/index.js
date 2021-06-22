import React, { Fragment, useState, useEffect, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import {
  getMethodsOfPrevention,
  addAMethodOfPrevention,
  deleteAMethodOfPrevention,
} from "../../../actions/methodsOfPrevention";
import bin from "../../../images/bin.png";

const MethodsOfPrevention = ({
  roles,
  methodsOfPrevention,
  getMethodsOfPrevention,
  addAMethodOfPrevention,
  deleteAMethodOfPrevention,
  isAuthenticated,
}) => {
  const categoryInput = useRef(null);
  const methodInput = useRef(null);

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
    <div className="methodsOfPreventionContainer">
      <h2>{t("methodsOfPrevention")}</h2>
      <Fragment>
        {admin && (
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
            methodsOfPrevention.map(({ category, methods }, i) => (
              <div key={i} className="category">
                <span className={!admin && "fullWidth"}>{category}</span>
                <div>
                  {methods.map(({ _id, method }) => (
                    <p>
                      {method}
                      <button
                        onClick={() =>
                          window.confirm(
                            t("wouldYouLikeToDeleteMethod", {
                              method,
                            })
                          ) &&
                          deleteAMethodOfPrevention({ category, methodId: _id })
                        }
                      >
                        <img src={bin} />
                      </button>
                    </p>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </Fragment>
    </div>
  );
};

MethodsOfPrevention.propTypes = {
  roles: PropTypes.array,
  methodsOfPrevention: PropTypes.array.isRequired,
  getMethodsOfPrevention: PropTypes.func.isRequired,
  addAMethodOfPrevention: PropTypes.func.isRequired,
  deleteAMethodOfPrevention: PropTypes.func.isRequired,
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
  deleteAMethodOfPrevention,
})(MethodsOfPrevention);
