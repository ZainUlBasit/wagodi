import React, { useState } from "react";
import "./LanguageChangeBtn.css";
import { useTranslation } from "react-i18next";

const LanguageChangeBtn = () => {
  const [CurrentLanguage, setCurrentLanguage] = useState(false);
  const [t, i18n] = useTranslation("global");
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Switch between 'en' or 'ar'
  };

  return (
    <label className="switch">
      <input
        className="cb"
        type="checkbox"
        checked={CurrentLanguage} // true for English, false for Arabic
        onChange={(e) => {
          const newLanguage = CurrentLanguage ? "en" : "ar"; // Toggle between 'en' and 'ar'
          setCurrentLanguage(!CurrentLanguage); // Update the state
          handleChangeLanguage(newLanguage); // Change the language
        }}
      />

      <span className="toggle">
        <span className="left">EN</span>
        <span className="right">AR</span>
      </span>
    </label>
  );
};

export default LanguageChangeBtn;
