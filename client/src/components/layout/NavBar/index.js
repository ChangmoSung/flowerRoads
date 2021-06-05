import React, { Fragment } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { signOut } from "../../../actions/auth";
import ChangeLangButtons from "../ChangeLangButtons/index.js";
import blueFlower from "../../../images/blueFlower.png";

const NavBar = ({ signOut }) => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <button className="toggleNavButton">
        <img src={blueFlower} />
      </button>
      <nav>
        <ul>
          <li>
            <Link to="/foods">{t("foods")}</Link>
          </li>
          <li>
            <Link to="/sideEffects">{t("sideEffects")}</Link>
          </li>
          <li>
            <Link to="/chemotherapy">{t("chemotherapy")}</Link>
          </li>
          <li>
            <ChangeLangButtons />
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                if (window.confirm("Would you like to sign out?")) {
                  signOut();
                }
              }}
            >
              {t("signOut")}
            </Link>
          </li>
        </ul>
      </nav>
    </Fragment>
  );
};

NavBar.propTypes = {
  signOut: PropTypes.func,
};

export default connect(null, { signOut })(NavBar);
