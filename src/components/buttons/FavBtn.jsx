import React from "react";
import "./FavBtn.css";
import { FaStar } from "react-icons/fa";

const FavBtn = ({ Value, setValue }) => {
  return (
    <button
      class={Value ? "bookmarkBtnFav" : "bookmarkBtn"}
      onClick={() => setValue(!Value)}
    >
      <span class={Value ? "IconContainerFav" : "IconContainer"}>
        <FaStar class={Value ? "iconFav" : "icon"} />
      </span>
      <p
        class={
          Value
            ? "textFav font-[Quicksand] font-[700]"
            : "text font-[Quicksand] font-[700]"
        }
      >
        Favorites
      </p>
    </button>
  );
};

export default FavBtn;
