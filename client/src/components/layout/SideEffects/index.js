import React, { Fragment, useState, useEffect, useRef } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";
import { useTranslation } from "react-i18next";
import {
  getSideEffectsListByUser,
  addSideEffectByUser,
  deleteSideEffectByUser,
} from "../../../actions/users";
import {
  getSideEffectsListByAdmin,
  addSideEffectByAdmin,
  deleteSideEffectByAdmin,
} from "../../../actions/sideEffects";
import bin from "../../../images/bin.png";

const SideEffects = ({
  roles,
  getSideEffectsListByUser,
  getSideEffectsListByAdmin,
  sideEffectsListByUser,
  addSideEffectByUser,
  deleteSideEffectByUser,
  addSideEffectByAdmin,
  deleteSideEffectByAdmin,
  sideEffectsListByAdmin,
  isAuthenticated,
}) => {
  const sideEffectByUserInput = useRef(null);
  const sideEffectByAdminInput = useRef(null);
  const [formData, setFormData] = useState({ sideEffectByUser: "" });
  const { sideEffectByUser } = formData;

  const [formDataByAdmin, setFormDataByAdmin] = useState({
    sideEffectByAdmin: "",
  });
  const { sideEffectByAdmin } = formDataByAdmin;

  const [page, setPage] = useState("admin");

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    addSideEffectByUser({
      _id: `${sideEffectByUser}-${uuidv4()}`,
      sideEffectByUser,
    });
    sideEffectByUserInput.current.value = "";
  };

  const onChangeByAdmin = (e) =>
    setFormDataByAdmin({ ...formDataByAdmin, [e.target.name]: e.target.value });
  const onSubmitByAdmin = (e) => {
    e.preventDefault();
    addSideEffectByAdmin({ sideEffectByAdmin });
    sideEffectByAdminInput.current.value = "";
  };

  const admin = roles.includes("admin");

  useEffect(() => {
    getSideEffectsListByUser();
    getSideEffectsListByAdmin();
  }, [getSideEffectsListByUser, getSideEffectsListByAdmin]);

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="sideEffectsContainer">
      <h2>{t("sideEffects")}</h2>
      {page === "admin" && (
        <Fragment>
          <button className="setPageButton" onClick={() => setPage("user")}>
            {t("commonSideEffects")}
          </button>
          {admin && (
            <form onSubmit={onSubmitByAdmin}>
              <input
                ref={sideEffectByAdminInput}
                type="text"
                name="sideEffectByAdmin"
                onChange={onChangeByAdmin}
                placeholder={t("enterSideEffect")}
                aria-label="Side effect"
                required
              />
              <button>{t("add")}</button>
            </form>
          )}
          <div className="sideEffects">
            {sideEffectsListByAdmin.length > 0 &&
              sideEffectsListByAdmin.map(({ _id, sideEffectByAdmin }, i) => (
                <div key={i} className="sideEffect">
                  <span>{sideEffectByAdmin}</span>
                  {admin && (
                    <div className="buttonsContainer">
                      <button
                        onClick={() =>
                          window.confirm(
                            t("wouldYouLikeToDeleteSideEffect", {
                              sideEffect: sideEffectByAdmin,
                            })
                          ) && deleteSideEffectByAdmin(_id)
                        }
                      >
                        <img src={bin} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </Fragment>
      )}

      {page === "user" && (
        <Fragment>
          <button className="setPageButton" onClick={() => setPage("admin")}>
            {t("experiencedSideEffects")}
          </button>
          <form onSubmit={onSubmit}>
            <input
              ref={sideEffectByUserInput}
              type="text"
              name="sideEffectByUser"
              onChange={onChange}
              placeholder={t("enterSideEffect")}
              aria-label="Side effect"
              required
            />
            <button>{t("add")}</button>
          </form>
          <div className="sideEffects">
            {sideEffectsListByUser.length > 0 &&
              sideEffectsListByUser.map(({ _id, sideEffectByUser }, i) => (
                <div key={i} className="sideEffect">
                  <span>{sideEffectByUser}</span>
                  <div className="buttonsContainer">
                    <button
                      onClick={() =>
                        window.confirm(
                          t("wouldYouLikeToDeleteSideEffect", {
                            sideEffect: sideEffectByUser,
                          })
                        ) && deleteSideEffectByUser(_id)
                      }
                    >
                      <img src={bin} />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </Fragment>
      )}
    </div>
  );
};

SideEffects.propTypes = {
  roles: PropTypes.array,
  getSideEffectsListByUser: PropTypes.func.isRequired,
  getSideEffectsListByAdmin: PropTypes.func.isRequired,
  sideEffectsListByUser: PropTypes.array,
  addSideEffectByUser: PropTypes.func.isRequired,
  deleteSideEffectByUser: PropTypes.func.isRequired,
  addSideEffectByAdmin: PropTypes.func.isRequired,
  deleteSideEffectByAdmin: PropTypes.func.isRequired,
  sideEffectsListByAdmin: PropTypes.array,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  roles: state.users.roles,
  sideEffectsListByUser: state.users.sideEffectsListByUser,
  sideEffectsListByAdmin: state.sideEffects.sideEffectsListByAdmin,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getSideEffectsListByUser,
  getSideEffectsListByAdmin,
  addSideEffectByUser,
  deleteSideEffectByUser,
  addSideEffectByAdmin,
  deleteSideEffectByAdmin,
})(SideEffects);
