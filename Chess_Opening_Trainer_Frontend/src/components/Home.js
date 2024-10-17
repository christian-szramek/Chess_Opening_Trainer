import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import Openings from "./Openings";
import HamburgerMenu from "./HamburgerMenu";

import "../styles/global.css";

import chess_icon from "../assets/chess_icon.png";

import { getAllOpenings } from "../api/services/ChessOpenings";

const Home = () => {
  const [openings, setOpenings] = useState([]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(async () => {
    await getAllOpenings(setOpenings);
  }, []);

  return (
    <div>
      <Grid container>
        <Grid item xs={2}>
          <div onClick={scrollToTop}>
            <img src={chess_icon} alt="chess icon" className="icon" />
          </div>
        </Grid>
        <Grid item xs={8}>
          <h1>Schach</h1>
          <hr></hr>
          <h3>Eröffnungstrainer</h3>
          <Openings openings={openings} />
        </Grid>
        <Grid item xs={2}>
          <HamburgerMenu openings={openings} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
