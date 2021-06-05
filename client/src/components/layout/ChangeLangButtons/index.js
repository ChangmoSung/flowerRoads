import React, { useState, useRef } from "react";
import "./index.scss";
import { useTranslation } from "react-i18next";
import korea from "../../../images/kr.png";
import canada from "../../../images/ca.png";

const ChangeLangButtons = () => {
  const changeLangButton = useRef(null);
  const [lang, toggleLang] = useState("kr");

  const changeLang = (lang) => {
    toggleLang(lang);
    i18n.changeLanguage(lang);
    const langIsKorean = changeLangButton.current.className === "kr";
    changeLangButton.current.className = langIsKorean ? "en" : "kr";
  };

  const { t, i18n } = useTranslation();

  return (
    <div className="changeLangButton">
      <span className="korean">{lang === "kr" && t("korean")}</span>
      <button
        ref={changeLangButton}
        className="kr"
        onClick={() => changeLang(lang === "kr" ? "en" : "kr")}
      >
        {lang === "kr" ? <img src={korea} /> : <img src={canada} />}
      </button>
      <span className="english">{lang === "en" && t("english")}</span>
    </div>
  );
};

export default ChangeLangButtons;
