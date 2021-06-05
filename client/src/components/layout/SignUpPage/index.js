import React, { useState } from "react";
import "./index.scss";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { signUp } from "../../../actions/auth";

const SignUpPage = ({ signUp, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    if (password.length < 3) {
      alert("Password must be at least 3 characters");
      return;
    }

    if (password === password2) {
      signUp({ firstName, lastName, email, password });
    } else {
      alert("Make sure passwords match");
    }
  };

  const { t } = useTranslation();

  if (isAuthenticated) return <Redirect to="/mainPage" />;

  return (
    <div className="signUpPage">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="firstName"
          onChange={onChange}
          placeholder={t("firstName")}
          aria-label="First name"
          required
        />
        <input
          type="text"
          name="lastName"
          onChange={onChange}
          placeholder={t("lastName")}
          aria-label="Last name"
          required
        />
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
        <input
          type="password"
          name="password2"
          onChange={onChange}
          placeholder={t("confirmPassword")}
          aria-label="Confirm password"
          required
        />
        <button>{t("signUp")}</button>
      </form>
      <Link to="/">{t("signIn")}</Link>
    </div>
  );
};

SignUpPage.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { signUp })(SignUpPage);
