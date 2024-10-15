import React, { useState } from "react";
// import "./LanguageChangeBtn.css";
import { useTranslation } from "react-i18next";

// const LanguageChangeBtn = () => {

//   return (
//     <label className="switch">
//       <input
//         className="cb"
//         type="checkbox"

//       />

//       <span className="toggle">
//         <span className="left">EN</span>
//         <span className="right">AR</span>
//       </span>
//     </label>
//   );
// };

// export default LanguageChangeBtn;

// import React from "react";
import styled from "styled-components";

const LanguageChangeBtn = () => {
  const [CurrentLanguage, setCurrentLanguage] = useState(false);
  const [t, i18n] = useTranslation("global");
  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng); // Switch between 'en' or 'ar'
  };
  return (
    <StyledWrapper>
      <div className="toggle-button-cover">
        <div id="button-3" className="button r">
          <input
            className="checkbox"
            type="checkbox"
            checked={CurrentLanguage} // true for English, false for Arabic
            onChange={(e) => {
              const newLanguage = CurrentLanguage ? "en" : "ar"; // Toggle between 'en' and 'ar'
              setCurrentLanguage(!CurrentLanguage); // Update the state
              handleChangeLanguage(newLanguage); // Change the language
            }}
          />
          <div className="knobs" />
          <div className="layer" />
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .toggle-button-cover {
    display: table-cell;
    position: relative;
    width: 200px;
    height: 140px;
    box-sizing: border-box;
  }

  .button-cover {
    height: 100px;
    margin: 20px;
    background-color: #fff;
    box-shadow: 0 10px 20px -8px #c5d6d6;
    border-radius: 4px;
  }

  .button-cover:before {
    counter-increment: button-counter;
    content: counter(button-counter);
    position: absolute;
    right: 0;
    bottom: 0;
    color: #d7e3e3;
    font-size: 12px;
    line-height: 1;
    padding: 5px;
  }

  .button-cover,
  .knobs,
  .layer {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  .button {
    position: relative;
    top: 50%;
    width: 74px;
    height: 36px;
    margin: -20px auto 0 auto;
    overflow: hidden;
  }

  .checkbox {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;
  }

  .knobs {
    z-index: 2;
  }

  .layer {
    width: 100%;
    background-color: #ebf7fc;
    transition: 0.3s ease all;
    z-index: 1;
  }

  .button.r,
  .button.r .layer {
    border-radius: 100px;
  }

  #button-3 .knobs:before {
    content: "EN";
    position: absolute;
    top: 4px;
    left: 4px;
    width: 28px;
    height: 28px;
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    text-align: center;
    line-height: 1;
    /* padding: 9px 4px; */
    background-color: #03a9f4;
    border-radius: 50%;
    transition: 0.3s ease all, left 0.3s cubic-bezier(0.18, 0.89, 0.35, 1.15);
  }

  #button-3 .checkbox:active + .knobs:before {
    width: 46px;
    border-radius: 100px;
  }

  #button-3 .checkbox:checked:active + .knobs:before {
    margin-left: -26px;
  }

  #button-3 .checkbox:checked + .knobs:before {
    content: "AR";
    left: 42px;
    background-color: green;
  }

  #button-3 .checkbox:checked ~ .layer {
    background-color: #fcebeb;
  }
`;

export default LanguageChangeBtn;
