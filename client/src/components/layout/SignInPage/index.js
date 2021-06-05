import React, { useState } from "react";
import "./index.scss";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { signIn } from "../../../actions/auth";

const SignInPage = ({ signIn, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signIn({ email, password });
  };

  const { t } = useTranslation();

  if (isAuthenticated) return <Redirect to="/mainPage" />;

  return (
    <div className="wrapper signInPage">
      <h1>{t("title")}</h1>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          name="email"
          onChange={onChange}
          placeholder={t("email")}
          aria-label="Email"
          required
        />
        <input
          type="password"
          name="password"
          onChange={onChange}
          placeholder={t("password")}
          aria-label="Password"
          required
        />
        <button>{t("signIn")}</button>
      </form>
      <p>
        {t("dontHaveAccount")} <Link to="/signUpPage">{t("signUp")}</Link>
      </p>
    </div>
  );
};

SignInPage.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signIn })(SignInPage);
