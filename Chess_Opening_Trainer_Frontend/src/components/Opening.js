import React from "react";
import { Link } from "react-router-dom";

import "../styles/global.css";

const Opening = ({ opening }) => {
  const OPENING_IMAGE_URL = `http://localhost:3000/openingimages/${opening.id}.png`;

  return (
    <Link to={`/${opening.id}/n`} style={{ textDecoration: "none" }}>
      <div className="inner-grid-item">
        <h3>{opening.title}</h3>
        <img src={OPENING_IMAGE_URL} alt="chessboard" />
      </div>
    </Link>
  );
};

export default Opening;
