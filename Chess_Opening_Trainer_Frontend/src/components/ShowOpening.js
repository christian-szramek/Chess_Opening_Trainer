import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";

import SimpleModal from "./SimpleModal";

import "../styles/global.css";

import chess_icon from "../assets/chess_icon.png";

import { getOpening } from "../api/services/ChessOpenings";

const ShowOpening = () => {
  const [opening, setOpening] = useState({});
  const [showModal, setShowModal] = useState(false);

  // id, again
  const params = useParams();
  useEffect(async () => {
    await getOpening(params.id, setOpening);
    if (params.again === "a") {
      setShowModal(true);
    }
  }, []);

  const renderMoveDescription = moves => {
    if (!moves) {
      return "";
    }
    console.log(moves);
    return moves.map((move, i) => {
      return (
        <div key={i}>
          {i + 1}: {move.from} - {move.to}
        </div>
      );
    });
  };

  return (
    <div>
      <Link to="/">
        <img src={chess_icon} alt="chess figures" className="icon" />
      </Link>
      <h1 className="opening-title">{opening.title}</h1>
      <div className="opening-information">
        <div>
          <div className="opening-movedescription">
            <div className="opening-movedescription-subtitle">Züge:</div>
            <div className="opening-movedescription-text">
              {renderMoveDescription(opening.moves)}
            </div>
          </div>
          <div className="opening-movedescription">
            <div className="opening-movedescription-subtitle">ECO-Code:</div>
            <div className="opening-movedescription-text">{opening.eco}</div>
          </div>
          <Button variant="contained" onClick={() => setShowModal(true)}>
            <p className="button">Gegen Bot spielen</p>
          </Button>
        </div>
      </div>
      <SimpleModal
        showModal={showModal}
        setShowModal={setShowModal}
        openingId={opening.id}
      />
    </div>
  );
};

export default ShowOpening;
