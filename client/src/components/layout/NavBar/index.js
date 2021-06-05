import React, { Fragment, useRef } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { signOut } from "../../../actions/auth";
import ChangeLangButtons from "../ChangeLangButtons/index.js";
import blueFlower from "../../../images/blueFlower.png";

const NavBar = ({ signOut }) => {
  const navEl = useRef(null);

  const toggleNav = () => {
    const navIsHidden = navEl.current.className === "hidden";
    navEl.current.className = navIsHidden ? "show" : "hidden";
  };

  const { t } = useTranslation();

  return (
    <Fragment>
      <button className="toggleNavButton" onClick={() => toggleNav()}>
        <img src={blueFlower} />
      </button>
      <nav className="hidden" ref={navEl}>
        <ul>
          <li>
            <Link to="/foods" onClick={() => toggleNav()}>
              {t("foods")}
            </Link>
          </li>
          <li>
            <Link to="/sideEffects" onClick={() => toggleNav()}>
              {t("sideEffects")}
            </Link>
          </li>
          <li>
            <Link to="/chemotherapy" onClick={() => toggleNav()}>
              {t("chemotherapy")}
            </Link>
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
