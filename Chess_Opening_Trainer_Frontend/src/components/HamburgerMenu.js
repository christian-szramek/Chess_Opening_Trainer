import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/global.css";

import close_black_24dp from "../assets/close_black_24dp.svg";
import menu_black_24dp from "../assets/menu_black_24dp.svg";

const HamburgerMenu = ({ openings }) => {
  const [show, setShow] = useState(false);

  const handleChange = e => {
    e.preventDefault();
    setShow(!show);
  };

  const getLinks = () => {
    return openings.map((opening, i) => {
      return (
        <Link to={`/${i}/n`} style={{ textDecoration: "none" }} key={i}>
          <div className="hamburger-link">{opening.title}</div>
        </Link>
      );
    });
  };

  const renderMenuLinks = () => {
    if (show) {
      return (
        <div className="hamburger-div">
          <div className="hamburger-spacer"></div>
          {getLinks()}
        </div>
      );
    }
  };

  const hamburgerIcon = show ? close_black_24dp : menu_black_24dp;

  return (
    <div>
      <img
        src={hamburgerIcon}
        onClick={handleChange}
        className="hamburger-icon"
        alt="hamburger menu icon google fonts"
      />
      {renderMenuLinks()}
    </div>
  );
};

export default HamburgerMenu;
