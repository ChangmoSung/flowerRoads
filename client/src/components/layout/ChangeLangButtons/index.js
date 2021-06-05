import React from "react";
import { useTranslation } from "react-i18next";

const ChangeLangButtons = () => {
  const { t, i18n } = useTranslation();
  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <div className="changeLangButtons">
      <button onClick={() => changeLang("en")}>{t("english")}</button>
      <button onClick={() => changeLang("kr")}>{t("korean")}</button>
    </div>
  );
};

export default ChangeLangButtons;
