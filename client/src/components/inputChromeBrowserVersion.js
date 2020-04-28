import React from "react";
import SubmitButton from "./submitButton";
import "../styles/inputChromeBrowserVersion.css";

const InputChromeBrowserVersion = props => {
  return (
    <div className="container">
      <input
        className="input-text"
        type="text"
        placeholder="Enter chrome version"
        onChange={props.handleInputChange}
        value={props.inputDefaultValue}
      />
      <SubmitButton label="Submit" />
    </div>
  );
};

export default InputChromeBrowserVersion;
