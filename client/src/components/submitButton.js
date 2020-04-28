import React from "react";
import "../styles/common.css";

const SubmitButton = ({ label, onSubmit }) => (
  <button type="submit">{label}</button>
);

export default SubmitButton;
