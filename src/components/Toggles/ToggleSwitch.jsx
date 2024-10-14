import React from "react";
// import "./ToggleSwitch.css";

const ToggleSwitch = ({ Value, setValue }) => {
  return (
    <div class="container">
      <input
        hidden=""
        id="check"
        name="check"
        type="checkbox"
        checked={Value}
        onChange={(e) => setValue(e.target.checked)}
      />
      <label class="toggle" for="check">
        <div class="toggle__circle"></div>
      </label>
      <div class="toggle-text">
        <span>N</span>
        <span>F</span>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .container {
    margin: auto;
    color: hsl(0, 0%, 30%);
    font-weight: 900;
    font-size: 6rem;
    display: flex;
  }

  .toggle {
    width: 60px;
    height: 155px;
    background-color: hsl(0, 0%, 80%);
    border-radius: 1.7rem;
    padding: 0.25rem 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    transition: background-color 300ms 300ms;
  }

  .toggle__circle {
    width: 50px;
    height: 50px;
    background-color: hsl(0, 0%, 95%);
    border-radius: 50%;
    margin-top: calc(155px - (0.25rem * 2) - 50px);
    transition: margin 500ms ease-in-out;
  }

  .toggle-text {
    display: flex;
    flex-direction: column;
    line-height: 0.8;
  }

  #check:checked + .toggle > .toggle__circle {
    margin-top: 0;
  }

  #check:checked + .toggle {
    background-color: #41a63c;
  }
`;

export default ToggleSwitch;
