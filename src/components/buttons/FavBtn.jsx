import React from "react";
import "./FavBtn.css";
import { FaStar } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FavBtn = ({ Value, setValue }) => {
  const [t, i18n] = useTranslation("global");

  return (
    <button
      class={Value ? "bookmarkBtnFav" : "bookmarkBtn"}
      onClick={() => setValue(!Value)}
    >
      <span class={Value ? "IconContainerFav" : "IconContainer"}>
        <FaStar class={Value ? "iconFav" : "iconF"} />
      </span>
      <p
        class={
          Value
            ? "textFav font-[Quicksand] font-[700]"
            : "text font-[Quicksand] font-[700]"
        }
      >
        {t("Favorites")}
      </p>
    </button>
  );
};

export default FavBtn;
