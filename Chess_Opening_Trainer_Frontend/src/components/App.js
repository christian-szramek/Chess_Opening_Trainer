import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ChessBotViewer from "./chess/ChessBotViewer";
import Home from "./Home";
import ShowOpening from "./ShowOpening";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/bot/:id/:color">
          <ChessBotViewer />
        </Route>
        <Route path="/:id/:again">
          <ShowOpening />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
