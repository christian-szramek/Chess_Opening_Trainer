import React from "react";
import ReactDOM from "react-dom";
import MuiAlert from "@material-ui/lab/Alert";

import "../styles/global.css";

const Alert = ({ text, onClose, severity }) => {
  function SimpleAlert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  return ReactDOM.createPortal(
    <div className="alertbox">
      <SimpleAlert severity={severity} onClose={() => onClose(false)}>
        {text}
      </SimpleAlert>
    </div>,
    document.querySelector("#alert")
  );
};

export default Alert;
