import React from "react";
import SubmitButton from "./submitButton";
import "../styles/inputChromeBrowserVersion.css";

const InputChromeBrowserVersion = props => {
  return (
    <>
      <input
        className="input-text"
        type="text"
        placeholder="Enter chrome browser version"
        onChange={props.handleInputChange}
        value={props.inputDefaultValue}
      />
      <SubmitButton label="Submit" />
    </>
  );
};

export default InputChromeBrowserVersion;
