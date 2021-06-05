import React, { Fragment, useEffect } from "react";
import "./index.scss";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { getRoles } from "../../../actions/users";

const MainPage = ({ getRoles, isAuthenticated }) => {
  useEffect(() => {
    getRoles();
  }, [getRoles]);

  const { t } = useTranslation();

  if (!isAuthenticated) return <Redirect to="/" />;

  return (
    <Fragment>
      <h2>{t("title")}</h2>
    </Fragment>
  );
};

MainPage.propTypes = {
  getRoles: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getRoles,
})(MainPage);
