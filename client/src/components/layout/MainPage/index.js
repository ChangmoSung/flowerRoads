import React, { useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getRoles } from "../../../actions/users";
import { signOut } from "../../../actions/auth";

const MainPage = ({ getRoles, isAuthenticated, signOut }) => {
  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <div className="mainPage containerMargin">
      <h2>{t("title")}</h2>
      <ul>
        <li>
          <Link to="/methodsOfPrevention">{t("methodsOfPrevention")}</Link>
        </li>
        <li>
          <Link to="/foods">{t("foods")}</Link>
        </li>
        <li>
          <Link to="/sideEffects">{t("sideEffects")}</Link>
        </li>
        <li>
          <Link to="/chemotherapies">{t("chemotherapy")}</Link>
        </li>
        <li>
          <Link
            to="/"
            onClick={() => {
              if (window.confirm(t("wouldYouLikeToSignOut"))) {
                signOut();
              }
            }}
          >
            {t("signOut")}
          </Link>
        </li>
      </ul>
    </div>
  );
};

MainPage.propTypes = {
  getRoles: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  signOut: PropTypes.func,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getRoles,
  signOut,
})(MainPage);
