import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import "../styles/global.css";

import close_black_24dp from "../assets/close_black_24dp.svg";
import Chess_pdt45 from "../assets/Chess_pdt45.svg";
import Chess_plt45 from "../assets/Chess_plt45.svg";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    width: "30%",
    height: "20%",
    top: "25%",
    left: "35%",
    backgroundColor: "white",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 0, 3),

    // iphone se
    "@media screen and (max-width: 320px)": {
      width: "80%",
      left: "10%",
      height: "30%",
    },

    // iphone x and bigger
    "@media screen and (min-width: 350px) and (max-width: 500px)": {
      width: "70%",
      left: "15%",
      height: "20%",
    },
  },
}));

export default function SimpleModal({ showModal, setShowModal, openingId }) {
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
      <h3>Wählen Sie eine Farbe:</h3>
      <div className="modal-selector">
        <Link to={`/bot/${openingId}/b`} className="modal-selector-button">
          <Button variant="contained">
            <img src={Chess_pdt45} alt="chess piese" />
          </Button>
        </Link>
        <Link to={`/bot/${openingId}/w`} className="modal-selector-button">
          <Button variant="contained">
            <img src={Chess_plt45} alt="chess piese" />
          </Button>
        </Link>
      </div>

      <SimpleModal />
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
