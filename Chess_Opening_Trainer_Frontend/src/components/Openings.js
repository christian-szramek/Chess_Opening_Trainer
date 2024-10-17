import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";

import "../styles/global.css";
import Opening from "./Opening";

const Openings = ({ openings }) => {
  return (
    <Grid container justify="center" spacing={2}>
      {openings.map((opening) => (
        <Grid key={opening.id} item xs={12} md={6} className="item">
          <Opening opening={opening} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Openings;
