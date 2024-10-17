import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { Icon } from "@material-ui/core";

import close_black_24dp from "../../assets/close_black_24dp.svg";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "50%",
    height: "20%",
    top: "25%",
    bottom: "40%",
    left: "17.5%",
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),

    // iphone se
    "@media screen and (max-width: 320px)": {
      height: "30%",
    },

    /* desktop */
    "@media screen and (min-width: 1000px)": {
      width: "30%",
      left: "35%",
    },
  },
}));

export default function AfterBotModal({ showModal, setShowModal, openingId }) {
  const classes = useStyles();

  const handleClose = () => {
    setShowModal(false);
  };

  const body = (
    <div className={classes.paper}>
      <img
        className="modal-close"
        src={close_black_24dp}
        alt="google close icon"
        onClick={() => setShowModal(false)}
      />
      <CheckCircleIcon className="success-icon" />

      <h3>Möchten Sie erneut trainieren ?</h3>
      <div className="modal-selector">
        <Link
          to={`/${openingId}/a`}
          className="modal-selector-button"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained">Ja</Button>
        </Link>
        <Link
          to={`/`}
          className="modal-selector-button"
          style={{ textDecoration: "none" }}
        >
          <Button variant="contained">Nein</Button>
        </Link>
      </div>

      <AfterBotModal />
    </div>
  );

  // if showModal is undefined
  if (!showModal) {
    return <div></div>;
  }

  return (
    <div>
      <Modal open={showModal} onClose={handleClose}>
        {body}
      </Modal>
    </div>
  );
}
