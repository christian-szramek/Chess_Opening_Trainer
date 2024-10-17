import React from "react";
import ReactDOM from "react-dom";
//import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  DndProvider,
  TouchTransition,
  MouseTransition,
} from "react-dnd-multi-backend";
//import { DndProvider } from "react-dnd-multi-backend";
//import { HTML5toTouch } from "rdndmb-html5-to-touch";

import App from "./components/App";
import dotenv from 'dotenv'

dotenv.config();

export const HTML5toTouch = {
  backends: [
    {
      id: "html5",
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: "touch",
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
};

ReactDOM.render(
  <DndProvider options={HTML5toTouch}>
    <App />
  </DndProvider>,
  document.querySelector("#root")
);
